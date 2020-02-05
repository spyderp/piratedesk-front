import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { User } from '../shared/models'
import { UserService  } from '../shared/services/user.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { NgxSmartLoaderService } from 'ngx-smart-loader'

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.sass'],
})
export class UsersComponent implements OnInit {
	active: Array<any> = []
	formBtnLabel: string
	formTitle: string
	items: any = []
	loading = false
	modalReference
	model: User =  new User()
	users: User[] = []
	value: any = {}
	s = []
	col = [
		{ name: 'Usuario', prop: 'username'},
		{ name: 'Nombre', prop: 'nombre'},
		{ name: 'Apellido', prop: 'apellido'},
		{ name: 'Correo', prop: 'email'},
		{ name: 'Creado', prop: 'creado'}
	]
	constructor(
		private toastyService: ToastrService,
		private userService: UserService,
		private modalService: NgbModal,
		public loader: NgxSmartLoaderService
	) { }

	 public ngOnInit(): any {
	 	this.loading = true
		this.loadAllUsers()
		this.userService.associations().subscribe(
			data => {
				this.items =  data
			}
		)
		this.loader.stop('appLoader')

	}
	onDelete(event) {
		const id = event[0].id
		this.userService.delete(id).subscribe( () => {
			const index: number = this.users.map((element) => element.id).indexOf(id)
			delete this.users[index]
		}, error => {
			this.toastyService.error('Ocurrio un error. No se pudo ejecutar la acción intente de nuevo')
		})
	}
	onSubmit() {
		this.loader.start('appLoader')
		 if (this.model.departments.length !== 0) {
			 this.model.departments =  [{id: this.model.departments}]
		 }
		if (this.model.id) {
			 this.userService.update(this.model).subscribe( data => {
				if (data) {
					this.toastyService.success('Registro Actualizado')
					this.loadAllUsers()
					this.modalReference.close()
				} else {
					this.toastyService.error('El registro no se pudo actualizar corregir e intente nuevamente')
				}
				this.loader.stop('appLoader')
			},
			error => {
				this.toastyService.error(error)
				this.loader.stop('appLoader')
			})
		 } else {
			this.userService.create(this.model).subscribe( data => {
				if (data) {
					this.toastyService.success('Nuevo registro creado con exito')
					this.users = this.users.concat(data)
					this.modalReference.close()
				} else {
					this.toastyService.error('El registro no se pudo guardar corregir e intente nuevamente')
				}
				this.loader.stop('appLoader')
			},
			error => {
				this.loader.stop('appLoader')
				this.toastyService.error(error)
			})
		 }
	}
	onLoadForm(event, content) {
		this.loadForm()
		this.modalReference = this.modalService.open(content, {size: 'lg'})
	}
	onEdit(event, content) {
		this.loadForm(false)
		this.model = this.users.filter((user: User) => user.id ===  event[0].id)[0]
		this.active = []
		this.modalReference = this.modalService.open(content, {size: 'lg'})
	}
	private loadAllUsers() {
		this.userService.getAll().subscribe(data => { this.users = data})
		this.loading = false
	}
	private loadForm(add: boolean = true) {
		this.formTitle = (add) ? 'Crear Usuario' : 'Editar Usuario'
		this.formBtnLabel = (add) ? 'Guardar' : 'Actualizar'
		this.model = new User()
	}

	public onUploadError(args: any): void {
	}

 	public onUploadSuccess(args: any): void {
			this.model.file_id = args[1].id
	}
}
