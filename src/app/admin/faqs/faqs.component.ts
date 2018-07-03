import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Faq } from '../shared/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FaqService } from '../shared/services/faq.service';
import { CategoryfaqService } from '../shared/services/categoryfaq.service';
import { NgxSmartLoaderService } from 'ngx-smart-loader';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
})
export class FaqsComponent implements OnInit {
	modalReference;
	private rowsData: Faq[]=[];
	private formBtnLabel:string;
	private formTitle:string;
	private model:Faq = new Faq();
	private list=[];
	private category:any[] = []
	isDataLoaded = false
	selected = [];
	col = [
		{ name:'Titulo', prop:'title'},
		{ name:'orden', prop:'orden'},
		{ name:'Creado', prop:'creado'},
		{ name:'Modificado', prop:'modificado'},
	];
	constructor(
		private toastyService:ToastrService, 
		private faqService: FaqService,
		private categoryService: CategoryfaqService,
		public loader: NgxSmartLoaderService,
		private modalService: NgbModal 
	) { 
		
	  	
	  	
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
		this.faqService.delete(id).subscribe();
		
	}
	onEdit(event,content){
		this.loadForm(false);
		this.model = this.rowsData .filter((client: Faq) => client.id === event[0].id)[0];
		this.modalReference = this.modalService.open(content, {size:'lg'})
	}
	onLoadForm(event,content){
		this.loadForm();
		this.modalReference = this.modalService.open(content, {size:'lg'})
	}
	onSubmit() {
		this.loader.start('appLoader');
		if(this.model.id){
			 this.faqService.update(this.model).subscribe(data => {
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
			 this.faqService.create(this.model).subscribe(
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
		this.faqService.getAll().subscribe(data => { this.rowsData = data });
		this.categoryService.getAll().subscribe(data => { this.category = data });
	}
	private loadForm(add:boolean=true){
		this.formTitle = (add)?'Crear Estado':'Editar Estado';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
		this.model = new Faq();
	}

}
