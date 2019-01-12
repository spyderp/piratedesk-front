import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Template } from '../shared/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { TemplateService } from '../shared/services/template.service';
import { NgxSmartLoaderService } from 'ngx-smart-loader';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
})
export class TemplatesComponent implements OnInit {
private rowsData: Template[]=[];
	formBtnLabel:string;
	formTitle:string;
	isDataLoaded = false
	list=[];
	loading: boolean = false
	modalReference;
	model:Template = new Template();;
	selected = [];
	col = [
		{ name:'Descripcion', prop:'descripcion'},
		{ name:'Creado', prop:'creado'},
		{ name:'Modificado', prop:'modificado'},
	];
	constructor(
		private toastyService:ToastrService, 
		private templateService: TemplateService,
		public loader: NgxSmartLoaderService,
		private modalService: NgbModal 
	) { 
		
	  	
	  	
	}

	ngOnInit() {
		this.loading = true;
		this.loadAll();
		this.loader.stop('appLoader')
	}
	onDelete(event){
		let id = event[0].id;
		
		let index:number = this.rowsData .map((element)=>{return element.id}).indexOf(id);
		delete this.rowsData [index];
		this.templateService.delete(id).subscribe();
		
	}
	onEdit(event,content){
		this.loadForm(false);
		this.model = this.rowsData .filter((client: Template) => client.id === event[0].id)[0];
		this.modalReference = this.modalService.open(content, {size:'lg'})
	}
	onLoadForm(event,content){
		this.loadForm();
		this.modalReference = this.modalService.open(content, {size:'lg'})
	}
	onSubmit() {
		this.loader.start('appLoader');
		if(this.model.id){
			 this.templateService.update(this.model).subscribe(data => {
				if(data){
					this.toastyService.success('Registro Actualizado');
					this.loadAll();
					//this.rowsData .push(this.model);
					this.modalReference.close()
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
			 this.templateService.create(this.model).subscribe(
				data => {
					if(data){
						this.toastyService.success('Nuevo registro creado con exito');
						this.rowsData = this.rowsData .concat(data);
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
		this.templateService.getAll().subscribe(data => { this.rowsData = data });
		this.loading = false;
	}
	private loadForm(add:boolean=true){
		this.formTitle = (add)?'Crear Estado':'Editar Estado';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
		this.model = new Template();
	}


}
