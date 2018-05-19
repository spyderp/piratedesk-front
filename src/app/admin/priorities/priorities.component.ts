import { Component, OnInit } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { Priority } from '../shared/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PriorityService } from '../shared/services/priority.service';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
@Component({
  selector: 'app-priorities',
  templateUrl: './priorities.component.html',
  styleUrls: ['./priorities.component.sass'],
})
export class PrioritiesComponent implements OnInit {
	private rowsData: Priority[]=[];
	private formBtnLabel:string;
	private formTitle:string;
	private model:Priority = new Priority();;
	private list=[];
	modalReference;
	isDataLoaded = false
	selected = [];
	col = [
		{ name:'Descripcion', prop:'descripcion'},
		{ name:'T. Respuesta', prop:'respuesta'},
		{ name:'T. Resuelto', prop:'resuelto'},
		{ name:'Escalable', prop:'escalable'},
	];
	constructor(
		private toastyService:ToastyService, 
		private toastyConfig: ToastyConfig,
		private priorityService: PriorityService,
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
		
		let index:number = this.rowsData .map((element)=>{return element.id}).indexOf(id);
		delete this.rowsData [index];
		this.priorityService.delete(id).subscribe();
		
	}
	onEdit(event, content){
		this.loadForm(false);
		this.model = this.rowsData .filter((client: Priority) => client.id === event[0].id)[0];
		this.modalReference = this.modalService.open(content)
	}
	onLoadForm(event,content){
		this.loadForm();
		this.modalReference = this.modalService.open(content)
	}
	onSubmit() {
		this.loader.start('appLoader');
		if(this.model.id){
			 this.priorityService.update(this.model).subscribe(data => {
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
			 this.priorityService.create(this.model).subscribe(
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
		this.priorityService.getAll().subscribe(data => { this.rowsData = data });
	}
	private loadForm(add:boolean=true){
		this.formTitle = (add)?'Crear Estado':'Editar Estado';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
		this.model = new Priority();
	}


}
