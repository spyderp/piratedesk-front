import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Festive } from '../shared/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FestiveService } from '../shared/services/festive.service';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
@Component({
  selector: 'app-festives',
  templateUrl: './festives.component.html',
})
export class FestivesComponent implements OnInit {
	editing = {};
	isDataLoaded = false
	isDel = false;
	modalReference;
	selected = []
	temp = [];
	private formBtnLabel:string;
	private formTitle:string;
	private list=[];
	private model:Festive = new Festive();
	private modelf:any;
	private rowsData: Festive[]=[];
	constructor(
		private toastyService:ToastrService, 
		private festiveService: FestiveService,
		public loader: NgxSmartLoaderService,
		private modalService: NgbModal 
	) { 
		
	  	
	  	
	}

	ngOnInit() {
		this.loader.start('appLoader');
		this.loadAll();
		this.loader.stop('appLoader')
	}
	onDelete(){
		let msg = this.selected.length>1?'Esta seguro que desea Borrar los registros seleccionados':'Esta seguro que desea Borrar el registro seleccionado';
    	if(confirm(msg)){
    		this.selected.forEach(row=>{
				
				this.rowsData = this.rowsData.filter(item => item.id !== row.id);
				this.festiveService.delete(row.id).subscribe();
				
				this.toastyService.success('Registro borrado');
    		})
			
		}
	}
	onSelect({ selected }) {
	    if(selected.length>0){
	      this.isDel  = true;
	    }else if(selected.length==0){
	      this.isDel  = false;
	    }
	}
	onSubmit() {
		this.loader.start('appLoader');
		let fecha = this.modelf.year +'-'+this.modelf.month+'-'+this.modelf.day
		this.model.fecha = fecha;
		this.festiveService.create(this.model).subscribe(
			data => {
				if(data){
					this.toastyService.success('Nuevo registro creado con exito');
					this.rowsData = this.rowsData .concat(data);
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
	onUpdate(event, cell, rowIndex) {
		this.editing[rowIndex + '-' + cell] = false;
		this.rowsData[rowIndex][cell] = event.target.value;
		this.model = this.rowsData[rowIndex];
		//this.rowsData = [...this.rowsData];
		
		this.festiveService.update(this.model).subscribe(data => {
				if(data){
					this.toastyService.success('Registro Actualizado');
					this.loadAll();
					
				}else{
		           		this.toastyService.error('El registro no se pudo actualizar corregir e intente nuevamente');
		        	}
		        	
			},
			error => {
				this.toastyService.error(error);
		});
	}
	updateFilter(event) {
		const val = event.target.value.toLowerCase();

		// filter our data
		const temp = this.temp.filter(function(d) {
		  return d.descripcion.toLowerCase().indexOf(val) !== -1 || !val;
		});
		// update the rows
		this.rowsData = temp;
		// Whenever the filter changes, always go back to the first page
		//this.table.offset = 0;
	}
	private loadForm(content){
		this.model = new Festive();
		this.modalReference = this.modalService.open(content)
	}
	private loadAll(){
		this.festiveService.getAll().subscribe(data => { 
			this.temp = [...data];
			this.rowsData = data });
	}

}
