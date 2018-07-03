import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'login-public',
  templateUrl: './login-public.component.html',
  styleUrls: ['../../../assets/css/_public.sass']
})
export class LoginPublicComponent implements OnInit {
	model:any = {};
	loading: boolean = false;
	returnUrl: string;
  constructor(
  	private route: ActivatedRoute,
		private router: Router,
		private auth: AuthService,
		private toastyService:ToastrService, 
  	) { }

  ngOnInit() {
  }

}
