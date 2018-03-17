import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './core/login/login.component'
import { ForgotPasswordComponent } from './core/forgot-password/forgot-password.component'



const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path:'login', component:LoginComponent, },
	{ path: 'forgot_password', component:ForgotPasswordComponent},
	{ path:'inbox',   loadChildren: 'app/inbox/inbox.module#InboxModule'},
	{ path:'admin',  loadChildren: 'app/admin/admin.module#AdminModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
