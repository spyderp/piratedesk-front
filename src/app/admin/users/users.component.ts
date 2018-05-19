import { Component, OnInit } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { User } from '../shared/models';
import { UserService  } from '../shared/user.service'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartLoaderService } from 'ngx-smart-loader';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.sass'],
})
export class UsersComponent implements OnInit {
	private items:any = []
	private users:User[]=[];
	private model:User =  new User();
	private active:Array<any>=[];
	private formTitle:string;
	private formBtnLabel:string;
	private value:any = {};
	modalReference;
	s = [];
	col = [
		{ name:'Usuario', prop:'username'},
		{ name:'Nombre', prop:'nombre'},
		{ name:'Apellido', prop:'apellido'},
		{ name:'Correo', prop:'email'},
		{ name:'Creado', prop:'creado'}
	];
	constructor(
		private toastyService:ToastyService, 
		private toastyConfig: ToastyConfig,
		private userService: UserService,
		private modalService: NgbModal, 
		public loader: NgxSmartLoaderService
	) { 
		this.toastyConfig.theme = 'bootstrap';
		this.toastyConfig.timeout = 5000;
		this.toastyConfig.position = 'top-right';
	}

	 public ngOnInit():any {
	 	this.loader.start('appLoader');
		this.loadAllUsers();
		this.userService.associations().subscribe(
			data=>{
				this.items =  data;
			}
		)
		this.loader.stop('appLoader')

	}
	onDelete(event){
		let id = event[0].id;
		let index:number = this.users.map((element)=>{return element.id}).indexOf(id);
		delete this.users[index];
		this.userService.delete(id).subscribe()
	}
	onSubmit() {
		this.loader.start('appLoader');
		 if(this.model.departments.length!=0){
			 this.model.departments =  [{id:this.model.departments}];
		 }
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
				this.toastyService.error(error);
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
				this.toastyService.error(error);
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
		this.userService.getAll().subscribe(data => { this.users = data;});
		
	}
	private loadForm(add:boolean=true){
		this.formTitle = (add)?'Crear usuario':'Editar usuario';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
		this.model = new User();
	}

	public onUploadError(args: any): void {
   	 	
  	}

 	public onUploadSuccess(args: any): void {
    	this.model.file_id = args[1].id;
    	
  	}
}
