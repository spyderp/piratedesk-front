import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Rest } from '../../shared/rest';
import { Rol } from './rol.model';
import 'rxjs/add/operator/map';
@Injectable()
export class RolService extends Rest {
	constructor(http: Http) { 
		super(http);
	}

	getAll() {
		return this.http.get(this.url+'/rols').map((response: Response) => response.json());
	}

	getById(id: number) {
		return this.http.get(this.url+'/rols/' + id).map((response: Response) => response.json());
	}

	create(rol: Rol) {
		return this.http.post(this.url+'/rols', rol).map((response: Response) => response.json());
	}

	update(rol: Rol) {
		return this.http.put(this.url+'/rols' + rol.id, rol).map((response: Response) => response.json());
	}

	delete(id: number) {
		return this.http.delete(this.url+'/rols/' + id).map((response: Response) => response.json());
	}

}
