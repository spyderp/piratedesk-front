import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgSelectModule } from '@ng-select/ng-select'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { CoreModule } from '../core/core.module'
import { SharedModule } from '../shared/shared.module'
import { AdminComponent } from './admin.component'
import { AdminRoutingModule } from './admin-routing.module'
import { ClientsComponent } from './clients/clients.component'
import { ClientService  } from './shared/services/client.service'
import { DatagridComponent } from './shared/datagrid.component'
import { DepartmentsComponent } from './departments/departments.component'
import { DepartmentService  } from './shared/services/department.service'
import { RolService  } from './shared/services/rol.service'
import { UsersComponent } from './users/users.component'
import { UserService  } from './shared/services/user.service'
import { TemplatesComponent } from './templates/templates.component'
import { TemplateService } from './shared/services/template.service'
import { EstatesComponent } from './estates/estates.component'
import { EstateService } from './shared/services/estate.service'
import { PrioritiesComponent } from './priorities/priorities.component'
import { PriorityService } from './shared/services/priority.service'
import { QuillModule } from 'ngx-quill'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ClientusersComponent } from './clientusers/clientusers.component'
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgSelectModule,
    NgxDatatableModule,
    CoreModule,
    SharedModule,
    QuillModule,
    NgbModule
  ],
  declarations: [
    AdminComponent,
      DatagridComponent,
     ClientsComponent,
     DepartmentsComponent,
     UsersComponent,
     TemplatesComponent,
     EstatesComponent,
     PrioritiesComponent,
     ClientusersComponent,
     ],
  providers: [ 
    ClientService,
    DepartmentService, 
    EstateService,
    PriorityService,
    RolService, 
    TemplateService,
    UserService,
  ]
})
export class AdminModule { }
