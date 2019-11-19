import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../../shared/rest';
import { Festive } from '../models';
import { Observable } from 'rxjs';
@Injectable()
export class FestiveService extends Rest {
	
	constructor(http: HttpClient) { 
		super(http);
	}

	getAll():Observable<Festive[]> {
		return this.http.get<Festive[]>(this.url+'/festives');
	}

	getById(id: number) {
		return this.http.get(this.url+'/festives/' + id);
	}

	create(model: Festive) {
		return this.http.post<Festive>(this.url+'/festives', model);
	}

	update(model: Festive):Observable<Festive> {
		return this.http.put<Festive>(this.url+'/festives/' + model.id, model);
	}

	delete(id: number) {
		return this.http.delete(this.url+'/festives/' + id);
	}

}
