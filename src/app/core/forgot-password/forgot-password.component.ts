import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {
	model:any = {};
	loading: boolean = false;
	constructor(
		private auth: AuthService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private toastyService:ToastrService, 
	) { 
		
	}

	ngOnInit() {
		let token = this.activatedRoute.snapshot.queryParams["token"];
		if(token){
			this.loading = true;
			this.auth.reset(token).subscribe(
				data=>{
					this.toastyService.success('Se ha enviado un correo con su nueva contraseña a su correo');
					this.loading = false;
					setTimeout(()=>{ 
						this.router.navigate(['/inbox']); 
					}, 900);

				},
				error=>{
					this.toastyService.error('Ocurrio un error, intente nuevamente');
					this.loading = false;
					console.log(error.message)
				}
			);
		}
	}
	onSubmit(){
		this.loading = true;
		this.auth.forgot(this.model.email)
		.subscribe(
			data => {
				if(data){
					this.toastyService.success('Se ha enviado un correo a su cuenta');
					setTimeout(()=>{ 
						this.router.navigate(['/inbox']); 
					}, 900);
				}else{
					this.toastyService.error('No se encontro el correo');
				}
				
			},
			error => {
				this.toastyService.error('No se encontro el correo');
				console.log(error.message)
				this.loading = false;
		});
		this.loading = false;
	}
}
