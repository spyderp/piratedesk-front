import { Component, OnInit } from '@angular/core';
import { Ticket } from '../shared/models/ticket.model'
import { TicketService } from  '../shared/services/ticket.service'
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
@Component({
  selector: 'add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.sass']
})
export class AddTicketComponent implements OnInit {
	private model:Ticket =  new Ticket();
  constructor(
  	private toastyService:ToastyService, 
		private toastyConfig: ToastyConfig,
  	private ticketService:TicketService
  ) {
  	this.toastyConfig.theme = 'bootstrap';
		this.toastyConfig.timeout = 5000;
		this.toastyConfig.position = 'top-right';
   }

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
