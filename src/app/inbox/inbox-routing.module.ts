import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox.component'
import { EditTicketComponent } from './edit-ticket/edit-ticket.component'
import { AuthGuardService } from '../shared/auth-guard.service'

const routes: Routes = [
	{ path:'', component:InboxComponent,  canActivate: [AuthGuardService],},
	{ path:'edit', component:EditTicketComponent,  canActivate: [AuthGuardService],},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
