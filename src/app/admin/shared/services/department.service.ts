import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../../shared/rest';
import { Department } from '../models';
import { Observable } from 'rxjs';
@Injectable()
export class DepartmentService extends Rest {
	constructor(http: HttpClient) { 
		super(http);
	}

	getAll(page = 0):Observable<Department[]> {
		let pages: string = ''
		if( page > 0 ) {
			page++
			pages = '?page=' + page
		}
		return this.http.get<Department[]>(this.url + '/departments' + pages);
	}

	getById(id: number) {
		return this.http.get(this.url + '/departments/' + id);
	}

	getList() {
		return this.http.get<any[]>(this.url + '/departments?type=list');
	}

	create(deparment: any):Observable<Department> {
		return this.http.post<Department>(this.url + '/departments', deparment);
	}

	update(deparment: Department):Observable<Department> {
		return this.http.put<Department>(this.url + '/departments/' + deparment.id, deparment);
	}

	delete(id: number) {
		return this.http.delete(this.url + '/departments/' + id);
	}

	

}
