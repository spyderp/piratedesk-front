import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ticket, Filter } from '../shared/models'
import { TicketService } from  '../shared/services/ticket.service'
import { EstateService } from '../../admin/shared/services/estate.service';
import { DepartmentService } from '../../admin/shared/services/department.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router} from '@angular/router';
@Component({
  selector: 'inbox-grid',
  templateUrl: './inbox-grid.component.html',
  styleUrls: ['./inbox-grid.component.sass'],
})
export class InboxGridComponent implements OnInit {
  @Output() edit = new EventEmitter();
  departamentos:any[];
  estados:any[];
  isDel:boolean = false;
  isEdit:boolean = false;
  model:Filter = new Filter;
  selected = [];
  temp = [];
  tickets:Ticket[]=[];
  loading: boolean = false
  modalReference
  constructor(
    private departmentService:DepartmentService,
    private estateService:EstateService,
    private modalService: NgbModal,
    private router: Router,
    private ticketService:TicketService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.loadAll()

  }
  getRowClass(row){
    let clase:string = '';
    if(row.priorities.id>1){
      if(row.priorities.id==2){
        clase = 'row-info';
      }else if(row.priorities.id==3){
        clase = 'row-warning';
      }else if(row.priorities.id==4){
        clase = 'row-orange';
      }else if(row.priorities.id==4){
        clase = 'row-danger';
      }
    }
    return clase;
  }
  loadAll(){
  	this.ticketService.getAll().subscribe(data => { 
      this.temp = data;
      this.tickets = data;
      this.loading = false;
    });
    this.departmentService.getList().subscribe(data=>{ this.departamentos=data; })
     this.estateService.getAll().subscribe(data=>{ this.estados=data; })
  }
  /**
   * [sortDate description] Permite ordenar la fecha
   */
  sortDate(valueA, valueB, rowA, rowB, sortDirection) {
    let a = new Date(valueA);
    let b = new Date(valueB);
    return a>b ? -1 : a<b ? 1 : 0;
  }

  onAdd(content){
    this.modalReference = this.modalService.open(content,{size:'lg'})
  }
  onClose(event){
    this.modalReference.close()
  }
  onFilter(){
    // filter our data
    this.ticketService.getAll(this.model).subscribe(data => {this.tickets =data });
  }

  onCheck(e){
    if(e.target.checked){
      this.model.prioridad.push(e.target.value)
    }else{
      let index:number = this.model.prioridad.map((element)=>{return element}).indexOf(e.target.value);
      delete this.model.prioridad[index] 
    }
  }
  onReset(form){
    this.model = new Filter;
    this.tickets = this.temp;
  }
  onSelect({ selected }) {
    if(selected.length>0 && selected.length<2){
      this.isEdit = true;
      this.isDel  = true;
    }else if(selected.length>1){
      this.isEdit = false;
      this.isDel  = true;
    }else if(selected.length==0){
      this.isEdit = false;
      this.isDel  = false;
    }
  }
  onEdit(id){
    this.isEdit = false;
    this.router.navigate(['/inbox/edit',{id:id}]);
    this.selected = [];
  }
  onDel(){
    let msg = this.selected.length>1?'Esta seguro que desea Borrar los registros seleccionados':'Esta seguro que desea Borrar el registro seleccionado';
    if(confirm(msg)){
      let index:number
      if(this.selected.length==1){
        index = this.tickets.map((element)=>{return element.id}).indexOf(this.selected[0].id);
        delete this.tickets[index];
        this.ticketService.delete(this.selected[0].id).subscribe()
      }else{
        this.selected.forEach(e=>{
          index = this.tickets.map((element)=>{return element.id}).indexOf(e.id);
          delete this.tickets[index];
          this.ticketService.delete(e.id).subscribe()
        });
      }
      
      this.isDel  = false;
    }
  }
  
  onUpdate(event){
    this.loading = true;
    this.loadAll()
    this.modalReference.close()
  }

}
