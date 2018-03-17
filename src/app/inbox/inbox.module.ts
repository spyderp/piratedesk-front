import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { CoreModule } from '../core/core.module';
@NgModule({
  imports: [
    CommonModule,
    InboxRoutingModule,
    CoreModule
  ],
  declarations: [InboxComponent],
})
export class InboxModule { }
