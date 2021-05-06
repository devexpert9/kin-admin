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
  selector: 'kt-editcontact',
  templateUrl: './editcontact.component.html',
  styleUrls: ['./editcontact.component.scss']
})
export class EditcontactComponent implements OnInit {

  	loginForm: FormGroup;
	loading = false;
	isLoggedIn$: Observable<boolean>;
	errors: any = [];

	private unsubscribe: Subject<any>;

	private returnUrl: any;
	id: any;
	userId: any;
	userDetails: any;
	contactId: any;
	patientId: any;
	
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
		this.contactId = this.route.snapshot.paramMap.get('id');
	}

  	ngOnInit()
  	{
  		this.initLoginForm();
  		this.adminService.postData('getContactDetails',{'_id': this.contactId}).subscribe((res :any) => {
      		this.loading = false;
			console.log(res)
			if(res.status == 1)
      		{
              	this.userDetails = res.data;
              	this.patientId = res.data.patientId;
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
        	name: pageData.name,
        	email: pageData.email,
        	phone: pageData.phone,
        	room_no: pageData.room_no,
      	});
    }


 	initLoginForm()
	{
		const contactRegex = /^\(\d{3}\) \d{3}-?\d{4}$/;

		this.loginForm = this.fb.group({
			name: ['', Validators.compose([
					Validators.required
			])],
			email: ['', Validators.compose([
				Validators.required,
				Validators.email,
			])],
			phone: ['', Validators.compose([Validators.required, Validators.pattern(contactRegex)])
			]
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
			name:  		controls.name.value,
			email: 		controls.email.value,
			phone: 		controls.phone.value,
			contactId: 	this.contactId
		};

		this.adminService.postData('contact_update_Admin',authData).subscribe((res :any) => {
      		this.loading = false;
			console.log(res)
			if(res.status == 1)
      		{
              	const message = 'Contact updated success';
              	this.toastr.success(message, 'Success');

              	this.router.navigate(['./users/contacts/'+this.patientId]);
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
