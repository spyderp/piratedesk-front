import { Component, OnInit, Input, EventEmitter,Output } from '@angular/core';
import { Ticket } from '../shared/models'
import { TicketService } from  '../shared/services/ticket.service'
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../admin/shared/services/department.service'
import { ClientService } from '../../admin/shared/services/client.service'
import { PriorityService } from '../../admin/shared/services/priority.service'
import { NgxSmartLoaderService } from 'ngx-smart-loader';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'edit-ticket',
	templateUrl: './edit-ticket.component.html',
	styleUrls: ['./edit-ticket.component.sass']
})

export class EditTicketComponent implements OnInit {
	@Input() ticket:Ticket;
	@Output() save = new EventEmitter();
	public client:any =[];
	public department:any =[];
	public priority:any = []
	public model:Ticket =  new Ticket();
	public assigment:boolean = false
	public del:boolean = false
	public edit:boolean = false
	private __currentUser:any;
	static SUPERVISOR = 3
	constructor(
		private clientService:ClientService,
		private departmentService:DepartmentService,
		private loader:NgxSmartLoaderService,
		private notificationService:ToastrService,
		private priorityService:PriorityService,
		private ticketService:TicketService,
		private toastyService:ToastrService 
	) { }

	ngOnInit() {
		this.departmentService.getList().subscribe(data=>{this.department=data})
		this.clientService.getAll().subscribe(data=>{this.client=data})
		this.priorityService.getList().subscribe(data=>{this.priority=data})
		this.model = this.ticket
		this.__currentUser = JSON.parse(localStorage.getItem('current.user'))
		this._assigment(this.ticket)
	}

	onAssign(){
		//Se valida que el usuario no sea supervisor
		if(this.__currentUser.rol_id != EditTicketComponent.SUPERVISOR){
			let data = {
				user_id: this.__currentUser.id,
				edit: true,
				state_id:2
			}
			this.ticketService.patch(this.ticket.id, data).subscribe(
				data => {
					this.toastyService.success('Se ha asignado a este caso');	
				},
				error => {
					this.toastyService.error('Ocurrio un error y no se pudo guardar, corregir e intente nuevamente');
				}
			);
			this.assigment = true;
			//TODO: cuando un supervisor se asigna
			//this.del = e.supervisor
			this.edit = true
			
		}else{

		}
	}
	onDelete(){
		if(confirm('Desea borrar el #caso #'+this.model.id+"? Si prosigue no se podra recuperar nuevamente")){

		}
	}
	onEdit(){

	}

	onSubmit(){
		this.loader.start('appLoader')
		this.ticketService.create(this.model).subscribe(
			data=>{
				this.notificationService.success('Se creo la nueva solicitud')
				this.model = new Ticket()
				this.loader.stop('appLoader')
			},
			error=>{
				this.notificationService.error('Ocurrio un error y no se pudo registrar su solicitud intente nuevamente.')
				this.loader.stop('appLoader')
			}
		);
	}
	private _assigment(model:Ticket){
		if(model.assigments.length>0){
			model.assigments.map((e)=>{
				if(e.user_id==this.__currentUser.id){
					this.assigment = true;
					this.del = e.supervisor
					this.edit = e.edit
				}
			})
		}
	}
}
