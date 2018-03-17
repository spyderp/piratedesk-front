import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { User } from '../../admin/shared/user.model';
import { UserService  } from '../../admin/shared/user.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgProgress } from 'ngx-progressbar';
import { Router} from '@angular/router';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  providers:[UserService ]
})
export class NavbarComponent implements OnInit {
	private model:User =  new User();
	closeResult: string;
	isCollapsed = true;
  constructor(
	private auth: AuthService,
	private progressService: NgProgress,
	private router: Router,
	private toastyConfig: ToastyConfig,
	private userService: UserService,
  	private modalService: NgbModal,
  	private toastyService:ToastyService, 
  ) { }

  ngOnInit() {
  	let user:any = localStorage.getItem('current.user');
  	this.model =  JSON.parse(user);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit(){
  	this.progressService.start();
  	let patch = {
  		email:this.model.email,
  		password: this.model.password
  	}
  	this.userService.patch(this.model.id, patch).subscribe(data => {
				if(data){
				/*	let user:any = localStorage.getItem('current.user');
					user = JSON.parse(user);
					user.email = this.model.email;
					localStorage.setItem('current.user', user)*/
					this.toastyService.success('Registro Actualizado');
				}else{
		           		this.toastyService.error('El registro no se pudo actualizar corregir e intente nuevamente');
		        	}	
			},
			error => {
				this.toastyService.error('Ocurrio un error y no se pudo guardar, corregir e intente nuevamente');
			});
			this.progressService.done();
  }

  logout(){
  	this.auth.logout();
  	this.router.navigate(['/login']);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
