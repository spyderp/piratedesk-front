import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './core/login/login.component'
import { ForgotPasswordComponent } from './core/forgot-password/forgot-password.component'

const routes: Routes = [
	{ path: '', loadChildren: './public/public.module#PublicModule' },
	{ path: 'admin',  loadChildren: './admin/admin.module#AdminModule' },
	{ path: 'forgot_password', component: ForgotPasswordComponent},
	{ path: 'inbox',   loadChildren: './inbox/inbox.module#InboxModule' },
	{ path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
