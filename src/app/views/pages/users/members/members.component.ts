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
import { AppState } from '../../../../core/reducers';
import { AuthNoticeService, Login } from '../../../../core/auth';
import { AdminService } from '../../../../services/admin.service';
import { AuthService } from '../../core/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../core/_base/crud';


@Component({
  selector: 'kt-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
    displayedColumns = ['name', 'email', 'contact', 'room', 'action'];
    
    // dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    // selection = new SelectionModel<Element>(true, []);

    dataSource = new MatTableDataSource;
    selection = new SelectionModel;

    loading = false;
    private returnUrl: any;
    id: any;
    userDetails: any;

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
  )
  {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit()
  {
    this.loading = true; 
    const authData = {
      userId: this.id
    };

    this.adminService.postData('patient_get',authData).subscribe((res :any) => {
          this.loading = false;
        console.log(res)
        if(res.status == 1)
          { 
            // this.hospitals = res.data;
            const ELEMENT_DATA = res.data.reverse();
            this.dataSource = new MatTableDataSource(ELEMENT_DATA);
            this.cdr.detectChanges();
          }
          else
          {
            this.loading = false;
            const message = 'Something went wrong!';
            this.toastr.error(message, 'Error');
          }
      });
  }

  getAllPatientData()
  {
    const authData = {
      userId: this.id
    };

    this.adminService.postData('patient_get',authData).subscribe((res :any) => {
          this.loading = false;
        console.log(res)
        if(res.status == 1)
          { 
            // this.hospitals = res.data;
            const ELEMENT_DATA = res.data.reverse();
            this.dataSource = new MatTableDataSource(ELEMENT_DATA);
            this.cdr.detectChanges();
          }
          else
          {
            this.loading = false;
            const message = 'Something went wrong!';
            this.toastr.error(message, 'Error');
          }
      });
  }

  deletePatient(patientData)
  {
    if (confirm('Are you sure you want to delete this patient? With doing this all the contacts under this patient will be lost.'))
    {
      const authData = {
        patientId: patientData._id
      };

      this.adminService.postData('patient_delete',authData).subscribe((res :any) => {
            this.loading = false;
          console.log(res)
          if(res.status == 1)
            {
              this.getAllPatientData();
              
              const message = 'Patient deleted success';
              this.toastr.success(message, 'Success');
            }
            else
            {
              const message = 'Something went wrong';
              this.toastr.error(message, 'Error');            }
        });
    }
  }

  open(content) {
    this.modalService.open(content, { centered: true });
  }

}