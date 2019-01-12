import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Socket } from '../../../shared/socket';
import {Event} from '../models'
@Injectable()
export class CommentsService extends Socket {
  constructor() {
  	super('/comments');
  }

  public onEvent(event: Event): Observable<any> {
   return new Observable<Event>(observer => {
      this.socket.on(event, (data:any) => observer.next(data));
    });
  }

  public onConnect(data:any): void{
  	this.socket.emit('login', data);
  }
}
