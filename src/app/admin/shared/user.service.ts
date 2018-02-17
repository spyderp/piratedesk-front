import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Rest } from '../../shared/rest';
import { User } from './user.model';
import 'rxjs/add/operator/map';
@Injectable()
export class UserService extends Rest{
	constructor(http: Http) { 
		super(http);
	}
	getAll() {
		return this.http.get(this.url+'/users').map((response: Response) => response.json());
	}

	getById(id: number) {
		return this.http.get(this.url+'/users/' + id).map((response: Response) => response.json());
	}

	create(user: User) {
		return this.http.post(this.url+'/users', user).map((response: Response) => response.json());
	}

	update(user: User) {
		return this.http.put(this.url+'/users/' + user.id, user).map((response: Response) => response.json());
	}

	delete(id: number) {
		return this.http.delete(this.url+'/users/' + id).map((response: Response) => response.json());
	}
	associations() {
		return this.http.get(this.url+'/users/associations').map((response: Response) => response.json());
	}
}
