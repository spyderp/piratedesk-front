import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { IndexComponent } from './index/index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from '../admin/admin.module';
import { InboxModule } from '../inbox/inbox.module';
import { LoginPublicComponent } from './login-public/login-public.component'
@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule,
    SharedModule,
    NgbModule,
    AdminModule,
    InboxModule
  ],
  declarations: [
  	PublicComponent,
  	ContactComponent,
  	FaqComponent,
  	IndexComponent,
  	LoginPublicComponent,
  ]
})
export class PublicModule { }
