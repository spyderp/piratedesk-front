import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment} from '../../environments/environment';
export abstract class Rest {
	url: string;
 	constructor(public http: HttpClient) { 
		this.url = environment.apiServer;
	}

	abstract getAll():any; 
	abstract getById(id: number):any;
	abstract create(objet: any):any;
	abstract update(objet: any):any;
	abstract delete(id: number):any;
}