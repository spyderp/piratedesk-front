import { Component, OnInit, ViewChild} from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Ticket } from '../shared/models'
import { TicketService } from '../shared/services/ticket.service'
import { ToastrService } from 'ngx-toastr'
import { DepartmentService } from '../../admin/shared/services/department.service'
import { ClientService } from '../../admin/shared/services/client.service'
import { PriorityService } from '../../admin/shared/services/priority.service'
import { EstateService } from '../../admin/shared/services/estate.service'
import { NgxSmartLoaderService } from 'ngx-smart-loader'
import { DropzoneConfigInterface, DropzoneComponent } from 'ngx-dropzone-wrapper'
import { environment} from '../../../environments/environment'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { UserService } from '../../admin/shared/services/user.service'
@Component({
	selector: 'edit-ticket',
	templateUrl: './edit-ticket.component.html',
	styleUrls: ['./edit-ticket.component.sass']
})

export class EditTicketComponent implements OnInit {
	static SUPERVISOR = 'supervisor'
	@ViewChild('asingList') asingList
	config: DropzoneConfigInterface = {
		url: environment.apiServer + '/files',
		maxFilesize: 2,
		acceptedFiles: 'image/*,application/pdf'
	}
	agents: any[] = []
	asingSupervisor = null
	assigment = false
	changeState: number
	client: any[]
	dDescription: string
	del = false
	department: any[]
	eDescription: string
	edit = false
	formEdit = false
	model: Ticket = new Ticket()
	m: any
	path: String = environment.apiServer + '/files'
	pDescription: string
	prioritiesId: number
	priority: any = []
	states: any[]
	tempContent = ''
	ticketId: string
	private __currentUser: any
	@ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
	constructor(
		private clientService: ClientService,
		private departmentService: DepartmentService,
		private estateService: EstateService,
		private userService: UserService,
		private loader: NgxSmartLoaderService,
		private modal: NgbModal,
		private priorityService: PriorityService,
		private route: ActivatedRoute,
		private ticketService: TicketService,
		private toastrService: ToastrService
	) { }

	ngOnInit() {
		this.loader.start('appLoader')
		this.ticketId = this.route.snapshot.paramMap.get('id')
		this._loadAll(this.ticketId)
	}

	onAssign() {
		// Se valida que el usuario no sea supervisor
		if ( this.__currentUser.role !== EditTicketComponent.SUPERVISOR) {
			const data = {
				user_id: this.__currentUser.id,
				edit: true,
				state_id: 2
			}
			this._setAssing(data);
		} else {
			this.userService.getAgent().subscribe( data => this.agents = data, error => console.log(error) )
			this.m = this.modal.open(this.asingList)
		}
	}
	onSupervisorAssing() {
		const data = {
			user_id: this.asingSupervisor,
			edit: true,
			state_id: 2
		}
		const currentUser = this.asingSupervisor === this.__currentUser.id
		this._setAssing(data, currentUser)
		this.m.close()
	}
	onCancelEdit() {
		this.model.content = this.tempContent
		this.formEdit = false
	}
	onDelete() {
		if ( confirm('Desea borrar el #caso #' + this.model.id + '? Si prosigue no se podra recuperar nuevamente')) {

		}
	}

