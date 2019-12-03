import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminComponent } from './admin.component'
import { ClientsComponent} from './clients/clients.component'
import { ClientusersComponent} from './clientusers/clientusers.component'
import { DepartmentsComponent} from './departments/departments.component'
import { EstatesComponent} from './estates/estates.component'
import { PrioritiesComponent} from './priorities/priorities.component'
import { TemplatesComponent} from './templates/templates.component'
import { UsersComponent} from './users/users.component'
import { AuthGuardService } from '../shared/auth-guard.service'
import { Role } from '../shared/role.model'
const routes: Routes = [
	{ path: '', component: AdminComponent, canActivate: [AuthGuardService], data: { roles: [Role.Admin, Role.Supervisor] },
	children: [
		{ path: '', component: UsersComponent, pathMatch: 'full', data: { roles: [Role.Admin, Role.Supervisor] }},
		{ path: 'clients',  component: ClientsComponent, canActivate: [AuthGuardService], data: { roles: [ Role.Admin, Role.Supervisor] }},
		{ path: 'client_users',  component: ClientusersComponent, canActivate: [AuthGuardService], data: { roles: [ Role.Admin,
			Role.Supervisor] }},
		{ path: 'departments',  component: DepartmentsComponent, canActivate: [AuthGuardService], data: { roles: [ Role.Admin,
			 Role.Supervisor] }},
		{ path: 'estates',  component: EstatesComponent, canActivate: [AuthGuardService], data: { roles: [ Role.Admin, Role.Supervisor] }},
		{ path: 'priorities',  component: PrioritiesComponent, canActivate: [AuthGuardService], data: { roles: [ Role.Admin, Role.Supervisor] }},
		{ path: 'templates',  component: TemplatesComponent, canActivate: [AuthGuardService], data: { roles: [ Role.Admin, Role.Supervisor] }},
		{ path: 'users',  component: UsersComponent, canActivate: [AuthGuardService], data: { roles: [ Role.Admin, Role.Supervisor] }},
	]},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
 export class AdminRoutingModule { }
