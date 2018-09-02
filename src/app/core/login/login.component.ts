import { Component, OnInit,} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
	model:any = {};
	loading: boolean = false;
	returnUrl: string;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private auth: AuthService,
		private toastyService:ToastrService, 
		private loader:NgxSmartLoaderService
	) {	 }

	ngOnInit() {
		// reset login status
        // Add see all possible types in one shot
		//this.auth.logout();
		// get return url from route parameters or default to '/'
		this.loader.start('appLoader')
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inbox';
		this.loader.stop('appLoader')
	}

	onSubmit() {
		this.loading = true;
		this.auth.login(this.model.username, this.model.password)
		.subscribe(
			data => {
				this.toastyService.success('Acceso completado');
				setTimeout(()=>{ 
					this.router.navigate([this.returnUrl]); }, 500);
			},
			error => {
				this.toastyService.error('Su usuario y/o contraseña son incorrectos intente nuevamente');
				this.loading = false;
		});
	}
}
