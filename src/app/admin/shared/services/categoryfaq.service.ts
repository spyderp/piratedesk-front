import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../../shared/rest';
import { CategoryFaq } from '../models';
import { Observable } from 'rxjs';
@Injectable()
export class CategoryfaqService extends Rest {
	
	constructor(http: HttpClient) { 
		super(http);
	}

	getAll():Observable<CategoryFaq[]> {
		return this.http.get<CategoryFaq[]>(this.url+'/categories');
	}

	getById(id: number) {
		return this.http.get(this.url+'/categories/' + id);
	}

	create(model: CategoryFaq) {
		return this.http.post<CategoryFaq>(this.url+'/categories', model);
	}

	update(model: CategoryFaq):Observable<CategoryFaq> {
		return this.http.put<CategoryFaq>(this.url+'/categories/' + model.id, model);
	}

	delete(id: number) {
		return this.http.delete(this.url+'/categories/' + id);
	}

}

