import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserType } from '../enums/user-type';


@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		const isAuthenticated = this.isLogged();

		if (isAuthenticated) {
			if (route?.url[0]?.path == 'Add' || route?.url[0]?.path == 'Edit') {
				const isEmployee = this.isEmployee();

				if (isEmployee) {
					return of(isEmployee);
				} else {
					return this.redirectToLogin();
				}
			}
			return of(isAuthenticated);
		} else {
			return this.redirectToLogin();
		}
	}
	
	isLogged(): boolean {
		if (localStorage.getItem('userId')) {
			return true;
		}

		return false;
	}

	isEmployee(): boolean {
		if (localStorage.getItem('userType') && localStorage.getItem('userType') === UserType[UserType.Employee]) {
			return true;
		}

		return false;
	}

	redirectToLogin(): Observable<boolean> {
		// Not logged in, so redirect to login page.
		window.location.href = '/Login';
		return of(false);
	}
}
