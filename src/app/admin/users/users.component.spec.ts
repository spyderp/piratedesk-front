import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { NgxSmartLoaderService } from 'ngx-smart-loader'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { environment } from '../../../environments/environment'
import { User } from '../shared/models';
import { UserService } from '../shared/services/user.service';


class ToastrServiceStub {
	success(msg: string) {
		return true
	}

	error(msg: string) {
		return true
	}
}
class NgxSmartLoaderServiceStub {
	start(name: string, option: any = null) {
		return true
	}

	stop(name: string) {
		return true
	}
}

class MockModalOpen {
	close(): void {

	}
}
class MockModalService {
	open(object: any) {
		return new MockModalOpen()
	}
}
describe('UsersComponent', () => {
	let component: UsersComponent
	let fixture: ComponentFixture<UsersComponent>
	let service: UserService
	let httpMock: HttpTestingController
	const url = environment.apiServer + '/users'
	const expectReturn: User[] = [
		{
			id: 1,
			username: 'prueba',
			password: 'kfdjgldkgj',
			nombre: 'kfdjgldkgj',
			apellido: 'kfdjgldkgj',
			email: 'kfdjgldkgj',
			activo: true,
			creado: 'kfdjgldkgj',
			modificado: new Date(),
			ultimo_acceso: new Date(),
			puntaje: 0,
			rol_id: 1,
			file_id: 1,
			rol: 'kfdjgldkgj',
			clients: [],
			departments: []
		},
		{
			id: 2,
			username: 'test',
			password: 'kfdjgldkgj',
			nombre: 'kfdjgldkgj',
			apellido: 'kfdjgldkgj',
			email: 'kfdjgldkgj',
			activo: true,
			creado: 'kfdjgldkgj',
			modificado: new Date,
			ultimo_acceso: new Date,
			puntaje: 0,
			rol_id: 1,
			file_id: 1,
			rol: 'kfdjgldkgj',
			clients: [],
			departments: []
		},
	]
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ UsersComponent ],
			imports: [FormsModule, HttpClientTestingModule, ToastrModule],
			providers: [
				UserService,
				{ provide: ToastrService, useClass: ToastrServiceStub },
				{ provide: NgxSmartLoaderService, useClass: NgxSmartLoaderServiceStub },
				{ provide: NgbModal, useClass: MockModalService }
			],
			schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
		})
		.compileComponents()
		service = TestBed.get(UserService)
		httpMock = TestBed.get(HttpTestingController)
	}))

	beforeEach(() => {
		fixture = TestBed.createComponent(UsersComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	afterAll(() => {
		service = null
		httpMock = null
		fixture = null
	})

	it('should be created', () => {
		expect(component).toBeTruthy();
	})

	it('#onLoadForm ', () => {
		const event = new Event('click')
		component.onLoadForm(event, 'prueba')
		expect(component.modalReference).toEqual(new MockModalOpen(), 'modalRefereren call')
		expect(component.formTitle).toEqual('Crear Usuario', 'change FormTitle')
		expect(component.formBtnLabel).toEqual('Guardar', 'change label')
		expect(component.model).toEqual(new User(), 'change model')
	})

	it('#onDelete should', () => {
		const event = new Event('click')
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		const req2 = httpMock.expectOne(environment.apiServer + '/departments?type=list', 'call to list')
		expect(req2.request.method).toBe('GET')
		req2.flush(expectReturn)
		httpMock.verify()
		const e = [{ id: 1 }]
		component.onDelete(e)
		req = httpMock.expectOne(url + '/1', 'call to DELETE')
		expect(req.request.method).toBe('DELETE')
		req.flush(3)
		httpMock.verify()
		expect(component.users[0]).toBeUndefined()
	})

	it('#onDelete should error', () => {
		const event = new Event('click')
		const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		const req2 = httpMock.expectOne(environment.apiServer + '/departments?type=list', 'call to list')
		expect(req2.request.method).toBe('GET')
		req2.flush(expectReturn)
		httpMock.verify()
		const e = [{ id: 1 }]
		component.onDelete(e)
		req = httpMock.expectOne(url + '/1', 'call to DELETE')
		expect(req.request.method).toBe('DELETE')
		req.flush(3, mockErrorResponse)
		httpMock.verify()
		expect(component.users).toEqual(expectReturn)
	})

	it('#onEdit should', () => {
		const req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		const req2 = httpMock.expectOne(environment.apiServer + '/departments?type=list', 'call to list')
		expect(req2.request.method).toBe('GET')
		req2.flush(expectReturn)
		req.flush(expectReturn)
		httpMock.verify()
		const e = [{ id: 1 }]
		component.onEdit(e, 'editar')
		expect(component.modalReference).toEqual(new MockModalOpen(), 'modalRefereren call')
		expect(component.formTitle).toEqual('Editar Usuario', 'change FormTitle')
		expect(component.formBtnLabel).toEqual('Actualizar', 'change formBtnLabel')
		expect(component.model).toEqual(expectReturn[0], 'equal model')
	})

	it('#onSubmit (create) should', () => {
		const newData: any = {
			username: 'nuevo',
			password: 'kfdjgldkgj',
			nombre: 'kfdjgldkgj',
			apellido: 'kfdjgldkgj',
			email: 'kfdjgldkgj',
			activo: true,
			creado: 'kfdjgldkgj',
			modificado: new Date(),
			ultimo_acceso: new Date(),
			puntaje: 0,
			rol_id: 1,
			file_id: 1,
			rol: 'kfdjgldkgj',
			clients: [],
			departments: [
				{ id: 1, descripcion: 'ksdfskf' }
			]
		}
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		const req2 = httpMock.expectOne(environment.apiServer + '/departments?type=list', 'call to list')
		expect(req2.request.method).toBe('GET')
		req2.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url, 'call to post')
		expect(req.request.method).toBe('POST')
		req.flush({
			id: 3,
			username: 'nuevo',
			password: 'kfdjgldkgj',
			nombre: 'kfdjgldkgj',
			apellido: 'kfdjgldkgj',
			email: 'kfdjgldkgj',
			activo: true,
			creado: 'kfdjgldkgj',
			modificado: new Date(),
			ultimo_acceso: new Date(),
			puntaje: 0,
			rol_id: 1,
			file_id: 1,
			rol: 'kfdjgldkgj',
			clients: [],
			departments: [
				{ id: 1, descripcion: 'ksdfskf' }
			]
		})
		httpMock.verify()
		expect(component.users[2]).toBeTruthy()
		expect(component.users[2].username).toEqual('nuevo')
	})

	it('#onSubmit (create) should nulll ', () => {
		const newData: any = {
			username: 'nuevo',
			password: 'kfdjgldkgj',
			nombre: 'kfdjgldkgj',
			apellido: 'kfdjgldkgj',
			email: 'kfdjgldkgj',
			activo: true,
			creado: 'kfdjgldkgj',
			modificado: new Date(),
			ultimo_acceso: new Date(),
			puntaje: 0,
			rol_id: 1,
			file_id: 1,
			rol: 'kfdjgldkgj',
			clients: [],
			departments: []
		}
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		const req2 = httpMock.expectOne(environment.apiServer + '/departments?type=list', 'call to list')
		expect(req2.request.method).toBe('GET')
		req2.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url, 'call to post')
		expect(req.request.method).toBe('POST')
		req.flush(null)
		httpMock.verify()
		expect(component.users[2]).toBeUndefined()
	})

	it('#onSubmit (create) should error ', () => {
		const newData: any = {
			username: 'prueba',
			password: 'kfdjgldkgj',
			nombre: 'kfdjgldkgj',
			apellido: 'kfdjgldkgj',
			email: 'kfdjgldkgj',
			activo: true,
			creado: 'kfdjgldkgj',
			modificado: new Date(),
			ultimo_acceso: new Date(),
			puntaje: 0,
			rol_id: 1,
			file_id: 1,
			rol: 'kfdjgldkgj',
			clients: [],
			departments: [
				
			]
		}
		const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		const req2 = httpMock.expectOne(environment.apiServer + '/departments?type=list', 'call to list')
		expect(req2.request.method).toBe('GET')
		req2.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url, 'call to post')
		expect(req.request.method).toBe('POST')
		req.flush(1, mockErrorResponse)
		httpMock.verify()
		expect(component.users[2]).toBeUndefined()
	})

	it('#onSubmit (edit) should', () => {
		const newData: User = {
			id: 2,
			username: 'nuevo',
			password: 'kfdjgldkgj',
			nombre: '324234',
			apellido: 'kfdjgldkgj',
			email: 'kfdjgldkgj',
			activo: true,
			creado: 'kfdjgldkgj',
			modificado: new Date(),
			ultimo_acceso: new Date(),
			puntaje: 0,
			rol_id: 1,
			file_id: 1,
			rol: 'kfdjgldkgj',
			clients: [],
			departments: []
		}
		const loadAll = spyOn((<any>component), 'loadAllUsers')
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		const req2 = httpMock.expectOne(environment.apiServer + '/departments?type=list', 'call to list')
		expect(req2.request.method).toBe('GET')
		req2.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url + '/2', 'call to put')
		expect(req.request.method).toBe('PUT')
		req.flush({ id: 2 })
		httpMock.verify()
		expect(loadAll).toHaveBeenCalled()
	})

	it('#onSubmit (edit) should null data', () => {
		const newData: User = {
			id: 2,
			username: 'prueba',
			password: 'kfdjgldkgj',
			nombre: 'kfdjgldkgj',
			apellido: 'kfdjgldkgj',
			email: 'kfdjgldkgj',
			activo: true,
			creado: 'kfdjgldkgj',
			modificado: new Date(),
			ultimo_acceso: new Date(),
			puntaje: 0,
			rol_id: 1,
			file_id: 1,
			rol: 'kfdjgldkgj',
			clients: [],
			departments: []
		}
		const loadAll = spyOn((<any>component), 'loadAllUsers')
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		const req2 = httpMock.expectOne(environment.apiServer + '/departments?type=list', 'call to list')
		expect(req2.request.method).toBe('GET')
		req2.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url + '/2', 'call to put')
		expect(req.request.method).toBe('PUT')
		req.flush(null)
		httpMock.verify()
		expect(component.users[2]).toBeUndefined()
	})

	it('#onSubmit (edit) should edit', () => {
		const newData: User = {
			id: 2,
			username: 'prueba',
			password: 'kfdjgldkgj',
			nombre: 'kfdjgldkgj',
			apellido: 'kfdjgldkgj',
			email: 'kfdjgldkgj',
			activo: true,
			creado: 'kfdjgldkgj',
			modificado: new Date(),
			ultimo_acceso: new Date(),
			puntaje: 0,
			rol_id: 1,
			file_id: 1,
			rol: 'kfdjgldkgj',
			clients: [],
			departments: []
		}
		const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
		const loadAll = spyOn((<any>component), 'loadAllUsers')
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		const req2 = httpMock.expectOne(environment.apiServer + '/departments?type=list', 'call to list')
		expect(req2.request.method).toBe('GET')
		req2.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url + '/2', 'call to put')
		expect(req.request.method).toBe('PUT')
		req.flush(1, mockErrorResponse)
		httpMock.verify()
		expect(component.users[2]).toBeUndefined()
	})
	it('#onUploadSuccess', () => {
		const e = [{ id: 1 }, { id: 2 },]
		component.onUploadError(e)
		component.onUploadSuccess(e)
		expect(component.model.file_id).toEqual(2)
	})
})
