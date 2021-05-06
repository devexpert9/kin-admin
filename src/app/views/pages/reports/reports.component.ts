import { ChangeDetectorRef, ViewChild, Component, OnDestroy, OnInit, ViewEncapsulation, NgZone } from '@angular/core';

import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/reducers';
import { AuthNoticeService, Login } from '../../../core/auth';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../core/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../core/_base/crud';


@Component({
  selector: 'kt-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {
	displayedColumns = ['name', 'email', 'faculty', 'patient', 'contact'];
    loginForm: FormGroup;
    // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    // selection = new SelectionModel<Element>(true, []);

    dataSource = new MatTableDataSource;
    selection = new SelectionModel;

    loading = false;

    searchOption:any='';

    isFaculty:any = '';
    isPatient:any = '';
    isContact:any = '';

    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows     = this.dataSource.data.length;
      return numSelected === numRows;
    }

	/** Selects all rows if they are not all selected; otherwise clear selection. */
	masterToggle() {
	this.isAllSelected() ?
	this.selection.clear() :
	this.dataSource.data.forEach(row => this.selection.select(row));
	}

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	ngAfterViewInit() {
	this.dataSource.paginator = this.paginator;
	    this.dataSource.sort = this.sort;
	}

	applyFilter(filterValue: string) {
	filterValue = filterValue.trim(); // Remove whitespace
	filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
	this.dataSource.filter = filterValue;
	}
  	constructor(
    private modalService: NgbModal,
    private router: Router,
    private authNoticeService: AuthNoticeService,
    private translate: TranslateService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    public toastr:ToastrService,
    public adminService: AdminService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private layoutUtilsService: LayoutUtilsService,
    private zone: NgZone,
    public auth: AuthService,
    // private ngxService: NgxUiLoaderService
  ){
  }

  	ngOnInit()
  	{
		this.initLoginForm();
	}

	// patchValues(pageData)
 //    {
 //      	this.loginForm.patchValue({
 //        	firstname: 	pageData.firstname,
 //        	lastname: 	pageData.lastname,
 //        	email: 		pageData.email
 //      	});
 //    }

	initLoginForm()
	{
		const contactRegex = /^\(\d{3}\) \d{3}-?\d{4}$/;

		this.loginForm = this.fb.group({
			start_date: ['', Validators.compose([
					Validators.required
			])],
			end_date: ['', Validators.compose([
					Validators.required
			])],
			option: ['', Validators.compose([
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
		
		let endDate = new Date(controls.end_date.value);
        endDate.setDate(endDate.getDate() + 1);
        let lastDate = endDate;

		const authData = {
			start_date: new Date(controls.start_date.value),
			end_date:  	lastDate,
			option: 	controls.option.value
		};

		this.adminService.postData('findReports',authData).subscribe((res :any) => {
      		this.loading = false;
			console.log(res)
			if(res.status == 1)
      		{
      			this.searchOption = controls.option.value;

      			if(this.searchOption == 'faculty'){
      				this.isFaculty = 'yes';
      			}else if(this.searchOption == 'patient'){
      				this.isPatient = 'yes';
      			}else if(this.searchOption == 'contact'){
      				this.isContact = 'yes';
      			}else{}

      			const ELEMENT_DATA = res.data.reverse();
	            this.dataSource = new MatTableDataSource(ELEMENT_DATA);
	            this.cdr.detectChanges();
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