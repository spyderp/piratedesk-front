import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rest } from '../../shared/rest';
import { Observable } from 'rxjs';
import { Knowledge } from './models'
@Injectable()
export class KnowledgeService extends Rest {

  constructor(http: HttpClient) { 
		super(http);
  }
  getAll():Observable<Knowledge[]> {
		return this.http.get<Knowledge[]>(this.url+'/knowledges');
	}

	getById(id: number) {
		return this.http.get(this.url+'/knowledges/' + id);
	}

	create(model: Knowledge) {
		return this.http.post<Knowledge>(this.url+'/knowledges', model);
	}

	update(model: Knowledge):Observable<Knowledge> {
		return this.http.put<Knowledge>(this.url+'/knowledges/' + model.id, model);
	}

	delete(id: number) {
		return this.http.delete(this.url+'/knowledges/' + id);
	}

	patch(id:number,data:any){
		return this.http.patch(this.url+'/knowledges/' + id, data);	
	}
}