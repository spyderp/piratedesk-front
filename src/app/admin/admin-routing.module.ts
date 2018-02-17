import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component'
import { ClientsComponent} from './clients/clients.component'
import { DepartmentsComponent} from './departments/departments.component'
import { UsersComponent} from './users/users.component'
import { AuthGuardService } from '../shared/auth-guard.service'

const routes: Routes = [
	{ path: 'admin',  component: AdminComponent, canActivate: [AuthGuardService],
	children:[
		{ path: '', component: UsersComponent, pathMatch: 'full' },
		{ path: 'users',  component: UsersComponent, canActivate: [AuthGuardService]},
		{ path: 'departments',  component: DepartmentsComponent, canActivate: [AuthGuardService]},
		{ path: 'clients',  component: ClientsComponent, canActivate: [AuthGuardService]}
	]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
