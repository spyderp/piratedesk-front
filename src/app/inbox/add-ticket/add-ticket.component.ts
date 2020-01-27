import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Ticket } from '../shared/models'
import { TicketService } from '../shared/services/ticket.service'
import { ToastrService } from 'ngx-toastr'
import { DepartmentService } from '../../admin/shared/services/department.service'
import { ClientService } from '../../admin/shared/services/client.service'
import { PriorityService } from '../../admin/shared/services/priority.service'
import { NgxSmartLoaderService } from 'ngx-smart-loader'
@Component({
	selector: 'add-ticket',
	templateUrl: './add-ticket.component.html',
	styleUrls: ['./add-ticket.component.sass']
})
export class AddTicketComponent implements OnInit {
	@Output() close = new EventEmitter()
	@Output() update = new EventEmitter()
	public client: any = []
	public department: any = []
	public priority: any = []
	public model: Ticket =  new Ticket()
	constructor(
		private clientService: ClientService,
		private departmentService: DepartmentService,
		private loader: NgxSmartLoaderService,
		private notificationService: ToastrService,
		private priorityService: PriorityService,
		private ticketService: TicketService
	) { }

	ngOnInit() {
		const  currentUser = JSON.parse(localStorage.getItem('current.user'))
		this.departmentService.getList().subscribe(data => {this.department = data})
		this.clientService.getAll().subscribe(data => {this.client = data})
		this.priorityService.getList().subscribe(data => {this.priority = data})
		this.model.priority_id = 1
		this.model.client_id = 1
		this.model.user_id = currentUser.id
	}
	onClose() {
		this.close.emit(true)
	}
	onSubmit() {
		this.loader.start('appLoader')
		this.ticketService.create(this.model).subscribe(
			data => {
				this.notificationService.success('Se creo la nueva solicitud')
				this.model = new Ticket()
				this.loader.stop('appLoader')
				this.update.emit(true)
			},
			error => {
				this.notificationService.error('Ocurrio un error y no se pudo registrar su solicitud intente nuevamente.')
				this.loader.stop('appLoader')
			}
		)

	}
	onSelectClient( index) {
		if (index > 1) {
			const temp = this.client.filter((e) => {
				return e.id === index
			})
			this.model.telefono = temp[0].telefono
			this.model.email = temp[0].email
			this.model.celular = temp[0].celular
		} else {
			this.model.telefono = ''
			this.model.email = ''
			this.model.celular = ''
		}
	}
}
