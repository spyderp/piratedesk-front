import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = (!this.auth.getExpired)?this.auth.getToken():this.auth.getRefresh();
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ${token}'
      }
    });
    return next.handle(request);
  }
}