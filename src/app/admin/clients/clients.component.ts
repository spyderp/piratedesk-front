
import { Component, OnInit } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { Client } from '../shared/client.model';
import { NgProgress } from 'ngx-progressbar';
import { pirateAnimation } from '../../shared/pirate.animation';
import { ClientService } from '../shared/client.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass'],
  animations: [pirateAnimation],
})
export class ClientsComponent implements OnInit {
	private clients: Client[]=[];
	private formBtnLabel:string;
	private formTitle:string;
	public mainActive = 'active';
	public formActive = 'inactive';
	private model:Client = new Client();;
	private list=[];
	isDataLoaded = false
	selected = [];
	col = [
		{ name:'Nombre', prop:'nombre'},
		{ name:'Dirección', prop:'direccion'},
		{ name:'Teléfono', prop:'telefono'},
		{ name:'Célular', prop:'celular'},
		{ name:'Correo', prop:'email'}
	];
	constructor(
		private toastyService:ToastyService, 
		private toastyConfig: ToastyConfig,
		private clientService: ClientService,
		private progressService: NgProgress 
	) { 
		this.toastyConfig.theme = 'bootstrap';
	  	this.toastyConfig.timeout = 5000;
	  	this.toastyConfig.position = 'top-right';
	}

	ngOnInit() {
		this.progressService.start();
		this.loadAll();
		this.progressService.done();
	}
	onCancel(){
		this.formActive = 'inactive';
		this.mainActive = 'active';
	}
	onDelete(event){
		console.log(event);
		let id = event[0].id;
		this.progressService.start();
		let index:number = this.clients.map((element)=>{return element.id}).indexOf(id);
		delete this.clients[index];
		this.clientService.delete(id).subscribe();
		this.progressService.done();
	}
	onEdit(event){
		this.loadForm(false);
		this.model = this.clients.filter((client: Client) => client.id === event[0].id)[0];
	}
	onLoadForm(){
		this.loadForm();
	}
	onSubmit() {
		this.progressService.start();
		if(this.model.id){
			 this.clientService.update(this.model).subscribe(data => {
				if(data){
					this.toastyService.success('Registro Actualizado');
					this.loadAll();
					//this.clients.push(this.model);
					this.onCancel();
				}else{
		           		this.toastyService.error('El registro no se pudo actualizar corregir e intente nuevamente');
		        	}	
			},
			error => {
				this.toastyService.error(error);
				//this.loading = false;
			});
		 }else{
			 this.clientService.create(this.model).subscribe(
				data => {
					if(data){
						this.toastyService.success('Nuevo registro creado con exito');
						this.clients= this.clients.concat(data);

						this.onCancel();
					}else{
						this.toastyService.error('El registro no se pudo guardar corregir e intente nuevamente');
					}
				},
				error => {
					this.toastyService.error(error);
					//this.loading = false;
			});
		 }
		 this.progressService.done();
	}
	private loadAll(){
		this.clientService.getAll().subscribe(data => { this.clients = data; });
		this.clientService.getAssoc().subscribe(data => { this.list = data; });
	}
	private loadForm(add:boolean=true){
		this.formActive = 'active';
		this.mainActive = 'inactive';
		this.formTitle = (add)?'Crear departamento':'Editar departamento';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
		this.model = new Client();
	}

}
