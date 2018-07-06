import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './inbox.component'
import { AuthGuardService } from '../shared/auth-guard.service'
import { InboxGridComponent } from './inbox-grid/inbox-grid.component'
import { AddTicketComponent } from './add-ticket/add-ticket.component'

const routes: Routes = [
	{ path:'', component:InboxComponent,  canActivate: [AuthGuardService],
		children:[
			{ path:'', component:InboxGridComponent, outlet:'tabsbody'},
			{ path:'new_ticket', component:AddTicketComponent, outlet:'tabsbody'},
		]
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
