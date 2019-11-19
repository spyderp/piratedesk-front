
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment} from '../../environments/environment';
@Injectable()
export class AuthService {
	url: string;
	headers : any;
	options : any;
	refreshInterval:any;
	constructor(private http: HttpClient) { 
		this.url = environment.apiServer;
	}

	getUser(){
		return localStorage.getItem('current.user');
	}
	getRefresh() {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Authorization': 'Bearer '+localStorage.getItem('current.refresh'),
			})
		};
		this.http.post(this.url+'/token/refresh', { }, httpOptions)
				.subscribe( (data:any) => {
						// login successful if there's a jwt token in the response
						if (data && data.access_token) {
								// store user details and jwt token in local storage to keep user logged in between page refreshes
								localStorage.setItem('current.token', data.access_token);
								localStorage.setItem('current.expired', data.expired_token);
						}
						// return data.access_token;
				});

	}

	getToken(): string {
		return localStorage.getItem('current.token');
	}

	getExpired(): boolean {
		const expired = Number(localStorage.getItem('current.expired'));
		return expired <= (Date.now()/1000);
	}

	login(username: string, password: string) {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
			})
		};
			return this.http.post(this.url + '/login', JSON.stringify({ username: username, password: password }), httpOptions).pipe(
					map( (data:any) => {
							// login successful if there's a jwt token in the response
							if (data && data.access_token) {
									// store user details and jwt token in local storage to keep user logged in between page refreshes
									localStorage.setItem('current.user', JSON.stringify(data.user));
									localStorage.setItem('current.token', data.access_token);
									localStorage.setItem('current.refresh', data.refresh_token);
									localStorage.setItem('current.expired', data.expired_token);
							}
							this.refresh();
							return data;
					}));
	}
	loginPublic(client:number, username: string, password: string) {
		const  httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
			})
		};
			return this.http.post(this.url+'/login_public', JSON.stringify({ clienteID:client,username: username, password: password }), httpOptions)
	}
	
	logout() {
		const httpOptionsLogout = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Authorization': 'Bearer '+localStorage.getItem('current.token'),
			})
		};
		const httpOptionsRefresh = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Authorization': 'Bearer '+localStorage.getItem('current.refresh'),
			})
		};
		clearInterval(this.refreshInterval);
			this.http.post(this.url+'/logout/access',{},httpOptionsLogout).subscribe(data=>{});
			this.http.post(this.url+'/logout/refresh',{},httpOptionsRefresh).subscribe(data=>{});
			localStorage.removeItem('current.user');
			localStorage.removeItem('current.token');
			localStorage.removeItem('current.refresh');
			localStorage.removeItem('current.expired');
	}

	private refresh(){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json',
				'Authorization': 'Bearer '+localStorage.getItem('current.refresh'),
			})
		};
		this.refreshInterval= setInterval(()=>{
			this.http.post(this.url+'/token/refresh', { }, httpOptions)
					.subscribe( (data:any) => {
							// login successful if there's a jwt token in the response
							if (data && data.access_token) {
									// store user details and jwt token in local storage to keep user logged in between page refreshes
									localStorage.setItem('current.token', data.access_token);
									localStorage.setItem('current.expired', data.expired_token);
							}
							//return data.access_token;
					});
		},15*60*1000);
		 
	}
	forgot(email:string){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json'
			})
		};
		return this.http.post(this.url+'/reset/password', JSON.stringify({ email: email}), httpOptions)
	}

	reset(token:string){
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':  'application/json'
			})
		};
		return this.http.get(this.url+'/reset/token/'+token, httpOptions)
	}


}
