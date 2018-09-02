import { Component, OnInit } from '@angular/core';
import {DepartmentService } from '../admin/shared/services/department.service'
import {KnowledgeService } from './shared/knowledge.service'
import { Knowledge } from './shared/models'
import { ToastrService } from 'ngx-toastr';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-knowledges',
  templateUrl: './knowledges.component.html',
  styleUrls: ['./knowledges.component.sass']
})
export class KnowledgesComponent implements OnInit {
  modalReference;
  deparmentName:string ='';
  searchOption:Boolean = false;
	private formTitle:string;
  private deparmentList:any[]=[]
  private formBtnLabel:string;
  private model:Knowledge;
  private rowsData:Knowledge[] = []
  private showCategory:boolean = true;
  private showSearch:boolean = true;
  popular:any;
  access:any;
  update:any;
  create:any;
  temp:any[] = [];
  constructor(
  	private departmentService:DepartmentService,
  	private knowledgeService:KnowledgeService,
  	private toastrService:ToastrService,
  	public loader: NgxSmartLoaderService,
		private modalService: NgbModal 
  	) { }

  ngOnInit() {
  	this.loader.start('appLoader');
  	this.loadAll()
  }
  onCategorySearch(id:number){
  	const val = id;
  	this.showCategory = false
    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.department_id == id;
    });
    // update the rows
    this.rowsData = temp;
  }
  onClose(){
  	this.showSearch = true;
  }
  onDelete(event){
		let id = event[0].id;
		
		let index:number = this.rowsData .map((element)=>{return element.id}).indexOf(id);
		delete this.rowsData [index];
		this.knowledgeService.delete(id).subscribe();
		
	}
	onEdit(content){
		this.loadForm(false);
		this.modalReference = this.modalService.open(content, {size:'lg'})
	}
  onLoadForm(content){
		this.loadForm();
		this.model = new Knowledge();
		this.modalReference = this.modalService.open(content, {size:'lg'})
	}
  onPopular(id){
  	let result:any = this.getKnow(id);
  	let count = result[0].rating+1;
  	this.knowledgeService.patch(id,{rating:count}).subscribe(
  		data=>{
  			this.toastrService.success('actualizado');
  		},
  		error => {
			this.toastrService.error('Ocurrio un error y no se pudo guardar, corregir e intente nuevamente');
		}
  	)
  }
  onSearch(event:any){
  	const val = event.target.value.toLowerCase();
    let temp:any;
  	if (val==''){
  		this.showCategory = true
  	}else{
  		this.showCategory = false
  	}

    // filter our data
    if(!this.searchOption){
    	temp = this.temp.filter(function(d) {
      	return d.title.toLowerCase().indexOf(val) !== -1 || !val;
   		});
    }else{
    	temp = this.temp.filter(function(d) {
      	return d.keys.toLowerCase().indexOf(val) !== -1 || !val;
   		});
    }
    // update the rows
    this.rowsData = temp;
  }
  onSubmit(){
  	if(this.model.id){
			 this.knowledgeService.update(this.model).subscribe(data => {
				if(data){
					this.toastrService.success('Registro Actualizado');
					this.loadAll();
					//this.rowsData .push(this.model);
					this.modalReference.close()
				}else{
		    	this.toastrService.error('El registro no se pudo actualizar corregir e intente nuevamente');
		    }	
		    this.loader.stop('appLoader')
			},
			error => {
				this.toastrService.error(error);
				//this.loading = false;
			});
		 }else{
			 this.knowledgeService.create(this.model).subscribe(
				data => {
					if(data){
						this.toastrService.success('Nuevo registro creado con exito');
						this.temp = this.temp.concat(data);
						this.modalReference.close()
					}else{
						this.toastrService.error('El registro no se pudo guardar corregir e intente nuevamente');
					}
					this.loader.stop('appLoader')
				},
				error => {
					this.toastrService.error(error);
					//this.loading = false;
			});
		 }
  }

  onView(id){
  	this.model = this.getKnow(id);
  	this.deparmentName = this.deparmentList.filter(d=>{return d.id==this.model.department_id})[0].text
  	let count = this.model.access+1;
  	this.knowledgeService.patch(id,{access:count}).subscribe();
  	this.showSearch = false;
  }
  private getKnow(id){
  	return this.rowsData.filter(data => data.id == id)[0];
  }

  private loadAll(){
  	this.departmentService.getList().subscribe(data=>{this.deparmentList=data})
  	this.knowledgeService.getAll().subscribe(data=>{
  		this.rowsData = data;
  		this.temp = [...data];
  		this.popular = [...data.sort((a,b)=>{return b.rating-a.rating})]
  		this.access = [...data.sort((a,b)=>{return b.access-a.access})]
  		this.update = [...data.sort((a,b)=>{return +new Date(a.modificado)- +new Date(b.modificado)})]
  		this.create = [...data.sort((a,b)=>{return +new Date(a.creado)- +new Date(b.creado)})]
  		this.loader.stop('appLoader')
  	})
  }
  private loadForm(add:boolean=true){
		this.formTitle = (add)?'Crear B.D. del conocimiento':'Editar B.D. del conocimiento';
		this.formBtnLabel = (add)?'Guardar':'Actualizar';
	}
}
