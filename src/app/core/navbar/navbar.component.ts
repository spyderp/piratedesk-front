import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
import { Router} from '@angular/router';
import { User } from '../../admin/shared/models';
import { UserService  } from '../../admin/shared/services/user.service'
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	providers:[UserService ]
})
export class NavbarComponent implements OnInit {
	public navbarCollapsed = true;
	private model:User =  new User();
	closeResult: string;
	isCollapsed = true;
	private sidebarVisible: boolean;
	constructor(
	private auth: AuthService,
	private router: Router,
	private userService: UserService,
	private modalService: NgbModal,
	private toastyService:ToastrService, 
	public loader: NgxSmartLoaderService,
	) { }

	ngOnInit() {
		let user:any = localStorage.getItem('current.user');
		this.model =  JSON.parse(user);
		if (window.screen.width <= 360) {
			this.isCollapsed = false
			this.sidebarClose()
		}
	}

	open(content) {
		this.modalService.open(content).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}

	onSubmit(){
		this.loader.start('appLoader');
		let patch = {
			email:this.model.email,
			password: this.model.password
		}
		this.userService.patch(this.model.id, patch).subscribe(data => {
				if(data){
					this.toastyService.success('Registro Actualizado');
				}else{
									this.toastyService.error('El registro no se pudo actualizar corregir e intente nuevamente');
							}	
				this.loader.stop('appLoader')
			},
			error => {
				this.toastyService.error('Ocurrio un error y no se pudo guardar, corregir e intente nuevamente');
			});
	}

	sidebarOpen() {
		const sidebar = document.getElementById('sidebar');
		const bodyContent = document.getElementById('bodyContent');
		sidebar.classList.remove('d-none');
		bodyContent.classList.remove('col-lg-12')
		bodyContent.classList.add('col-lg-10')
		this.sidebarVisible = true;
	};
	sidebarClose() {
		const  sidebar = document.getElementById('sidebar');
		const bodyContent = document.getElementById('bodyContent');
		this.sidebarVisible = false;
		sidebar.classList.add('d-none');
		bodyContent.classList.remove('col-lg-10')
		bodyContent.classList.add('col-lg-12')
	};
	sidebarToggle() {
		if (this.sidebarVisible === false) {
			this.sidebarOpen();
		} else {
			this.sidebarClose();
		}
	};

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
