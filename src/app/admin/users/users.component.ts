import { Component, OnInit, ViewChild  } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import {NgProgress } from 'ngx-progressbar';
import { pirateAnimation } from '../../shared/pirate.animation';
@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.sass'],
	animations: [pirateAnimation],
})
export class UsersComponent implements OnInit {
	@ViewChild('selectedDepart') selectedDepart;
	private users: User[]=[];
	private model:User =  new User();
	private active:Array<any>=[];
	public mainActive = 'active';
	public formActive = 'inactive';
	private formTitle:string;
	private formBtnLabel:string;
	private value:any = {};
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
		private progressService: NgProgress 
	) { 
		this.toastyConfig.theme = 'bootstrap';
		this.toastyConfig.timeout = 5000;
		this.toastyConfig.position = 'top-right';
	}

	 public ngOnInit():any {
		this.progressService.start();
		this.loadAllUsers();
		 this.userService.associations().subscribe(data=>{
			this.selectedDepart.items =  data.departments;
			this.progressService.done();
		});
	}
	onDelete(event){
		console.log(event);
		let id = event[0].id;
		this.progressService.start();
		let index:number = this.users.map((element)=>{return element.id}).indexOf(id);
		delete this.users[index];
		this.userService.delete(id).subscribe();
		this.progressService.done();
	}
	onSubmit() {
		 if(this.model.departments.length!=0){
			 this.model.departments =  [{id:this.model.departments}];
		 }
		this.progressService.start();
		if(this.model.id){
			 this.userService.update(this.model).subscribe(data => {
				if(data.success){
					this.toastyService.success('Registro Actualizado');
					this.loadAllUsers();
					this.onCancel();
				}else{
		           		this.toastyService.error('El registro no se pudo actualizar corregir e intente nuevamente');
		        	}	
			},
			error => {
				this.toastyService.error(error);
			});
			this.progressService.done();
		 }else{
			 this.userService.create(this.model).subscribe(
			data => {
				if(data.success){
					this.toastyService.success('Nuevo registro creado con exito');
					this.users.push(data.user);
					this.onCancel();
				}else{
					this.toastyService.error('El registro no se pudo guardar corregir e intente nuevamente');
				}
				
			},
			error => {
				this.toastyService.error(error);
			});
			this.progressService.done();
		 }
	}
	onLoadForm(event){
		this.loadForm();
	}
	onEdit(ievent){
		this.loadForm(false);
		this.model = this.users.filter((user: User) => user.id ===  event[0].id)[0];
		this.active=[];
	}
	onCancel(){
		this.formActive = 'inactive';
		this.mainActive = 'active';
	}
	private loadAllUsers(){
		this.userService.getAll().subscribe(users => { this.users = users.users; });
	}
	private loadForm(add:boolean=true){
		this.formActive = 'active';
		this.mainActive = 'inactive';
		this.formTitle = (add)?'Crear usuario':'Editar usuario';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
		this.model = new User();
	}
	public selected(value:any):void {
		 this.model.departments.push({id:value.id});
		 console.log( this.model.departments);
	 }
 
	public removed(value:any):void {
		let index:number = this.model.departments.map((element)=>{return element.id}).indexOf(value.id);
		 delete this.model.departments[index];
		console.log('Removed value is: ', this.model.departments);
	}


}
