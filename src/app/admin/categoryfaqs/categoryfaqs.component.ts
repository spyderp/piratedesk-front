import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryFaq } from '../shared/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CategoryfaqService } from '../shared/services/categoryfaq.service';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
@Component({
  selector: 'app-categoryfaqs',
  templateUrl: './categoryfaqs.component.html',
})
export class CategoryfaqsComponent implements OnInit {
	modalReference;
	private rowsData: CategoryFaq[]=[];
	private formBtnLabel:string;
	private formTitle:string;
	private model:CategoryFaq = new CategoryFaq();
	private list=[];
	isDataLoaded = false
	selected = [];
	col = [
		{ name:'Nombre', prop:'name'},
		{ name:'Descripcion', prop:'descripcion'},
	];
	constructor(
		private toastyService:ToastrService, 
		private  categoryFaqService: CategoryfaqService,
		public loader: NgxSmartLoaderService,
		private modalService: NgbModal 
	) { 
	}

	ngOnInit() {
		this.loader.start('appLoader');
		this.loadAll();
		this.loader.stop('appLoader');
	}
	onDelete(event){
		let id = event[0].id;
		
		let index:number = this.rowsData .map((element)=>{return element.id}).indexOf(id);
		delete this.rowsData [index];
		this.categoryFaqService.delete(id).subscribe();
		
	}
	onEdit(event,content){
		this.loadForm(false);
		this.model = this.rowsData .filter((client: CategoryFaq) => client.id === event[0].id)[0];
		this.modalReference = this.modalService.open(content, {size:'lg'})
	}
	onLoadForm(event,content){
		this.loadForm();
		this.modalReference = this.modalService.open(content, {size:'lg'})
	}
	onSubmit() {
		this.loader.start('appLoader');
		if(this.model.id){
			 this.categoryFaqService.update(this.model).subscribe(data => {
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
			 this.categoryFaqService.create(this.model).subscribe(
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
		this.categoryFaqService.getAll().subscribe(data => { this.rowsData = data });
	}
	private loadForm(add:boolean=true){
		this.formTitle = (add)?'Crear Estado':'Editar Estado';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
		this.model = new CategoryFaq();
	}


}
