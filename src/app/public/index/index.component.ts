import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['../../../assets/css/_public.sass']
})
export class IndexComponent implements OnInit {
	public model:any = [];
	constructor() { }

	ngOnInit() {
	}
	onSubmit(){

	}
}
