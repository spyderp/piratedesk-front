import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../../shared/rest';
import { Priority } from '../models';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PriorityService extends Rest {
	
	constructor(http: HttpClient) { 
		super(http);
	}

	getAll():Observable<Priority[]> {
		return this.http.get<Priority[]>(this.url+'/priorities');
	}

	getById(id: number) {
		return this.http.get(this.url+'/priorities/' + id);
	}

	getList(){
		return this.http.get(this.url+'/priorities?type=list');
	}

	create(model: Priority) {
		return this.http.post<Priority>(this.url+'/priorities', model);
	}

	update(model: Priority):Observable<Priority> {
		return this.http.put<Priority>(this.url+'/priorities/' + model.id, model);
	}

	delete(id: number) {
		return this.http.delete(this.url+'/priorities/' + id);
	}

}
