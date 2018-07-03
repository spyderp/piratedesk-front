import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Calendar } from '../shared/models';
import { CalendarService } from '../shared/services/calendar.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
@Component({
  selector: 'app-calendars',
  templateUrl: './calendars.component.html',
})
export class CalendarsComponent implements OnInit {
	closeResult: string;
	modalReference;
	private items:any = [];
	private rowsData: Calendar[]=[];
	private formBtnLabel:string;
	private formTitle:string;
	private daysWeek = []
	private model:Calendar = new Calendar();;
	private list=[];
	invento = [1]
	isDataLoaded = false
	selected = [];
	entrada;
	salida;
	col = [
		{ name:'Descripcion', prop:'descripcion'},
		{ name:'D. Semana', prop:'dias'},
		{ name:'Entrada', prop:'hora_inicio'},
		{ name:'Salida', prop:'hora_final'},
		{ name:'24/7', prop:'fulltime'},
	];
	constructor(
		private toastyService:ToastrService, 
		private calendarService: CalendarService,
		public loader: NgxSmartLoaderService,
		private modalService: NgbModal 
	) { 
	}

	ngOnInit() {
		this.loader.start('appLoader');
		this.loadAll();
		this.calendarService.associations().subscribe(data => { this.items =  data; });
		this.loader.stop('appLoader')
	}
	onChecked(value:string, data:string){
		if(data){
			return data.indexOf(value)!=-1?true:false;	
		}else{
			return false;
		}
		
	}
	onDelete(event){
		let id = event[0].id;
		
		let index:number = this.rowsData .map((element)=>{return element.id}).indexOf(id);
		delete this.rowsData [index];
		this.calendarService.delete(id).subscribe();
		
	}
	onEdit(event,content){
		this.loadForm(false);
		this.modalReference = this.modalService.open(content, { size: 'lg' })
		this.model = this.rowsData.filter((client: Calendar) => client.id === event[0].id)[0];
		let data:any = []
		this.model.festives.forEach(function (value) {
		  data.push(value.id);
		}); 
		this.model.festives = data;
		let hora = this.model.hora_inicio.split(':');
		this.entrada = {
			hour:hora[0],
			minute:hora[1]
		}
		hora = this.model.hora_final.split(':');
		this.salida = {
			hour:hora[0],
			minute:hora[1]
		}
		//this.daysWeek = this.model.dias.split(',')
	}
	onLoadForm(event,content){
		this.loadForm();
		this.modalReference = this.modalService.open(content,  { size: 'lg' })
	}
	onSubmit() {
		this.loader.start('appLoader');
		this.model.hora_inicio = this.entrada.hour+':'+ this.entrada.minute;
		this.model.hora_final = this.salida.hour+':'+ this.salida.minute;
		this.model.dias = this.daysWeek.join();
		if(this.model.id){
			 this.calendarService.update(this.model).subscribe(data => {
				if(data){
					this.toastyService.success('Registro Actualizado');
					this.loadAll();
					this.modalReference.close()
					//this.rowsData .push(this.model);
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
			 this.calendarService.create(this.model).subscribe(
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
		 
	}
	onDay(e){
		if(!this.daysWeek.find(d=>d==e)){
			this.daysWeek.push(e)	
		}else{
			this.daysWeek.splice(this.daysWeek.indexOf(e), 1).sort();
		}
	}

	private loadAll(){
		this.calendarService.getAll().subscribe(data => { this.rowsData = data });
		
	}
	private loadForm(add:boolean=true){
		this.formTitle = (add)?'Crear Calendario':'Editar Calendario';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
		this.model = new Calendar();
		this.daysWeek = []
	}

}
