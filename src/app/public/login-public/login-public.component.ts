import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'login-public',
  templateUrl: './login-public.component.html',
  styleUrls: ['./login-public.component.sass']
})
export class LoginPublicComponent implements OnInit {
	model:any = { };
	loading: boolean = false;
	returnUrl: string;
  captchalog:any;
  isLogin:boolean = false
  userInfo:any = {}
  constructor(
  	private route: ActivatedRoute,
		private router: Router,
		private auth: AuthService,
		private toastrService:ToastrService, 
  	) { }

  ngOnInit() {
    sessionStorage.setItem('public.isLogin', 'false');
  }
  onSubmit(){
    this.loading = true
    this.auth.loginPublic(parseInt(this.model.codigo_cliente,10), this.model.username, this.model.password).subscribe(
    (data:any)=>{
      sessionStorage.setItem('public.isLogin', 'true');
      sessionStorage.setItem('public.userId', data.user.id)
      sessionStorage.setItem('public.clientId', data.user.client_id)
      this.isLogin = true
      this.userInfo = data.user
      this.toastrService.info('Autenticación correcta')
      this.loading = false
    },
    Error=>{
      this.toastrService.error('Autenticación incorrecta, corregir e intente nuevamente')
      this.loading = false
    })
  }
  onLogout(){
     sessionStorage.setItem('public.isLogin', 'false');
     sessionStorage.setItem('public.userClientId', '')
     this.isLogin = false
     this.userInfo = {}
     this.model = {}
     
  }
}
