import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

		const isAuthenticated = this.isLogged();

		if (isAuthenticated) {
			return of(isAuthenticated);
		} else {
			// Not logged in, so redirect to login page.
			window.location.href = '/login';
			return of(false);
		}
	}
	
	isLogged(): boolean {
		if (localStorage.getItem('userId')) {
			return true;
		}

		return false;
	}
}
