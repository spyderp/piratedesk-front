import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Ticket } from '../shared/models'
import { TicketService } from  '../shared/services/ticket.service'
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from '../../admin/shared/services/department.service'
import { ClientService } from '../../admin/shared/services/client.service'
import { PriorityService } from '../../admin/shared/services/priority.service'
import { EstateService } from '../../admin/shared/services/estate.service'
import { NgxSmartLoaderService } from 'ngx-smart-loader';
import { DropzoneConfigInterface, DropzoneComponent } from 'ngx-dropzone-wrapper';
import { environment} from '../../../environments/environment';
@Component({
	selector: 'edit-ticket',
	templateUrl: './edit-ticket.component.html',
	styleUrls: ['./edit-ticket.component.sass']
})

export class EditTicketComponent implements OnInit {
	config:DropzoneConfigInterface={
		url: environment.apiServer+'/files',
  	maxFilesize: 2,
  	acceptedFiles: 'image/*,application/pdf'
	}
	static SUPERVISOR = 3
	path:String = environment.apiServer+'/files'
	assigment:boolean = false
	changeState:number
	client:any[];
	dDescription:string;
	del:boolean = false
	department:any[];
	eDescription:string;
	edit:boolean = false
	formEdit:Boolean = false
	model:Ticket = new Ticket();
	pDescription:string;
	prioritiesId:number;
	priority:any = []
	states:any[];
	tempContent:string = '';
	ticketId:string;
	private __currentUser:any;
	@ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
	constructor(
		private clientService:ClientService,
		private departmentService:DepartmentService,
		private estateService:EstateService,
		private loader:NgxSmartLoaderService,
		private priorityService:PriorityService,
		private route: ActivatedRoute,
		private ticketService:TicketService,
		private toastrService:ToastrService,
  		private router: Router
	) { }

	ngOnInit() {
		this.loader.start('appLoader')
		this.ticketId = this.route.snapshot.paramMap.get('id')
		this._loadAll(this.ticketId)	
	}

	onAssign(){
		//Se valida que el usuario no sea supervisor
		if(this.__currentUser.rol_id != EditTicketComponent.SUPERVISOR){
			let data = {
				user_id: this.__currentUser.id,
				edit: true,
				state_id:2
			}
			this.ticketService.patch(this.model.id, data).subscribe(
				data => {
					this.toastrService.success('Se ha asignado a este caso');	
					this.changeState = 2;
					this.model.state_id = 2;
				},
				error => {
					this.toastrService.error('Ocurrio un error y no se pudo guardar, corregir e intente nuevamente');
				}
			);
			this.assigment = true;
			//TODO: cuando un supervisor se asigna
			//this.del = e.supervisor
			this.edit = true
			
		}else{

		}
	}
	onCancelEdit(){
		this.model.content = this.tempContent
		this.formEdit = false;
	}
	onDelete(){
		if(confirm('Desea borrar el #caso #'+this.model.id+"? Si prosigue no se podra recuperar nuevamente")){

		}
	}
	onEdit(){
		this.formEdit = true;
		this.tempContent = this.model.content
	}
	onState(stateId:number, event){
		if(stateId != 4 || confirm('Esta seguro que desea finalizar el caso')){
			let data = {
				state_id:stateId
			}
			this.ticketService.patch(this.model.id, data,1).subscribe(
				data => {
					this.toastrService.success('Se ha cambiado el estado con exito');	
					this.changeState = stateId
				},
				error => {
					this.toastrService.error('Ocurrio un error y no se pudo guardar, corregir e intente nuevamente');
				}
			);
		}else{
			event.target.value = this.changeState
		}
	}
	onSubmit(){
		this.loader.start('appLoader')
		this.ticketService.update(this.model).subscribe(
			data=>{
				this.toastrService.success('Se ha actualido el caso')
				this.eDescription = data.states.descripcion
				this.dDescription = data.departments.descripcion
				this.pDescription = data.priorities.descripcion
				this.prioritiesId = data.priorities.id
				this.model.keys   = data.keys 
				this.loader.stop('appLoader')
				this.formEdit = false;
			},
			error=>{
				this.toastrService.error('Ocurrio un error y no se pudo actualizar  el caso, corregir e intente nuevamente.')
				this.loader.stop('appLoader')
			}
		);
	}
	private _loadAll(id){
		this.departmentService.getList().subscribe(data=>{this.department=data})
		this.clientService.getAll().subscribe(data=>{this.client=data})
		this.priorityService.getList().subscribe(data=>{this.priority=data})
		this.estateService.getAll().subscribe(data=>{this.states=data})
		this.ticketService.getById(id).subscribe(data=>{
			this.model=data
			this.eDescription = data.states.descripcion
			this.dDescription = data.departments.descripcion
			this.pDescription = data.priorities.descripcion
			this.prioritiesId = data.priorities.id
			this._assigment(data)
		})
		this.__currentUser = JSON.parse(localStorage.getItem('current.user'))
		
		this.loader.stop('appLoader')
	}
	private _assigment(model:Ticket){
		if(model.assigments && model.assigments.length>0){
			model.assigments.map((e)=>{
				if(e.user_id==this.__currentUser.id){
					this.assigment = true;
					this.del = e.supervisor
					this.edit = e.edit
					this.changeState = model.state_id
				}
			})
		}
	}
	public onUploadError(args: any): void {
   	 	this.toastrService.error('Ocurrio un error al cargar el archivo. Intenten nuevamente')
  }

 	public onUploadSuccess(args: any): void {
    	//this.model.file_id = args[1].id;
    let data = {
			file_id:args[1].id
		}	
		this.ticketService.patch(this.model.id, data,2).subscribe(
				data => {
					this.toastrService.success('Se ha adjuntado el archivo');	
					this.componentRef.directiveRef.reset();
					this.model.files.push(args[1])
				},
				error => {
					this.toastrService.error('Ocurrio un error al cargar el archivo. Intenten nuevamente');
				}
		);
  }
}
