import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { environment} from '../../environments/environment';
import * as socketIo from 'socket.io-client';

export abstract class Socket {
	socket;
  namespace;
  constructor(name) {
    this.namespace = name
    this.socket = socketIo(environment.apiServer+this.namespace);
  }
  /**
   * Básic send event
   * @param {any} message [description]
   */
  public send(message:any): void {
    this.socket.emit('message', message);
  }
  /**
   * Recive all message
   * @return {Observable<Message>} [description]
   */
  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data: any) => observer.next(data));
    });
  }

  /**
   * create function observe basic event
   *
   * public onEvent(event: Event): Observable<any> {
   *    return new Observable<Event>(observer => {
   *       this.socket.on(event, (data:any) => observer.next(data));
   *     });
   *   }
   * @param  {any}             event [description]
   * @return {Observable<any>}       [description]
   */
  abstract onEvent(event:any): any;
}
