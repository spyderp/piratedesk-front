import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../../shared/rest';
import { Estate } from '../models';
import { Observable } from 'rxjs';
@Injectable()
export class EstateService extends Rest {
	
	constructor(http: HttpClient) { 
		super(http);
	}

	getAll(): Observable<Estate[]> {
		return this.http.get<Estate[]>(this.url + '/states');
	}

	getById(id: number) {
		return this.http.get(this.url + '/states/' + id);
	}

	create(model: any) {
		return this.http.post<Estate>(this.url + '/states', model);
	}

	update(model: Estate):Observable<Estate> {
		return this.http.put<Estate>(this.url + '/states/' + model.id, model);
	}

	delete(id: number) {
		return this.http.delete(this.url + '/states/' + id);
	}

}
