import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../../shared/rest';
import { Calendar } from '../models';
import { Observable } from 'rxjs';
@Injectable()
export class CalendarService extends Rest {
	
	constructor(http: HttpClient) { 
		super(http);
	}

	getAll():Observable<Calendar[]> {
		return this.http.get<Calendar[]>(this.url+'/calendars');
	}

	getById(id: number) {
		return this.http.get(this.url+'/calendars/' + id);
	}
	
	create(model: Calendar) {
		return this.http.post<Calendar>(this.url+'/calendars', model);
	}

	update(model: Calendar):Observable<Calendar> {
		return this.http.put<Calendar>(this.url+'/calendars/' + model.id, model);
	}

	delete(id: number) {
		return this.http.delete(this.url+'/calendars/' + id);
	}
	associations() {
		return this.http.get(this.url+'/festives?type=list');
	}

}
