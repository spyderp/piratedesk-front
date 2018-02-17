import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
  	private router: Router,
    private toastyService:ToastyService, 
    private toastyConfig: ToastyConfig
  ) { 
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.timeout = 5000;
        this.toastyConfig.position = 'top-right';
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let expired = Number(localStorage.getItem('current.expired'));
    if (localStorage.getItem('current.token') && expired > (Date.now()/1000)) {
        let user = localStorage.getItem('current.user');
        let path = route.url.join('');
        return true;
       // if(user.search(path)>0){
       //   return true;
       // }else{
       //     this.toastyService.info('No tiene permisos de accesos a esta sección');
       //     this.router.navigate(['/inbox']);
       //      return false;
       // }
    }

    // not logged in so redirect to login page with the return url
    this.toastyService.info('No tiene credenciales para acceder. Utilice su cuenta e intente nuevamente');
    this.router.navigate(['/login']);
    return false;
   
   }

}
