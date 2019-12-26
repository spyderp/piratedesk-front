
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../shared/models';
import { ClientService } from '../shared/services/client.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
	clients: Client[]=[];
	formBtnLabel:string;
	formTitle:string;
	isDataLoaded = false
	list=[];
	loading: boolean = false
	modalReference;
	model:Client = new Client();;
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
		private toastyService:ToastrService, 
		private clientService: ClientService,
		public loader: NgxSmartLoaderService,
		private modalService: NgbModal 
	) { }

	ngOnInit() {
		this.loading = true;
		this.loadAll();
		this.loader.stop('appLoader')
	}

	onDelete(event) {
		const id = event[0].id
		this.formTitle = 'hola'
		this.clientService.delete(id).subscribe( response => {
			const index: number = this.clients.map((element) => element.id).indexOf(id)
			delete this.clients[index]
		},
		error => {
			this.toastyService.error('Ocurrio un error y no se pudo borrar el registro.')
		});
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
		if(this.model.id) {
			 this.clientService.update(this.model).subscribe(data => {
				if(data) {
					this.toastyService.success('Registro Actualizado');
					this.loadAll();
					this.modalReference.close()
				} else {
							 		this.toastyService.error('El registro no se pudo actualizar corregir e intente nuevamente');
							}
							this.loader.stop('appLoader')
			},
			error => {
				this.toastyService.error(error);
			});
		 } else {
			 this.clientService.create(this.model).subscribe(
				data => {
					if(data) {
						this.toastyService.success('Nuevo registro creado con exito');
						this.clients= this.clients.concat(data);
						this.modalReference.close()
					} else {
						this.toastyService.error('El registro no se pudo guardar corregir e intente nuevamente');
					}
					this.loader.stop('appLoader')
				},
				error => {
					this.toastyService.error(error);
			});
		 }
	}

	private loadAll() {
		this.clientService.getAll().subscribe(data => { this.clients = data; });
		this.loading = false;
	}

	private loadForm(add: boolean = true) {
		this.formTitle = (add) ? 'Crear departamento' : 'Editar departamento';
		this.formBtnLabel = (add)? 'Guardar' : 'Actualizar';
		this.model = new Client();
	}
}
