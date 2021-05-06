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
import { AppState } from '../../../core/reducers';
// Auth
import { AuthNoticeService, Login } from '../../../core/auth';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../core/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'kt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];
	patientId:any='';
	private unsubscribe: Subject<any>;

	private returnUrl: any;
	firstname:any='';
	lastname:any='';
	email:any='';
	password:any='';

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

  	ngOnInit()
  	{
		this.initLoginForm();

		let dict = {
        	"user_id": localStorage.getItem('user_id')
      	};
      	this.adminService.postData('getAdminByID',dict).subscribe((res :any) => {
	        	this.firstname	= res.data.firstname;
	        	this.lastname 	= res.data.lastname;
	        	this.email 		= res.data.email;
	        	this.password  	= res.data.password;
	        	// this.cdr.detectChanges();

	          	this.patchValues(res.data);
      	}); 
	}

	patchValues(pageData)
    {
      	this.loginForm.patchValue({
        	firstname: 	pageData.firstname,
        	lastname: 	pageData.lastname,
        	email: 		pageData.email
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
			old_password: [''],
          	new_password: [''],
          	confirm_password: [''],
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

		if(controls.old_password.value != '' || controls.new_password.value != '' || controls.confirm_password.value != '')
      	{
	        if(controls.old_password.value == '')
	        {
	          this.toastr.error('Please enter old password.', 'Error');
	          // this.ngxService.stop();
	          return;
	        }else if(controls.old_password.value != this.password){
	          this.toastr.error('Please enter correct old password.', 'Error');
	          // this.ngxService.stop();
	          return;
	        }else if(controls.new_password.value == '') {
	          this.toastr.error('Please enter new password.', 'Error');
	          // this.ngxService.stop();
	          return;
	        }else if(controls.new_password.value != ''){
	          let regexp = /^\S*$/;
	          // if(inputText.value.match(mailformat))
	          if(controls.new_password.value.length < 6){
	            this.toastr.error('Please enter minimum 6 characters for new password.', 'Error');
	            // this.ngxService.stop();
	            return;
	          }else if(controls.new_password.value.length > 15){
	            this.toastr.error('Please enter maximum 15 characters for new password.', 'Error');
	            // this.ngxService.stop();
	            return;
	          }
	          else if(controls.new_password.value != controls.confirm_password.value)
	          {
	            this.toastr.error('Confirm password should match with new password ', 'Success');
	            // this.ngxService.stop();
	            return;
	          }
	          else{
	            this.password = controls.new_password.value;
	          }
	        }
      	}

		const authData = {
			firstname:  controls.firstname.value,
			lastname:  	controls.lastname.value,
			email: 		controls.email.value,
			image: 		null,
			password: 	this.password,
			_id: 		localStorage.getItem('user_id')
		};

		this.adminService.postData('adminUpdate',authData).subscribe((res :any) => {
      		this.loading = false;
			console.log(res)
			if(res.status == 1)
      		{
      			const message = 'Profile data saved successfully.';
          		this.toastr.success(message, 'Success');
          		// this.ngxService.stop();
          		
          		// REST PASSWORD FIELDS---------------------------
          		this.loginForm.get('old_password').reset(); 
          		this.loginForm.get('new_password').reset(); 
          		this.loginForm.get('confirm_password').reset(); 

          		// UPDATE TO LOCAL STORAGE------------------------
	      		localStorage.setItem('firstname', controls.firstname.value);
	      		localStorage.setItem('lastname', controls.lastname.value);
	      		localStorage.setItem('user_email', controls.email.value);
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
