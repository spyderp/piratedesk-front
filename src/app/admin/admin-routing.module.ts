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
import { AuthGuard } from '../shared/auth.guard'
import { Role } from '../shared/role.model'
const routes: Routes = [
	{ path: '', component: AdminComponent, canActivate: [ AuthGuard ], data: { roles: [Role.Admin, Role.Supervisor] },
	children: [
		{ path: '', component: UsersComponent, pathMatch: 'full', data: { roles: [Role.Admin, Role.Supervisor] }},
		{ path: 'clients',  component: ClientsComponent, canActivate: [ AuthGuard ], data: { roles: [ Role.Admin, Role.Supervisor] }},
		{ path: 'client_users',  component: ClientusersComponent, canActivate: [ AuthGuard ], data: { roles: [ Role.Admin,
			Role.Supervisor] }},
		{ path: 'departments',  component: DepartmentsComponent, canActivate: [ AuthGuard ], data: { roles: [ Role.Admin,
			 Role.Supervisor] }},
		{ path: 'estates',  component: EstatesComponent, canActivate: [ AuthGuard ], data: { roles: [ Role.Admin, Role.Supervisor] }},
		{ path: 'priorities',  component: PrioritiesComponent, canActivate: [ AuthGuard ], data: { roles: [ Role.Admin, Role.Supervisor] }},
		{ path: 'templates',  component: TemplatesComponent, canActivate: [ AuthGuard ], data: { roles: [ Role.Admin, Role.Supervisor] }},
		{ path: 'users',  component: UsersComponent, canActivate: [ AuthGuard ], data: { roles: [ Role.Admin, Role.Supervisor] }},
	]},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
 export class AdminRoutingModule { }
