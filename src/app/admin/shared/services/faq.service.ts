import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../../shared/rest';
import { Faq } from '../models';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class FaqService extends Rest {
	
	constructor(http: HttpClient) { 
		super(http);
	}

	getAll():Observable<Faq[]> {
		return this.http.get<Faq[]>(this.url+'/faqs');
	}

	getById(id: number) {
		return this.http.get(this.url+'/faqs/' + id);
	}

	create(model: Faq) {
		return this.http.post<Faq>(this.url+'/faqs', model);
	}

	update(model: Faq):Observable<Faq> {
		return this.http.put<Faq>(this.url+'/faqs/' + model.id, model);
	}

	delete(id: number) {
		return this.http.delete(this.url+'/faqs/' + id);
	}

}

