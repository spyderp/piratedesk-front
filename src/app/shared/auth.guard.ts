import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service'
@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private auth: AuthService,
		private router: Router,
		private toastyService: ToastrService,
	) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const isExpired = this.auth.getExpired()
		const isTokken = this.auth.getToken() ? true : false
		if (isTokken && !isExpired) {
			// return true;
			return this.__privigele(next)
		} else if (isTokken && isExpired) {
			this.auth.getRefresh()
			// return true;
			return this.__privigele(next)
		}

		// not logged in so redirect to login page with the return url
		this.toastyService.info('No tiene credenciales para acceder. Utilice su cuenta e intente nuevamente');
		this.router.navigate(['/login'])
		return false
	}

	private __privigele(route: any): boolean {
		const user: any = JSON.parse(this.auth.getUser())
		if (route.data.roles && route.data.roles.indexOf(user.role) > -1) {
			return true
		} else {
			this.toastyService.info('No tiene permisos de accesos a esta sección')
			this.router.navigate(['/inbox'])
			return false
		}
	}
}
