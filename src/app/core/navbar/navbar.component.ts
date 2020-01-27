import { Component, OnInit  } from '@angular/core'
import { AuthService } from '../../shared/auth.service'
import { NgxSmartLoaderService } from 'ngx-smart-loader'
import { Router} from '@angular/router'
import { User } from '../../admin/shared/models'
import { UserService  } from '../../admin/shared/services/user.service'
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr'
@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	providers:[UserService ]
})
export class NavbarComponent implements OnInit {
	public navbarCollapsed = true
	private model: any
	closeResult: string
	isCollapsed = true
	private sidebarVisible: boolean
	constructor(
	private auth: AuthService,
	private router: Router,
	private userService: UserService,
	private modalService: NgbModal,
	private toastyService: ToastrService, 
	public loader: NgxSmartLoaderService,
	) { }

	ngOnInit() {
		const user: any = localStorage.getItem('current.user')
		this.model =  JSON.parse(user)
		if (window.screen.width <= 360) {
			this.isCollapsed = false
			this.sidebarClose()
		}
	}

	open(content) {
		this.modalService.open(content).result.then((result) => {
			this.closeResult = `Closed with: ${result}`
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
		})
	}

	onSubmit(){
		this.loader.start('appLoader')
		const  patch = {
			email: this.model.email,
			password: this.model.password
		}
		this.userService.patch(this.model.id, patch).subscribe( () => {
				this.toastyService.success('Registro Actualizado')
				this.loader.stop('appLoader')
			},
			error => {
				this.toastyService.error('Ocurrio un error y no se pudo guardar, corregir e intente nuevamente')
		})
	}

	sidebarOpen() {
		const sidebar = document.getElementById('sidebar')
		const bodyContent = document.getElementById('bodyContent')
		if (sidebar && sidebar.classList.contains('d-none')) {
			sidebar.classList.remove('d-none')	
		}
		if (bodyContent && bodyContent.classList.contains('col-lg-12')) {
			bodyContent.classList.remove('col-lg-12')
			bodyContent.classList.add('col-lg-10')
		}
		this.sidebarVisible = true
	}
	sidebarClose() {
		const  sidebar = document.getElementById('sidebar')
		const bodyContent = document.getElementById('bodyContent')
		this.sidebarVisible = false
		if (sidebar) {
			sidebar.classList.add('d-none')	
		}
		if (bodyContent && bodyContent.classList.contains('col-lg-10')) {
			bodyContent.classList.remove('col-lg-10')
			bodyContent.classList.add('col-lg-12')
		}
	}
	sidebarToggle() {
		if (this.sidebarVisible === false) {
			this.sidebarOpen()
		} else {
			this.sidebarClose()
		}
	}

	logout(){
		this.auth.logout()
		this.router.navigate(['/login'])
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC'
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop'
		} else {
			return  `with: ${reason}`
		}
	}
}
