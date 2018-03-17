import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service'
import { AuthGuardService } from './auth-guard.service'
import { ToastyModule } from 'ng2-toasty';
import { ConfirmPasswordDirective } from './confirm-password.directive';
import { ForbiddenPasswordDirective } from './forbidden-password.directive';
@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
  ],
  declarations: [
  ConfirmPasswordDirective,
  ForbiddenPasswordDirective
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  exports: [
    CommonModule,
    FormsModule,
    ToastyModule,
    ConfirmPasswordDirective,
    ForbiddenPasswordDirective
  ],
})
export class SharedModule { }
