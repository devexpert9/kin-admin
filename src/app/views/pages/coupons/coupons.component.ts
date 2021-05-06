import { Component, OnInit , ViewChild } from '@angular/core';
import {MatPaginator , MatSort , MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
displayedColumns = ['select'  , 'position' , 'ccode', 'dtype' ,'dvalue' , 'action'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
    selection = new SelectionModel<Element>(true, []);
	/** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
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
  constructor(private modalService: NgbModal) { }
     
 
  open(content) {
    this.modalService.open(content, { centered: true });
  }


  ngOnInit() {
  }

}

	export interface Element {
 position:number;
 ccode:string;
  dtype: string;
  dvalue: string;
}
const ELEMENT_DATA: Element[] = [
  {position: 1 , ccode:'myfirstcoupon', dtype: '$50' , dvalue: 'percentage discount'  },
  {position: 2 , ccode:'freecoupon50', dtype: '$55' , dvalue: 'percentage discount'  },
  {position: 3 , ccode:'100couponfree', dtype: '$60' , dvalue: 'percentage discount'  },
  {position: 4 , ccode:'myfree50', dtype: '$80' , dvalue: 'percentage discount'  },
  {position: 5 , ccode:'freecoupon50', dtype: '$90' , dvalue: 'percentage discount'  },
  {position: 6 , ccode:'myfirstcoupon', dtype: '$120' , dvalue: 'percentage discount'  },
  {position: 7 , ccode:'100couponfree', dtype: '$140' , dvalue: 'percentage discount'  },
];
