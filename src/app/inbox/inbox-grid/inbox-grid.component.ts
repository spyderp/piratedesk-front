import { Component, OnInit } from '@angular/core';
import { Ticket, Filter } from '../shared/models'
import { TicketService } from  '../shared/services/ticket.service'
import { EstateService } from '../../admin/shared/services/estate.service';
import { DepartmentService } from '../../admin/shared/services/department.service';
@Component({
  selector: 'app-inbox-grid',
  templateUrl: './inbox-grid.component.html',
  styleUrls: ['./inbox-grid.component.sass'],
  providers:[EstateService,DepartmentService]
})
export class InboxGridComponent implements OnInit {
	private tickets:Ticket[]=[];
  selected = [];
  isEdit:boolean = false;
  isDel:boolean = false;
  public model:Filter = new Filter;
  estados:any[];
  departamentos:any[];
  temp = [];
  constructor(
  	private ticketService:TicketService,
    private estateService:EstateService,
    private departmentService:DepartmentService
  ) { }

  ngOnInit() {
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
    });
    this.departmentService.getList().subscribe(data=>{ this.departamentos=data; })
     this.estateService.getAll().subscribe(data=>{ this.estados=data; })
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

  

}
