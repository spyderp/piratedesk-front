import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.sass']
})
export class IndexComponent implements OnInit {
	public model:any = [];
	constructor() { }

	ngOnInit() {
	}
	onSubmit(){

	}
}
