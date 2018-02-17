import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../shared/auth.service'
import { FormsModule } from '@angular/forms';
import { NgProgressModule } from 'ngx-progressbar';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgProgressModule
  ],
  declarations: [NavbarComponent, LoginComponent],
  exports: [NavbarComponent],
  providers:[AuthService]
})
export class CoreModule { }
