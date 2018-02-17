import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Config } from './config.model'

@Injectable()
export class AuthService {
	url: string;
	headers : any;
	options : any;
	constructor(private http: HttpClient) { 
		this.url     = Config.API_ENDPOINT;
	}

	getRefresh(){
		let httpOptions = {
		  headers: new HttpHeaders({
		    'Content-Type':  'application/json',
		    'Authorization': 'Bearer '+ localStorage.getItem('current.refresh'),
		  })
		};
		return this.http.post(this.url+'/token/refresh', { }, httpOptions)
	        .map( (data:any) => {
	            // login successful if there's a jwt token in the response
	            if (data && data.access_token) {
	                // store user details and jwt token in local storage to keep user logged in between page refreshes
	                localStorage.setItem('current.token', data.access_token);
	                localStorage.setItem('current.expired', data.expired_token);
	            }
	            return data.access_token;
	        });
	}

	getToken(){
		return localStorage.getItem('current.token');
	}

	getExpired(){
		let expired = Number(localStorage.getItem('current.expired'));
		return expired <= (Date.now()/1000);
	}

	
	login(username: string, password: string) {
		let httpOptions = {
		  headers: new HttpHeaders({
		    'Content-Type':  'application/json',
		    //'Authorization': 'my-auth-token'
		  })
		};
	    return this.http.post(this.url+'/login', JSON.stringify({ username: username, password: password }), httpOptions)
	        .map( (data:any) => {
	            // login successful if there's a jwt token in the response
	            if (data && data.access_token) {
	                // store user details and jwt token in local storage to keep user logged in between page refreshes
	                localStorage.setItem('current.user', JSON.stringify(data.user));
	                localStorage.setItem('current.token', data.access_token);
	                localStorage.setItem('current.refresh', data.refresh_token);
	                localStorage.setItem('current.expired', data.expired_token);
	            }
	            return data;
	        });
	}

	logout() {
		let httpOptionsLogout = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Authorization': 'Bearer '+localStorage.getItem('current.token'),
			})
		};
		let httpOptionsRefresh = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Authorization': 'Bearer '+localStorage.getItem('current.refresh'),
			})
		};
	    this.http.post(this.url+'/logout/access',{},httpOptionsLogout);
	    this.http.post(this.url+'/logout/refresh',{},httpOptionsRefresh);
	    localStorage.removeItem('current');
	}


}
