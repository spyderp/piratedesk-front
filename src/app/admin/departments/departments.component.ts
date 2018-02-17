import { Component, OnInit } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { DepartmentService } from '../shared/department.service';
import { Department } from '../shared/department.model';
import {NgProgress } from 'ngx-progressbar';
import { pirateAnimation } from '../../shared/pirate.animation';

@Component({
	selector: 'departments',
	templateUrl: './departments.component.html',
	styleUrls: ['./departments.component.sass'],
	providers:[DepartmentService],
	animations: [pirateAnimation],
})
export class DepartmentsComponent implements OnInit {
	private departments:Department[]=[];
	public formActive = 'inactive';
	private formBtnLabel:string;
	private formTitle:string;
	private list=[];
	public mainActive = 'active';
	private model:Department = new Department();
	privi =  localStorage.getItem('currentUser');
	selected = [];
	col = [
		{ name:'Descripción', prop:'descripcion'}
	];
	messages = {selectedMessage:false, emptyMessage: 'Sin datos'};
	constructor(
		private toastyService:ToastyService, 
		private toastyConfig: ToastyConfig,
		private departmentService: DepartmentService,
		private progressService: NgProgress 
	) { 
		this.toastyConfig.theme = 'bootstrap';
	this.toastyConfig.timeout = 5000;
	this.toastyConfig.position = 'top-right';
	}

	ngOnInit() {
		this.progressService.start();
		this.loadAll({ offset: 0 });
		this.loadList();
		this.progressService.done();
	}
	onCancel(){
		this.formActive = 'inactive';
		this.mainActive = 'active';
	}
	onDelete(event){
		console.log(event);
		let id = event[0].id;
		this.progressService.start();
		let index:number = this.departments.map((element)=>{return element.id}).indexOf(id);
		delete this.departments[index];
		this.departmentService.delete(id).subscribe();
		this.progressService.done();
	}
	onEdit(event){
		this.loadForm(false);
		this.model = this.departments.filter((department: Department) => department.id === event[0].id)[0];
	}
	onLoadForm(event){
		if(event){
			this.loadForm();
		}
	}
	onSubmit() {
		if(this.model.id){
			this.progressService.start();
			 this.departmentService.update(this.model).subscribe(data => {
				if(data.success){
					this.toastyService.success('Registro Actualizado');
					this.loadAll({ offset: 0 });
				//this.users.push(this.model);
					this.onCancel();
				}else{
		           		this.toastyService.error('El registro no se pudo actualizar corregir e intente nuevamente');
		        	}	
			},
			error => {
				this.toastyService.error(error);
				//this.loading = false;
			});
			 this.progressService.done();
		 }else{
		 	this.progressService.start();
			 this.departmentService.create(this.model).subscribe(
			data => {
				if(data.success){
					this.toastyService.success('Nuevo registro creado con exito');
					this.departments.push(data.department);
					this.onCancel();
				}else{
					this.toastyService.error('El registro no se pudo guardar corregir e intente nuevamente');
				}
			},
			error => {
				this.toastyService.error(error);
				//this.loading = false;
			});
			 this.progressService.done();
		 }
	}
	loadAll(pageInfo){
		this.departmentService.getAll().subscribe(departments => { this.departments = departments.departments; 	});
	}
	private loadList(){
		this.departmentService.getList().subscribe(departments => { this.list = departments.departments; });
	}
	private loadForm(add:boolean=true){
		this.formActive = 'active';
		this.mainActive = 'inactive';
		this.formTitle = (add)?'Crear departamento':'Editar departamento';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
		this.model = new Department();
	}

}
