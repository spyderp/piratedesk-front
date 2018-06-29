import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['../../../assets/css/_public.sass']
})
export class IndexComponent implements OnInit {
	public model:any = [];
	constructor(private notificationService:ToastrService) {	 }

	ngOnInit() {
		this.notificationService.info('Hola mundo')
	}
	onSubmit(){

	}
}
