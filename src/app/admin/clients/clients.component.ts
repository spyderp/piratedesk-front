
import { Component, OnInit } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { Client } from '../shared/models';
import { ClientService } from '../shared/services/client.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
	modalReference;
	private clients: Client[]=[];
	private formBtnLabel:string;
	private formTitle:string;
	private model:Client = new Client();;
	private list=[];
	isDataLoaded = false
	selected = [];
	col = [
		{ name:'Nombre', prop:'nombre'},
		{ name:'Dirección', prop:'direccion'},
		{ name:'Teléfono', prop:'telefono'},
		{ name:'Célular', prop:'celular'},
		{ name:'Correo', prop:'email'},
		{ name:'Calendario', prop:'calendars.descripcion'}
	];
	constructor(
		private toastyService:ToastyService, 
		private toastyConfig: ToastyConfig,
		private clientService: ClientService,
		public loader: NgxSmartLoaderService,
		private modalService: NgbModal 
	) { 
		this.toastyConfig.theme = 'bootstrap';
	  	this.toastyConfig.timeout = 5000;
	  	this.toastyConfig.position = 'top-right';
	}

	ngOnInit() {
		this.loader.start('appLoader');
		this.loadAll();
		this.loader.stop('appLoader')
	}
	onDelete(event){
		let id = event[0].id;
		
		let index:number = this.clients.map((element)=>{return element.id}).indexOf(id);
		delete this.clients[index];
		this.clientService.delete(id).subscribe();
		
	}
	onEdit(event, content){
		this.loadForm(false);
		this.model = this.clients.filter((client: Client) => client.id === event[0].id)[0];
		this.modalReference = this.modalService.open(content)
	}
	onLoadForm(event, content){
		this.loadForm();
		this.modalReference = this.modalService.open(content)
	}
	onSubmit() {
		this.loader.start('appLoader');
		if(this.model.id){
			 this.clientService.update(this.model).subscribe(data => {
				if(data){
					this.toastyService.success('Registro Actualizado');
					this.loadAll();
					this.modalReference.close()
					//this.clients.push(this.model);
				}else{
		           		this.toastyService.error('El registro no se pudo actualizar corregir e intente nuevamente');
		        	}
		        	this.loader.stop('appLoader')	
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
						this.modalReference.close()
					}else{
						this.toastyService.error('El registro no se pudo guardar corregir e intente nuevamente');
					}
					this.loader.stop('appLoader')
				},
				error => {
					this.toastyService.error(error);
					//this.loading = false;
			});
		 }
		 
	}
	private loadAll(){
		this.clientService.getAll().subscribe(data => { this.clients = data; });
		this.clientService.getAssoc().subscribe(data => { this.list = data; });
	}
	private loadForm(add:boolean=true){
		this.formTitle = (add)?'Crear departamento':'Editar departamento';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
		this.model = new Client();
	}
}
