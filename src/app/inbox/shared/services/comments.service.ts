 import { Injectable } from '@angular/core'
import { Observable ,  Observer } from 'rxjs'
import { Message } from '../models'
import { Rest } from '../../../shared/rest';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class CommentsService extends Rest {
	constructor(http: HttpClient) {
		super(http)
	}

	getAll():Observable<Message[]>{
		return this.http.get<Message[]>(this.url + '/messages')
	}
	getMsgForTiccke(ticketId: number): Observable<Message[]> {
		return this.http.get<Message[]>(this.url + '/messages?find=' + ticketId)
	}
	getLastUpdate(ticketId: number, lastId: number): Observable<Message[]> {
		return this.http.get<Message[]>(this.url + '/messages?find=' + ticketId + '&last=' + lastId)
	}
	getById(id:number) {
		return this.http.get(this.url + '/messages/' + id)
	}

	create(message: any) {
		return this.http.post<Message>(this.url + '/messages', message)
	}

	update(message: Message): Observable<Message> {
		return this.http.put<Message>(this.url + '/messages/' + message.id, message)
	}

	delete(id: number) {
		return this.http.delete(this.url + '/messages/' + id)
	}
	/* public onEvent(event: Event): Observable<any> {
	 return new Observable<Event>(observer => {
		 this.socket.on(event, (data:any) => observer.next(data))
		})
	}

	public onConnect(data:any): void{
		 this.socket.emit('login', data)
	} */
}
