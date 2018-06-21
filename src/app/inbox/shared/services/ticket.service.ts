import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../../shared/rest';
import { Ticket } from '../models';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TicketService extends Rest {

  constructor(http: HttpClient) { 
		super(http);
	}
	getAll(filter:any=null, page=0):Observable<Ticket[]> {
		let filtros:string='?';
		if(page>0){
			//page = page+1;
			filtros = filtros+'page='+page;
		}else if(filter){
			filtros =  page>0?filtros+'&':filtros+''
			filtros = filtros+'find='+JSON.stringify(filter)
		}
		return this.http.get<Ticket[]>(this.url+'/tickets'+filtros);
	}

	getById(id: number) {
		return this.http.get(this.url+'/tickets/' + id);
	}

	getList() {
		return this.http.get<any[]>(this.url+'/tickets?type=list');
	}

	create(ticket: Ticket):Observable<Ticket> {
		return this.http.post<Ticket>(this.url+'/tickets', ticket);
	}

	update(ticket: Ticket):Observable<Ticket> {
		return this.http.put<Ticket>(this.url+'/tickets' + ticket.id, ticket);
	}

	delete(id: number) {
		return this.http.delete(this.url+'/rickets/' + id);
	}
}
