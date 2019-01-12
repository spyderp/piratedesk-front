import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Trophy } from '../shared/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { TrophyService } from '../shared/services/trophy.service';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.component.html',
})
export class TrophiesComponent implements OnInit {
	formBtnLabel:string;
	formTitle:string;
	isDataLoaded = false
	list=[];
	loading: boolean = false
	modalReference;
	model:Trophy = new Trophy();;
	rowsData: Trophy[]=[];
	selected = [];
	col = [
		{ name:'Descripcion', prop:'descripcion'},
		{ name:'Puntos', prop:'puntos'},
		{ name:'Creado', prop:'creado'},
		{ name:'Modificado', prop:'modificado'},
	];
	constructor(
		private toastyService:ToastrService, 
		private trophyService: TrophyService,
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
		this.trophyService.delete(id).subscribe();
		
	}
	onEdit(event, content){
		this.loadForm(false);
		this.model = this.rowsData .filter((client: Trophy) => client.id === event[0].id)[0];
		this.modalReference = this.modalService.open(content)
	}
	onLoadForm(event, content){
		this.loadForm();
		this.modalReference = this.modalService.open(content)
	}
	onSubmit() {
		this.loader.start('appLoader');
		if(this.model.id){
			 this.trophyService.update(this.model).subscribe(data => {
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
			 this.trophyService.create(this.model).subscribe(
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
		this.trophyService.getAll().subscribe(data => { this.rowsData = data });
		this.loading = false;
	}
	private loadForm(add:boolean=true){
		this.formTitle = (add)?'Crear Estado':'Editar Estado';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
		this.model = new Trophy();
	}

	public onUploadError(args: any): void {
   	 	
  	}

 	public onUploadSuccess(args: any): void {
    	this.model.file_id = args[1].id;
    	
  	}

}
