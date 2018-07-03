import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from '../../inbox/shared/services/ticket.service';
import { Ticket } from '../../inbox/shared/models';
@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['../../../assets/css/_public.sass']
})
export class IndexComponent implements OnInit {
	public model:any = [];
	constructor(private notificationService:ToastrService) {	 }

	ngOnInit() {
		this.notificationService.warning('Hola mundo', 'Prueba')
	}
	onSubmit(){

	}
}
