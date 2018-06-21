import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { IndexComponent } from './index/index.component';
import { PublicComponent } from './public.component';
const routes: Routes = [
	{ path:'', component:PublicComponent,
		children:[
			{ path:'', component:IndexComponent,},
			{ path:'faq', component:FaqComponent,},
			{ path:'contact', component:ContactComponent,},
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
