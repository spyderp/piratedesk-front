import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KnowledgesRoutingModule } from './knowledges-routing.module';
import { KnowledgesComponent } from './knowledges.component';
import { KnowledgeService } from './shared/knowledge.service';
import { CoreModule } from '../core/core.module';
import { AdminModule } from '../admin/admin.module';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    KnowledgesRoutingModule,
    CoreModule,
    AdminModule,
    QuillModule,
    SharedModule,
    NgbModule
  ],
  declarations: [KnowledgesComponent],
  providers: [KnowledgeService]
})
export class KnowledgesModule { }
