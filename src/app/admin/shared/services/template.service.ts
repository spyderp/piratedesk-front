import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../../shared/rest';
import { Template } from '../models';
import { Observable } from 'rxjs';
@Injectable()
export class TemplateService  extends Rest {
	
	constructor(http: HttpClient) { 
		super(http);
	}

	getAll():Observable<Template[]> {
		return this.http.get<Template[]>(this.url+'/templates');
	}

	getById(id: number) {
		return this.http.get(this.url+'/templates/' + id);
	}

	create(model: any) {
		return this.http.post<Template>(this.url+'/templates', model);
	}

	update(model: Template):Observable<Template> {
		return this.http.put<Template>(this.url+'/templates/' + model.id, model);
	}

	delete(id: number) {
		return this.http.delete(this.url+'/templates/' + id);
	}

}
