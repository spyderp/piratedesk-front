import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NgProgressModule } from 'ngx-progressbar';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
@NgModule({
  imports: [
    CommonModule,
    NgProgressModule,
    RouterModule,
    NgbModule,
    SharedModule
  ],
  declarations: [NavbarComponent, LoginComponent, ForgotPasswordComponent],
  exports: [NavbarComponent],
  providers:[]
})
export class CoreModule { }
