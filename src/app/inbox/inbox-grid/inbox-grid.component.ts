import { Component, OnInit } from '@angular/core';
import { Ticket } from '../shared/models/ticket.model'
import { TicketService } from  '../shared/services/ticket.service'
@Component({
  selector: 'app-inbox-grid',
  templateUrl: './inbox-grid.component.html',
  styleUrls: ['./inbox-grid.component.sass']
})
export class InboxGridComponent implements OnInit {
	private tickets:Ticket[]=[];
  selected = [];
  isEdit:boolean = false;
  isDel:boolean = false;
  constructor(
  	private ticketService:TicketService,
  ) { }

  ngOnInit() {
  	this.loadAll()
  }
  loadAll(){
  	this.ticketService.getAll().subscribe(data => { this.tickets = data;});
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
