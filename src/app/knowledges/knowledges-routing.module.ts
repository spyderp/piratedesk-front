import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {KnowledgesComponent } from './knowledges.component'
import { AuthGuardService } from '../shared/auth-guard.service'
const routes: Routes = [
	{ 
		path:'', component:KnowledgesComponent,  canActivate: [AuthGuardService],
	},
	{ 
		path:'/:deparment', component:KnowledgesComponent,  canActivate: [AuthGuardService],
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgesRoutingModule { }
