import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Rest } from '../../shared/rest';
import { User } from './user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService extends Rest{
	constructor(http: HttpClient) { 
		super(http);
	}
	getAll():Observable<User[]> {
		return this.http.get<User[]>(this.url+'/users');
	}

	getById(id: number):Observable<User> {
		return this.http.get<User>(this.url+'/users/' + id);
	}

	create(user: User):Observable<User> {
		return this.http.post<User>(this.url+'/users', user);
	}any

	update(user: User):Observable<User> {
		return this.http.put<User>(this.url+'/users/' + user.id, user);
	}

	delete(id: number) {
		return this.http.delete(this.url+'/users/' + id);
	}

	patch(id:number,data:any){
		return this.http.patch(this.url+'/users/' + id, data);	
	}

	associations() {
		return this.http.get(this.url+'/departments?type=list');
	}
}
