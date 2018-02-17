import { Http, Headers, RequestOptions } from '@angular/http';
import { Config } from './config.model';

export abstract class Rest {
	url: string;
 	constructor(public http: Http) { 
		this.url = Config.API_ENDPOINT;
	}

	abstract getAll():any; 
	abstract getById(id: number):any;
	abstract create(objet: any):any;
	abstract update(objet: any):any;
	abstract delete(id: number):any;
}