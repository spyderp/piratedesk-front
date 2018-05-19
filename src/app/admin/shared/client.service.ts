import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../shared/rest';
import { Client } from './models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClientService extends Rest {
	constructor(http: HttpClient) { 
		super(http);
	}

	getAll():Observable<Client[]> {
		return this.http.get<Client[]>(this.url+'/clients');
	}

	getById(id: number) {
		return this.http.get(this.url+'/clients/' + id);
	}

	getAssoc() {
		return this.http.get<any[]>(this.url+'/calendars?type=list');
	}

	create(client: Client) {
		return this.http.post<Client>(this.url+'/clients', client);
	}

	update(client: Client):Observable<Client> {
		return this.http.put<Client>(this.url+'/clients/' + client.id, client);
	}

	delete(id: number) {
		return this.http.delete(this.url+'/clients/' + id);
	}

}
