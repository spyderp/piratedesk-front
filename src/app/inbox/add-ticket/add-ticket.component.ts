import { Component, OnInit } from '@angular/core';
import { Ticket } from '../shared/models'
import { TicketService } from  '../shared/services/ticket.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.sass']
})
export class AddTicketComponent implements OnInit {
	private model:Ticket =  new Ticket();
  constructor(
  	private toastyService:ToastrService, 
  	private ticketService:TicketService
  ) { }

  ngOnInit() {
  }
  onSubmit(){
	 this.ticketService.create(this.model).subscribe(
			data => {
				if(data){
					this.toastyService.success('Nuevo registro creado con exito');
				}else{
					this.toastyService.error('El registro no se pudo guardar corregir e intente nuevamente');
				}
				
			},
		error => {
			this.toastyService.error(error);
		});
  }
}
