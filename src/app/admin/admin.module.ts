import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component'
import { AdminRoutingModule } from './admin-routing.module';
import { ClientsComponent } from './clients/clients.component';
import { ClientService  } from './shared/client.service'
import { DatagridComponent } from './shared/datagrid.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentService  } from './shared/department.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../shared/jwt.interceptor'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RolService  } from './shared/rol.service'
import { UsersComponent } from './users/users.component';
import { UserService  } from './shared/user.service'
import {SelectModule} from 'ng2-select';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    SelectModule,
    NgxDatatableModule,
  ],
  declarations: [AdminComponent, ClientsComponent, DepartmentsComponent, UsersComponent, DatagridComponent, ],
  exports:[AdminComponent, DatagridComponent],
  providers: [
   {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ClientService, DepartmentService, RolService, UserService]
})
export class AdminModule { }
