// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// Store
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, Login } from '../../../../core/auth';
import { AdminService } from '../../../../services/admin.service';
import { AuthService } from '../../core/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
/**
 * ! Just example => Should be removed in development
 */
const DEMO_PARAMS = {
	EMAIL: 'admin@demo.com',
	PASSWORD: 'demo'
};

@Component({
	selector: 'kt-login',
	templateUrl: './login.component.html',
	encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
	// Public params
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;

	private returnUrl: any;

	// Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param router: Router
	 * @param auth: AuthService
	 * @param authNoticeService: AuthNoticeService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 * @param route
	 */
	constructor(
		private router: Router,
		private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private fb: FormBuilder,
      	public toastr:ToastrService,
		public adminService: AdminService,
		private cdr: ChangeDetectorRef,
		private route: ActivatedRoute,
		private zone: NgZone,
		public auth: AuthService,
		
	) {
		this.unsubscribe = new Subject();
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(){
		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/';
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initLoginForm() {
		// demo message to show
		if (!this.authNoticeService.onNoticeChanged$.getValue()) {
			const initialNotice = `Use account
			<strong>${DEMO_PARAMS.EMAIL}</strong> and password
			<strong>${DEMO_PARAMS.PASSWORD}</strong> to continue.`;
			this.authNoticeService.setNotice(initialNotice, 'info');
		}

		this.loginForm = this.fb.group({
			email: [DEMO_PARAMS.EMAIL, Validators.compose([
				Validators.required,
				// Validators.email,
			])
			],
			password: [DEMO_PARAMS.PASSWORD, Validators.compose([
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(100)
			])
			]
		});
	}

	/**
	 * Form Submit
	 */
	submit() 
	{
		const controls = this.loginForm.controls;
		/** check form */
		if (this.loginForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		// this.ngxService.start();

		const authData = {
			email: controls.email.value,
			password: controls.password.value
		};

		this.adminService.postData('adminLogin',authData).subscribe((res :any) => {
      		this.loading = false;
			console.log(res)
			if(res.status == 1)
      		{	
      			this.auth.login();
      			localStorage.setItem('isLoggedIn', 'true');
	      		localStorage.setItem('user_id', res.data._id);
	      		localStorage.setItem('firstname', res.data.firstname);
	      		localStorage.setItem('lastname', res.data.lastname);
	      		localStorage.setItem('user_email', res.data.email);

	      		this.router.navigate(['./dashboard']);
	      	}
	      	else
	      	{
	      		this.loading = false;
	      		const message = 'Login details are incorrect';
          		this.toastr.error(message, 'Error');
	      	}
	    });
	    

		// this.auth
		// 	.login(authData.email, authData.password)
		// 	.pipe(
		// 		tap(user => {
		// 			if (user) {
		// 				this.store.dispatch(new Login({authToken: user.accessToken}));
		// 				this.router.navigateByUrl(this.returnUrl); // Main page
		// 			} else {
		// 				this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
		// 			}
		// 		}),
		// 		takeUntil(this.unsubscribe),
		// 		finalize(() => {
		// 			this.loading = false;
		// 			this.cdr.markForCheck();
		// 		})
		// 	)
		// 	.subscribe();
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
