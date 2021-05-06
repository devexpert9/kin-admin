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

@Component({
  selector: 'kt-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.scss']
})

export class AddmemberComponent implements OnInit {
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];
	patientId:any='';
	private unsubscribe: Subject<any>;

	private returnUrl: any;

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
		this.patientId = this.route.snapshot.paramMap.get('id');
	}

  	ngOnInit(){
		this.initLoginForm();

		// redirect back to the returnUrl before login
		this.route.queryParams.subscribe(params => {
			this.returnUrl = params.returnUrl || '/';
		});
	}

	initLoginForm()
	{
		const contactRegex = /^\(\d{3}\) \d{3}-?\d{4}$/;

		this.loginForm = this.fb.group({
			firstname: ['', Validators.compose([
					Validators.required
			])],
			lastname: ['', Validators.compose([
					Validators.required
			])],
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
			])],
			phone: ['', Validators.compose([Validators.required, Validators.pattern(contactRegex)])
			],
			// gender: ['', Validators.compose([
			// 		Validators.required
			// ])],
			room_no: ['', Validators.compose([
					Validators.required
			])],
			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(100)
			])]
		});
	}

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
			firstname:  controls.firstname.value,
			lastname:  	controls.lastname.value,
			email: 		controls.email.value,
			contact: 	controls.phone.value,
			password: 	controls.password.value,
			gender: 	'Male',
			room_no: 	controls.room_no.value,
			userId: 	this.patientId
		};

		this.adminService.postData('patient_add',authData).subscribe((res :any) => {
      		this.loading = false;
			console.log(res)
			if(res.status == 1)
      		{
              	const message = 'Patient added success';
              	this.toastr.success(message, 'Success');

              	this.router.navigate(['./users/members/'+this.patientId]);
	      	}
	      	else
	      	{
	      		this.loading = false;
	      		const message = 'Something went wrong.';
          		this.toastr.error(message, 'Error');
	      	}
	    });
	}


	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.loginForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

}
