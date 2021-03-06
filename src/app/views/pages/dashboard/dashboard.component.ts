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
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	
  	displayedColumns = ['name', 'email', 'patientCount', 'action'];
	
	dataSource = new MatTableDataSource;
    selection = new SelectionModel;

    loading = false;

    countFaculties:any = '';
    countPatients:any  = '';
    countContacts:any  = '';
    totalPatients:any  = '';

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

  	// @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  	// @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  	
  
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


  open(content) {
    this.modalService.open(content, { centered: true });
  }
  
	ngOnInit()
	{
		//--- GET ALL FACULTIES---------------------------
			const authData = {
		      getData: "Organizations"
		    };

		    this.adminService.postData('getRecentOrganizations',authData).subscribe((res :any) => {
		          this.loading = false;
		        console.log(res)
		        if(res.status == 1)
	          	{ 
	          		this.countFaculties = res.data.length;
		            const ELEMENT_DATA = res.data.reverse();
		            // this.dataSource = new MatTableDataSource(ELEMENT_DATA);
		            this.dataSource = ELEMENT_DATA;
		            this.cdr.detectChanges();
	          	}
	          	else
	          	{
		            this.loading = false;
		            const message = 'Something went wrong!';
		            this.toastr.error(message, 'Error');
	          	}
	      	});

      	//--- Count Patients-------------------------
      		const authData1 = {
		      getData: "Patients"
		    };

		    this.adminService.postData('patient_all_with_faculty',authData1).subscribe((res :any) => {
		          this.loading = false;
		        if(res.status == 1)
	          	{ 
	          		this.countPatients = res.data.length;
	          		const ELEMENT_DATA = res.data.reverse();
	          		this.totalPatients = ELEMENT_DATA;
	          	}
	          	else
	          	{
		            this.countPatients = 0;
	          	}
	      	});

      	//--- Count Contacts-------------------------
      		const authData2 = {
		      getData: "Contacts"
		    };

		    this.adminService.postData('contacts_all',authData2).subscribe((res :any) => {
		          this.loading = false;
		        if(res.status == 1)
	          	{ 
	          		this.countContacts = res.data.length;
	          	}
	          	else
	          	{
		            this.countContacts = 0;
	          	}
	      	});
	}
}
