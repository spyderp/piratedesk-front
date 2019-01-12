import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models';
import { UserService  } from '../shared/services/user.service'
import { ClientService  } from '../shared/services/client.service'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartLoaderService } from 'ngx-smart-loader';

@Component({
  selector: 'app-clientusers',
  templateUrl: './clientusers.component.html',
  styleUrls: ['./clientusers.component.sass']
})
export class ClientusersComponent implements OnInit {
	active:Array<any>=[];
	formBtnLabel:string;
	formTitle:string;
	loading: boolean = false
	modalReference;
	model:User =  new User();
	s = [];
	users:User[]=[];
	value:any = {};
  	items:any = []
	col = [
		{ name:'Usuario', prop:'username'},
		{ name:'Nombre', prop:'nombre'},
		{ name:'Apellido', prop:'apellido'},
		{ name:'Correo', prop:'email'},
		{ name:'Creado', prop:'creado'}
	];
  constructor(
  	private toastyService:ToastrService, 
		private userService: UserService,
		private clientService:ClientService,
		private modalService: NgbModal, 
		public loader: NgxSmartLoaderService
  ) { }

   public ngOnInit():any {
	 	this.loading = true;
		this.loadAllUsers();
	}
	onDelete(event){
		let id = event[0].id;
		let index:number = this.users.map((element)=>{return element.id}).indexOf(id);
		delete this.users[index];
		this.userService.delete(id).subscribe()
	}
	onSubmit() {
		this.loader.start('appLoader');
		/* if(this.model.clients.length!=0){
			 this.model.clients =  [{id:this.model.clients}];
		 }*/
		this.model.activo=true;
		this.model.rol_id=4;
		this.model.file_id=1;
		if(this.model.id){
			 this.userService.update(this.model).subscribe(data => {
				if(data){
					this.toastyService.success('Registro Actualizado');
					this.loadAllUsers();
					this.modalReference.close()
				}else{
		           		this.toastyService.error('El registro no se pudo actualizar corregir e intente nuevamente');
		        }
		        this.loader.stop('appLoader')	
			},
			error => {
				if(error.name=='HttpErrorResponse'){
					this.toastyService.error('Ocurrio un error y no se pudo guardar el registro');
				}else{
					this.toastyService.error('Ocurrio un error::'+error.message);
				}
				this.loader.stop('appLoader')	
			});
		 }else{
			 this.userService.create(this.model).subscribe(
			data => {
				if(data){
					this.toastyService.success('Nuevo registro creado con exito');
					this.users = this.users.concat(data);
					this.modalReference.close()
				}else{
					this.toastyService.error('El registro no se pudo guardar corregir e intente nuevamente');
				}
				this.loader.stop('appLoader')
				
			},
			error => {
				if(error.name=='HttpErrorResponse'){
					this.toastyService.error('Ocurrio un error y no se pudo guardar el registro');
				}else{
					this.toastyService.error('Ocurrio un error::'+error.message);
				}
				this.loader.stop('appLoader')	
			});
		 }
	}
	onLoadForm(event, content){
		this.loadForm();
		this.modalReference = this.modalService.open(content, {size:'lg'})
	}
	onEdit(event, content){
		this.loadForm(false);
		this.model = this.users.filter((user: User) => user.id ===  event[0].id)[0];
		this.active=[];
		this.modalReference = this.modalService.open(content, {size:'lg'})
	}
	private loadAllUsers(){
		this.userService.getAll(true).subscribe(data => { this.users = data;});
		this.clientService.getList().subscribe(data=>{
				this.items =  data;
		});
		this.loading = false;
		this.loader.stop('appLoader');
	}
	private loadForm(add:boolean=true){
		this.formTitle = (add)?'Crear usuario de cliente':'Editar usuario cliente';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
		this.model = new User();
	}

	public onUploadError(args: any): void {
   	 	
  	}

 	public onUploadSuccess(args: any): void {
    	this.model.file_id = args[1].id;
    	
  }

}
