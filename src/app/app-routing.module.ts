import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './core/login/login.component'
import { ForgotPasswordComponent } from './core/forgot-password/forgot-password.component'

const routes: Routes = [
	{ path: '', loadChildren: () => import('app/public/public.module').then(m => m.PublicModule) },
	{ path:'admin',  loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule)},
	{ path: 'forgot_password', component:ForgotPasswordComponent},
	{ path:'inbox',   loadChildren: () => import('app/inbox/inbox.module').then(m => m.InboxModule)},
	{ path:'know',   loadChildren: () => import('app/knowledges/knowledges.module').then(m => m.KnowledgesModule)},
	{ path:'login', component:LoginComponent, }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