	onDeleteFile(id) {
		const data = {
			file_id: id
		}
		this.ticketService.patch(this.model.id, data, 3).subscribe( () => {
			if (this.model.files.length > 0) {
				const index: number = this.model.files.map(element => element.id).indexOf(id)
				if (index > -1) {
					this.model.files.splice(index, 1)
				}
			}
		}, error => {
				this.toastrService.error('Ocurrio un error y no se pudo eliminar el archivo, intente nuevamente')
		})
	}
	onEdit() {
		this.formEdit = true
		this.tempContent = this.model.content
	}
	onState(stateId: number, event) {
		if ( stateId != 4){
			const data = {
				state_id: stateId
			}
			this.ticketService.patch(this.model.id, data, 1).subscribe(
				() => {
					this.toastrService.success('Se ha cambiado el estado con exito')
					this.changeState = stateId
					if( this.edit === false && stateId > 4 ){
						this.edit = true
					}
				},
				error => {
					this.toastrService.error('Ocurrio un error y no se pudo guardar, corregir e intente nuevamente')
				}
			)
		} else if (stateId == 4) {
			const answer = confirm('Esta seguro que desea finalizar el caso')
			if (answer) {
				const data = {
					state_id: stateId
				}
				this.ticketService.patch(this.model.id, data, 1).subscribe(
					() => {
						this.toastrService.success('Se ha cambiado el estado con exito')
						this.changeState = stateId
						this.edit = false
					},
					error => {
						this.toastrService.error('Ocurrio un error y no se pudo guardar, corregir e intente nuevamente')
					}
				)
			} else {
				event.target.value = this.changeState
			}
		}
	}
	onSubmit() {
		this.loader.start('appLoader')
		this.ticketService.update(this.model).subscribe(
			data => {
				this.toastrService.success('Se ha actualido el caso')
				this.eDescription = data.states.descripcion
				this.dDescription = data.departments.descripcion
				this.pDescription = data.priorities.descripcion
				this.prioritiesId = data.priorities.id
				this.model.keys   = data.keys
				this.loader.stop('appLoader')
				this.formEdit = false
			},
			error => {
				this.toastrService.error('Ocurrio un error y no se pudo actualizar  el caso, corregir e intente nuevamente.')
				this.loader.stop('appLoader')
			}
		)
	}
	private _loadAll(id) {
		this.departmentService.getList().subscribe(data => { this.department = data })
		this.clientService.getAll().subscribe(data => { this.client = data })
		this.priorityService.getList().subscribe(data => { this.priority = data })
		this.estateService.getAll().subscribe(data => { this.states = data })
		this.ticketService.getById(id).subscribe(data => {
			this.model = data
			this.eDescription = data.states.descripcion
			this.dDescription = data.departments.descripcion
			this.pDescription = data.priorities.descripcion
			this.prioritiesId = data.priorities.id
			this._assigment(data)
		})
		this.__currentUser = JSON.parse(localStorage.getItem('current.user'))
		this.loader.stop('appLoader')
	}
	private _assigment(model: Ticket) {
		if (model.assigments && model.assigments.length > 0) {
			model.assigments.map((e) => {
				if (e.user_id === this.__currentUser.id){
					this.assigment = true
					this.del = e.supervisor
					this.edit = this.model.state_id != 4 ? e.edit : false
					this.changeState = model.state_id
				}
			})
		}
	}

	private _setAssing(data, assigment = true) {
		this.ticketService.patch(this.model.id, data).subscribe(
			() => {
				this.toastrService.success('Se ha asignado a este caso')
				this.changeState = 2
				this.model.state_id = 2
				if (assigment) {
					this.assigment = true
					this.edit = true
				}
			},
			error => {
				const msg = error.error.message === 'Error: USER' ? 'El usuario ya se encuentra asignado' :
				 'Ocurrio un error y no se pudo guardar, corregir e intente nuevamente'
				this.toastrService.error(msg)
			}
		)
	}
	public onUploadError(args: any): void {
		this.toastrService.error('Ocurrio un error al cargar el archivo. Intenten nuevamente')
	}

 	public onUploadSuccess(args: any): void {
		//this.model.file_id = args[1].id
		const data = {
			file_id: args[1].id
		}
		this.ticketService.patch(this.model.id, data,2).subscribe(
				() => {
					this.toastrService.success('Se ha adjuntado el archivo')
					this.componentRef.directiveRef.reset()
					this.model.files.push(args[1])
				},
				error => {
					this.toastrService.error('Ocurrio un error al cargar el archivo. Intenten nuevamente')
				}
		)
	}
	
}
