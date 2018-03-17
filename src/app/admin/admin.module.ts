import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectModule} from 'ng2-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module'
import { AdminComponent } from './admin.component'
import { AdminRoutingModule } from './admin-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ClientService  } from './shared/client.service'
import { DatagridComponent } from './shared/datagrid.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentService  } from './shared/department.service'
import { RolService  } from './shared/rol.service'
import { UsersComponent } from './users/users.component';
import { UserService  } from './shared/user.service'

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SelectModule,
    NgxDatatableModule,
    CoreModule,
    SharedModule
  ],
  declarations: [AdminComponent,  DatagridComponent, ClientsComponent, DepartmentsComponent, UsersComponent, ],
  providers: [ 
    ClientService, DepartmentService, RolService, UserService,
  ]
})
export class AdminModule { }
