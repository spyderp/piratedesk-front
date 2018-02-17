import { Component, OnInit,} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

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
		private toastyService:ToastyService, 
		private toastyConfig: ToastyConfig
	) {
		this.toastyConfig.theme = 'bootstrap';
		this.toastyConfig.timeout = 5000;
		this.toastyConfig.position = 'top-right';

	 }

	ngOnInit() {
		// reset login status
        // Add see all possible types in one shot
		//this.auth.logout();
		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inbox';
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
				let option = JSON.parse(error._body);
				this.toastyService.error(option.message);
				this.loading = false;
		});
	}
}
