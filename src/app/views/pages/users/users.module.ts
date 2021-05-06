import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { AdduserComponent } from './adduser/adduser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
	MatInputModule,
	MatSlideToggleModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatExpansionModule,
	MatAutocompleteModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatSnackBarModule,
	MatTooltipModule
	
} from '@angular/material';
import { ContactsComponent } from './contacts/contacts.component';
import { MembersComponent } from './members/members.component';
import { EditmemberComponent } from './editmember/editmember.component';
import { AddmemberComponent } from './addmember/addmember.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { EditcontactComponent } from './editcontact/editcontact.component';



@NgModule({
  declarations: [UsersComponent, AdduserComponent, EdituserComponent, ContactsComponent, MembersComponent, EditmemberComponent, AddmemberComponent, AddcontactComponent, EditcontactComponent],
  imports: [
    CommonModule,
	NgbModule,
	FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatSlideToggleModule,
		MatMenuModule,
		MatSelectModule,
        MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatTabsModule,
		MatTooltipModule,
		MatDialogModule,
	   RouterModule.forChild([
			{
				path: '',
				component: UsersComponent
			},
			{
				path: 'adduser',
				component: AdduserComponent
			},
			{
				path: 'edituser/:id',
				component: EdituserComponent
			},
			{
				path: 'contacts/:id',
				component: ContactsComponent
			},
			{
				path: 'addcontact/:id',
				component: AddcontactComponent
			},
			{
				path: 'editcontact/:id',
				component: EditcontactComponent
			},
			{
				path: 'members/:id',
				component: MembersComponent
			},
			{
				path: 'addmember/:id',
				component: AddmemberComponent
			},
			{
				path: 'editmember/:id',
				component: EditmemberComponent
			}


			
		])
  ]
})
export class UsersModule { }
