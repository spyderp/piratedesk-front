import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service'
import { AuthGuardService } from './auth-guard.service'
import { ToastyModule } from 'ng2-toasty';
import { ConfirmPasswordDirective } from './confirm-password.directive';
import { ForbiddenPasswordDirective } from './forbidden-password.directive';
import { Config } from './config.model';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
 // Change this to your upload POST address:
  url: Config.API_UPLOAD,
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};
@NgModule({
  imports: [
    CommonModule,
    ToastyModule.forRoot(),
    DropzoneModule
  ],
  declarations: [
  ConfirmPasswordDirective,
  ForbiddenPasswordDirective
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
  ],
  exports: [
    CommonModule,
    FormsModule,
    ToastyModule,
    ConfirmPasswordDirective,
    ForbiddenPasswordDirective,
    DropzoneModule
  ],
})
export class SharedModule { }
