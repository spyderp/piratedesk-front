import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { InboxComponent } from './inbox.component'
import { EditTicketComponent } from './edit-ticket/edit-ticket.component'
import { AuthGuard } from '../shared/auth.guard'

const routes: Routes = [
	{ path: '', component: InboxComponent, canActivate: [AuthGuard], data: { roles: ['administrador'] }},
	{ path: 'edit/:id', component: EditTicketComponent, canActivate: [AuthGuard], data: { roles: ['administrador'] }},
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class InboxRoutingModule { }
