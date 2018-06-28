import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component'
import { CalendarsComponent} from './calendars/calendars.component'
import { ClientsComponent} from './clients/clients.component'
import { DepartmentsComponent} from './departments/departments.component'
import { EstatesComponent} from './estates/estates.component'
import {  FaqsComponent} from './faqs/faqs.component'
import { CategoryfaqsComponent} from './categoryfaqs/categoryfaqs.component'
import { FestivesComponent} from './festives/festives.component'
import { PrioritiesComponent} from './priorities/priorities.component'
import { TemplatesComponent} from './templates/templates.component'
import { TrophiesComponent} from './trophies/trophies.component'
import { UsersComponent} from './users/users.component'
import { AuthGuardService } from '../shared/auth-guard.service'

const routes: Routes = [
	{ path: '',  component: AdminComponent, canActivate: [AuthGuardService],
	children:[
		{ path: '', component: UsersComponent, pathMatch: 'full' },
		{ path: 'calendars',  component: CalendarsComponent, canActivate: [AuthGuardService]},
		{ path: 'clients',  component: ClientsComponent, canActivate: [AuthGuardService]},
		{ path: 'departments',  component: DepartmentsComponent, canActivate: [AuthGuardService]},
		{ path: 'estates',  component: EstatesComponent, canActivate: [AuthGuardService]},
		{ path: 'faqs',  component: FaqsComponent, canActivate: [AuthGuardService]},
		{ path: 'categories',  component: CategoryfaqsComponent, canActivate: [AuthGuardService]},
		{ path: 'festives',  component: FestivesComponent, canActivate: [AuthGuardService]},
		{ path: 'priorities',  component: PrioritiesComponent, canActivate: [AuthGuardService]},
		{ path: 'templates',  component: TemplatesComponent, canActivate: [AuthGuardService]},
		{ path: 'trophies',  component: TrophiesComponent, canActivate: [AuthGuardService]},
		{ path: 'users',  component: UsersComponent, canActivate: [AuthGuardService]},
	]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
 export class AdminRoutingModule { }
