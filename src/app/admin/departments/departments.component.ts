import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../shared/models';
import { DepartmentService } from '../shared/services/department.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
@Component({
	selector: 'departments',
	templateUrl: './departments.component.html',
})
export class DepartmentsComponent implements OnInit {
	closeResult: string;
	departments:Department[]=[];
	formBtnLabel:string;
	formTitle:string;
	list=[];
	loading: boolean = false
	modalReference;
	model:Department = new Department();
	privi =  localStorage.getItem('currentUser');
	selected = [];
	col = [
		{ name:'Descripción', prop:'descripcion'}
	];
	messages = {selectedMessage:false, emptyMessage: 'Sin datos'};
	constructor(
		private toastyService:ToastrService, 
		private departmentService: DepartmentService,
		public loader: NgxSmartLoaderService,
		private modalService: NgbModal 
	) { 
		
	
	
	}

	ngOnInit() {
		this.loading = true;
		this.loadAll({ offset: 0 });
		this.loadList();
		this.loader.stop('appLoader')
	}
	onDelete(event){
		const id = event[0].id;
		this.departmentService.delete(id).subscribe(() => {
			const index:number = this.departments.map((element) => element.id ).indexOf(id)
			delete this.departments[index]
		}, error => {
			this.toastyService.error('Ocurrio un error y no se pudo borrar el registro.')
		})
	}
	onEdit(event, content){
		this.loadForm(false);
		this.model = this.departments.filter((department: Department) => department.id === event[0].id)[0];
		this.modalReference = this.modalService.open(content)

	}
	onLoadForm(event, content){
		if(event){
			this.loadForm();
			this.modalReference = this.modalService.open(content)
		}
	}
	onSubmit() {
		this.loader.start('appLoader');
		if(this.model.id){
			
			 this.departmentService.update(this.model).subscribe(data => {
				if(data){
					this.toastyService.success('Registro Actualizado');
					this.loadAll({ offset: 0 });
				//this.users.push(this.model);
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
		 	
			 this.departmentService.create(this.model).subscribe(
			data => {
				if(data){
					this.toastyService.success('Nuevo registro creado con exito');
					this.departments= this.departments.concat(data);
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
	loadAll(pageInfo){
		this.departmentService.getAll().subscribe(data => { this.departments = data; 	});
		this.loading = false;
	}
	private loadList(){
		this.departmentService.getList().subscribe(data => { this.list = data; });
	}
	
	private loadForm(add:boolean=true){
		this.formTitle = (add)?'Crear departamento':'Editar departamento';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
		this.model = new Department();
	}

}
