import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from '../../inbox/shared/services/ticket.service';
import { DepartmentService } from '../../admin/shared/services/department.service'
import { NgxSmartLoaderService } from 'ngx-smart-loader';
import { Ticket } from '../../inbox/shared/models';
@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['../../../assets/css/_public.sass']
})
export class IndexComponent implements OnInit {
	public model:Ticket = new Ticket();
	public department:any =[];
	public nombretemp;
	private lastContent:string = ''
	captcha:any;
	constructor(
		private departmentService:DepartmentService,
		private loader:NgxSmartLoaderService,
		private notificationService:ToastrService,
		private ticketService:TicketService
	) {	 }

	ngOnInit() {
		
		this.departmentService.getList().subscribe(data=>{this.department=data})
		this.loader.stop('appLoader')
	}
	onSubmit(){
      	let isLogin = sessionStorage.getItem('public.isLogin')
		if(isLogin!='true'){
			this.model.user_id = 1
			this.model.client_id = 1
		}else{
			let userId:string = sessionStorage.getItem('public.userId')
      		let clientId:string = sessionStorage.getItem('public.clientId')
      		this.model.user_id = parseInt(userId)
			this.model.client_id = parseInt(clientId)
		}
		this.model.priority_id = 1
		this.lastContent = this.model.content
		this.model.content = '<p><strong>Nombre del soliticitante</strong>:'+this.nombretemp+'</p>'+'<p>'+this.model.content+'</p>'
		this.loader.start('appLoader')
		this.ticketService.create(this.model).subscribe(
			data=>{
				this.notificationService.success('Se envio su solicitud')
				this.model = new Ticket()
				this.lastContent = ''
				this.nombretemp = ''
				this.loader.stop('appLoader')
			},
			error=>{
				this.notificationService.error('Ocurrio un error y no se pudo registrar su solicitud intente nuevamente.')
				this.model.content = this.lastContent
				this.loader.stop('appLoader')
			}
		);

	}
	
}
