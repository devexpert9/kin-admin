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
  selector: 'kt-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {

  	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;

	private returnUrl: any;
	id: any;
	userDetails: any;
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
		this.id = this.route.snapshot.paramMap.get('id');
		console.log(this.id)
		// console.log(JSON.parse(this.dataRoute.snapshot.params['objectProducts']));
	}

  	ngOnInit() {
  		this.initLoginForm();
  		this.adminService.postData('getOrganizationDetails',{'_id': this.id}).subscribe((res :any) => {
      		this.loading = false;
			console.log(res)
			if(res.status == 1)
      		{
              	this.userDetails = res.data;
              	this.patchValues(res.data);
	      	}
	      	else
	      	{
	      		this.loading = false;
	      	}
	    });
 	}

 	patchValues(pageData)
    {
      	this.loginForm.patchValue({
        	firstname: pageData.firstname,
        	lastname: pageData.lastname,
        	email: pageData.email,
        	orgname: pageData.organization_name
      	});
    }


 	initLoginForm()
	{
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
			orgname: ['', Validators.compose([
					Validators.required
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
			firstname: 			controls.firstname.value,
			lastname: 			controls.lastname.value,
			email: 				controls.email.value,
			organization_name: 	controls.orgname.value,
			orgId: 				this.id
		};

		this.adminService.postData('update_orgFromAdmin',authData).subscribe((res :any) => {
      		this.loading = false;
			console.log(res)
			if(res.status == 1)
      		{
              	const message = 'Facility updated success';
              	this.toastr.success(message, 'Success');

              	this.router.navigate(['./users']);
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
