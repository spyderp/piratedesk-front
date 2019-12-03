import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { IndexComponent } from './index/index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from '../admin/admin.module';
// import { InboxModule } from '../inbox/inbox.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { RECAPTCHA_SETTINGS, RECAPTCHA_LANGUAGE, RecaptchaSettings } from 'ng-recaptcha';
@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule,
    SharedModule,
    NgbModule,
    AdminModule,
//    InboxModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  declarations: [
  	PublicComponent,
  	IndexComponent,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LeIfmMUAAAAAGii_lgIexRvvrspHfamWtq3m53k' } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'es', 
    },
  ],
})
export class PublicModule { }
