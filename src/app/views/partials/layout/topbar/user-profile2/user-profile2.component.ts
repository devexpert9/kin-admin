// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../../core/auth';

@Component({
	selector: 'kt-user-profile2',
	templateUrl: './user-profile2.component.html',
})
export class UserProfile2Component implements OnInit {
	// Public properties
	user$: Observable<User>;

	@Input() avatar = true;
	@Input() greeting = true;
	@Input() badge: boolean;
	@Input() icon: boolean;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	 loginUser:any='';
	constructor(private router: Router, private store: Store<AppState>) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));

		// this.loginUser = Locastorage.GetItem('');
	}

	/**
	 * Log out
	 */
	logout() {
		// this.auth.logout();

		localStorage.setItem('isLoggedIn', 'false');
  		localStorage.setItem('user_id', 'null');
  		localStorage.setItem('firstname', 'null');
  		localStorage.setItem('lastname', 'null');
  		localStorage.setItem('user_email', 'null');

  		this.router.navigate(['./auth']);

		// this.router.navigateByUrl('/auth');

	}
}
