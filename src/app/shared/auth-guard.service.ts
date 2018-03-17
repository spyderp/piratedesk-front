import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { AuthService } from './auth.service'
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
  	private router: Router,
    private toastyService:ToastyService, 
    private toastyConfig: ToastyConfig
  ) { 
        this.toastyConfig.theme = 'bootstrap';
        this.toastyConfig.timeout = 5000;
        this.toastyConfig.position = 'top-right';
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isExpired = this.auth.getExpired();
    let isTokken = this.auth.getToken()?true:false;
    let path = state.url;
    if ( isTokken && !isExpired) {
       //return true;
       return this.__privigele(path);
    }else if(isTokken && isExpired) {
      this.auth.getRefresh();
      //return true;
      return this.__privigele(path);
    }

    // not logged in so redirect to login page with the return url
    this.toastyService.info('No tiene credenciales para acceder. Utilice su cuenta e intente nuevamente');
    this.router.navigate(['/login']);
    return false;
   
   }

   private __privigele(path:string):boolean{
      let user = this.auth.getUser();
      if(user.search(path)>0){
        return true;
      }else{
        this.toastyService.info('No tiene permisos de accesos a esta sección');
        this.router.navigate(['/inbox']);
        return false;
      }
   }

}
