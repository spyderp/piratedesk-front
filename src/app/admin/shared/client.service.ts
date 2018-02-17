import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Rest } from '../../shared/rest';
import { Client } from './client.model';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService extends Rest {
	constructor(http: Http) { 
		super(http);
	}

	getAll() {
		return this.http.get(this.url+'/clients').map((response: Response) => response.json());
	}

	getById(id: number) {
		return this.http.get(this.url+'/clients/' + id).map((response: Response) => response.json());
	}

	getAssoc() {
		return this.http.get(this.url+'/clients/associations').map((response: Response) => response.json());
	}

	create(client: Client) {
		return this.http.post(this.url+'/clients', client).map((response: Response) => response.json());
	}

	update(client: Client) {
		return this.http.put(this.url+'/clients/' + client.id, client).map((response: Response) => response.json());
	}

	delete(id: number) {
		return this.http.delete(this.url+'/clients/' + id).map((response: Response) => response.json());
	}

}
