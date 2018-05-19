import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
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
import { UserService  } from './shared/user.service';
import { CalendarsComponent } from './calendars/calendars.component';
import { CalendarService } from './shared/services/calendar.service';
import { TemplatesComponent } from './templates/templates.component';
import { TemplateService } from './shared/services/template.service';
import { EstatesComponent } from './estates/estates.component';
import { EstateService } from './shared/services/estate.service';
import { TrophiesComponent } from './trophies/trophies.component';
import { TrophyService } from './shared/services/trophy.service';
import { PrioritiesComponent } from './priorities/priorities.component'
import { PriorityService } from './shared/services/priority.service';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqService } from './shared/services/faq.service';
import { QuillModule } from 'ngx-quill';
import { FestiveService } from './shared/services/festive.service';
import { FestivesComponent } from './festives/festives.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
     CalendarsComponent,
     TemplatesComponent,
     EstatesComponent,
     TrophiesComponent,
     PrioritiesComponent,
     FaqsComponent,
     FestivesComponent,
     ],
  providers: [ 
    CalendarService,
    ClientService,
    DepartmentService, 
    EstateService,
    PriorityService,
    RolService, 
    TemplateService,
    TrophyService,
    UserService,
    FaqService,
    FestiveService
  ]
})
export class AdminModule { }
