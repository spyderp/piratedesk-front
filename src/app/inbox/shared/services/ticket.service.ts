import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../../shared/rest';
import { Ticket } from '../models';
import { Observable } from 'rxjs';
@Injectable()
export class TicketService extends Rest {

	constructor(http: HttpClient) {
		super(http)
	}
	getAll(filter: any = null, page = 0): Observable<Ticket[]> {
		let filtros = ''
		if (page > 0 || !!filter ) {
			filtros = '?'
		}
		if (page > 0) {
			filtros = filtros + 'page=' + page;
		}
		if (filter) {
			filtros =  page > 0 ? filtros + '&' : filtros + ''
			filtros = filtros + 'find=' + JSON.stringify(filter)

		}
		return this.http.get<Ticket[]>(this.url + '/tickets' + filtros);
	}

	getById(id: number):Observable<Ticket> {
		return this.http.get<Ticket>(this.url + '/tickets/' + id);
	}

	getList() {
		return this.http.get<any[]>(this.url + '/tickets?type=list');
	}

	create(ticket: any):Observable<Ticket> {
		return this.http.post<Ticket>(this.url + '/tickets', ticket);
	}

	update(ticket: Ticket):Observable<Ticket> {
		return this.http.put<Ticket>(this.url + '/tickets/' + ticket.id, ticket);
	}

	delete(id: number) {
		return this.http.delete(this.url + '/tickets/' + id);
	}
	/**
	 * Se manejan 3 caso los cuales son asignar, cambiar estado y subir archvio
	 * @param {number}    		 id   indice del ticket
	 * @param {any}       		 data arreglo de datos a enviar.
	 * @param {number =    0}  type 0 = asignar, 1 = cambio de estado, 2 = subir archivo
	 */
	patch(id: number, data: any, type: number = 0){
		return this.http.patch(this.url + '/tickets/' + id + '?type=' + type, data)
	}
}
