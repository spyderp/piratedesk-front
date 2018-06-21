import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module'
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { IndexComponent } from './index/index.component';
@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
  	PublicComponent,
  	ContactComponent,
  	FaqComponent,
  	IndexComponent
  ]
})
export class PublicModule { }
