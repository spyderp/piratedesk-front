import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { IndexComponent } from './index/index.component'
import { PublicComponent } from './public.component'

const routes: Routes = [
	{ path: '', component: PublicComponent,
		children:[
			{ path: '', component: IndexComponent, },
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
