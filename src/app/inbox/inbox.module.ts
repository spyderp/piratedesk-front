import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { CoreModule } from '../core/core.module';
import { InboxGridComponent } from './inbox-grid/inbox-grid.component';
import { AddTicketComponent } from './add-ticket/add-ticket.component';
import { TicketService } from './shared/services/ticket.service';
import { QuillModule } from 'ngx-quill'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    InboxRoutingModule,
    CoreModule,
    QuillModule,
    NgxDatatableModule,
    FormsModule,
    NgbModule
  ],
  declarations: [InboxComponent, InboxGridComponent, AddTicketComponent],
  providers: [TicketService],
})
export class InboxModule { }
