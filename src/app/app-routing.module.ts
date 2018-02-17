import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './core/login/login.component'


const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{path:'login', component:LoginComponent},
	{ path:'inbox',  loadChildren: 'app/inbox/inbox.module#InboxModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
