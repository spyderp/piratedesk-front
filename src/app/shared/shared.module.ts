import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { ConfirmPasswordDirective } from './confirm-password.directive';
import { ForbiddenPasswordDirective } from './forbidden-password.directive';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment} from '../../environments/environment';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
 // Change this to your upload POST address:
  url: environment.apiServer+'/files',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};
@NgModule({
  imports: [
    CommonModule,
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
    ConfirmPasswordDirective,
    ForbiddenPasswordDirective,
    DropzoneModule,
  ],
})
export class SharedModule { }
