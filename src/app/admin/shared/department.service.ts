import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Rest } from '../../shared/rest';
import { Department } from './department.model';
import 'rxjs/add/operator/map';
@Injectable()
export class DepartmentService extends Rest {
	constructor(http: Http) { 
		super(http);
	}

	getAll(page=0) {
		let pages:string='';
		if(page>0){
			page = page+1;
			pages = '?page='+page;
		}
		return this.http.get(this.url+'/departments'+pages).map((response: Response) => response.json());
	}

	getById(id: number) {
		return this.http.get(this.url+'/departments/' + id).map((response: Response) => response.json());
	}

	getList() {
		return this.http.get(this.url+'/departments/list_tree').map((response: Response) => response.json());
	}

	create(deparment: Department) {
		return this.http.post(this.url+'/departments', deparment).map((response: Response) => response.json());
	}

	update(deparment: Department) {
		return this.http.put(this.url+'/departments' + deparment.id, deparment).map((response: Response) => response.json());
	}

	delete(id: number) {
		return this.http.delete(this.url+'/departments/' + id).map((response: Response) => response.json());
	}

	

}
