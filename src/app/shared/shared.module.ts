import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service'
import { AuthGuardService } from './auth-guard.service'
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
  ],
  declarations: [
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  exports: [
    CommonModule,
    FormsModule,
    ToastyModule,
  ],
})
export class SharedModule { }
