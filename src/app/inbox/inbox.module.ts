import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { CoreModule } from '../core/core.module';
import { InboxGridComponent } from './inbox-grid/inbox-grid.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { TicketService } from './shared/services/ticket.service';
import { QuillModule } from 'ngx-quill'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  imports: [
    CommonModule,
    InboxRoutingModule,
    CoreModule,
    QuillModule,
    NgxDatatableModule
  ],
  declarations: [InboxComponent, InboxGridComponent, AddTicketComponent],
  providers: [TicketService],
})
export class InboxModule { }
