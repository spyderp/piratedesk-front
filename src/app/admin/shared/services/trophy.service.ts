import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../../shared/rest';
import { Trophy } from '../models';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TrophyService  extends Rest {
	
	constructor(http: HttpClient) { 
		super(http);
	}

	getAll():Observable<Trophy[]> {
		return this.http.get<Trophy[]>(this.url+'/trophies');
	}

	getById(id: number) {
		return this.http.get(this.url+'/trophies/' + id);
	}

	create(model: Trophy) {
		return this.http.post<Trophy>(this.url+'/trophies', model);
	}

	update(model: Trophy):Observable<Trophy> {
		return this.http.put<Trophy>(this.url+'/trophies/' + model.id, model);
	}

	delete(id: number) {
		return this.http.delete(this.url+'/trophies/' + id);
	}

}
