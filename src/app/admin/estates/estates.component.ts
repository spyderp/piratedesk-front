import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Estate } from '../shared/models';
import { EstateService } from '../shared/services/estate.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
@Component({
	selector: 'app-estates',
	templateUrl: './estates.component.html',
})
export class EstatesComponent implements OnInit {
	formBtnLabel:string;
	formTitle:string;
	isDataLoaded = false
	list=[];
	loading: boolean = false
	modalReference;
	model:Estate = new Estate();;
	rowsData: Estate[]=[];
	selected = [];
	col = [
		{ name:'Descripcion', prop:'descripcion'},
	];
	constructor(
		private toastyService:ToastrService, 
		private estateService: EstateService,
		public loader: NgxSmartLoaderService,
		private modalService: NgbModal 
	) { 
	}

	ngOnInit() {
		this.loading = true;
		this.loadAll();
		this.loader.stop('appLoader')
		this.loading = false;
	}
	onDelete(event){
		const id = event[0].id;
		this.estateService.delete(id).subscribe(() =>{
			const index: number = this.rowsData.map((element) => { return element.id }).indexOf(id);
			delete this.rowsData[index];
		}, error => {
			this.toastyService.error('ocurrio un error')
		})
	}
	onEdit(event, content){
		this.loadForm(false);
		this.model = this.rowsData.filter((client: Estate) => client.id === event[0].id)[0];
		this.modalReference = this.modalService.open(content)
	}
	onLoadForm(event,content){
		this.loadForm();
		this.modalReference = this.modalService.open(content)
	}
	onSubmit() {
		this.loader.start('appLoader');
		if(this.model.id) {
			 this.estateService.update(this.model).subscribe(data => {
				if(data) {
					this.toastyService.success('Registro Actualizado');
					this.loadAll();
					//this.rowsData .push(this.model);
					this.modalReference.close()
				} else {
					this.toastyService.error('El registro no se pudo actualizar corregir e intente nuevamente');
				}
					this.loader.stop('appLoader')
			},
			error => {
				this.toastyService.error(error);
				//this.loading = false;
			});
		 } else {
			 this.estateService.create(this.model).subscribe(
				data => {
					if(data) {
						this.toastyService.success('Nuevo registro creado con exito')
						this.rowsData = this.rowsData .concat(data)
						this.modalReference.close()
					} else {
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
	private loadAll() {
		this.estateService.getAll().subscribe(data => { this.rowsData = data });
	}
	private loadForm(add: boolean = true) {
		this.formTitle = (add) ? 'Crear Estado' : 'Editar Estado'
		this.formBtnLabel = (add) ? 'Guardar' : 'Actualizar'
		this.model = new Estate()
	}

}
