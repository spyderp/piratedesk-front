import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../shared/rest';
import { Rol } from './models';
@Injectable()
export class RolService extends Rest {
	constructor(http: HttpClient) { 
		super(http);
	}

	getAll() {
		return this.http.get(this.url+'/rols');
	}

	getById(id: number) {
		return this.http.get(this.url+'/rols/' + id);
	}

	create(rol: Rol) {
		return this.http.post(this.url+'/rols', rol);
	}

	update(rol: Rol) {
		return this.http.put(this.url+'/rols' + rol.id, rol);
	}

	delete(id: number) {
		return this.http.delete(this.url+'/rols/' + id);
	}

}
