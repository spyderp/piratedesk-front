import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ClientsComponent } from './clients.component'
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ClientService } from '../shared/services/client.service'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { NgxSmartLoaderService } from 'ngx-smart-loader'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { By } from '@angular/platform-browser'
import { Client } from '../shared/models'
import { environment } from '../../../environments/environment'
import { of } from 'rxjs'
class ToastrServiceStub {
	success(msg: string) {
		return true
	}

	error(msg: string) {
		return true
	}
}
class NgxSmartLoaderServiceStub {
	start(name: string) {
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


describe('ClientsComponent', () => {
	let component: ClientsComponent
	let fixture: ComponentFixture<ClientsComponent>
	let service: ClientService
	let httpMock: HttpTestingController
	const url = environment.apiServer
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ClientsComponent ],
			imports: [FormsModule, HttpClientTestingModule, ToastrModule],
			providers: [
				ClientService,
				{ provide: ToastrService, useClass: ToastrServiceStub },
				{ provide: NgxSmartLoaderService, useClass: NgxSmartLoaderServiceStub },
				{ provide: NgbModal, useClass: MockModalService}
			],
			schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
		})
		.compileComponents()
		service = TestBed.get(ClientService)
		httpMock = TestBed.get(HttpTestingController)
	}))

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientsComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
		
	})

	afterAll(() => {
		service = null
		httpMock = null
		fixture = null
	})
	it('should be created', () => {
		expect(component).toBeTruthy()
	})

	it('#onLoadForm Should variable (formtitle, formBtnLabel, model and modalReference)', () => {
		const expectReturn: Client[] = [
			{
				id: 1,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
			{
				id: 2,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
		]
		const event = new Event('click')
		const req = httpMock.expectOne(url + '/clients', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		component.onLoadForm(event, 'prueba')
		expect(component.modalReference).toEqual(new MockModalOpen(), 'modalRefereren call')
		expect(component.formTitle).toEqual('Crear departamento', 'change FormTitle')
		expect(component.formBtnLabel).toEqual('Guardar', 'change FormTitle')
		expect(component.model).toEqual(new Client(), 'change FormTitle')
		expect(component.loading).toBe(false, 'false after click')
		expect(component.clients).toEqual(expectReturn, 'data change after click')
	})

	it('#onDelete should', () => {
		const expectReturn: Client[] = [
			{
				id: 1,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
			{
				id: 2,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
		]
		const event = new Event('click')
		let req = httpMock.expectOne(url + '/clients', 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		const e = [{ id: 1 }]
		component.onDelete(e)
		req = httpMock.expectOne(url + '/clients/1', 'call to DELETE')
		expect(req.request.method).toBe('DELETE')
		req.flush(3)
		httpMock.verify()
		expect(component.clients[0]).toBeUndefined()
	})

	it('#onDelete should error', () => {
		const expectReturn: Client[] = [
			{
				id: 1,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
			{
				id: 2,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
		]
		const event = new Event('click')
		const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
		let req = httpMock.expectOne(url + '/clients', 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		const e = [{ id: 1 }]
		component.onDelete(e)
		req = httpMock.expectOne(url + '/clients/1', 'call to DELETE')
		expect(req.request.method).toBe('DELETE')
		req.flush(3, mockErrorResponse)
		httpMock.verify()
	})


	it('#onEdit should', () => {
		const expectReturn: Client[] = [
			{
				id: 1,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
			{
				id: 2,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
		]
		const req = httpMock.expectOne(url + '/clients', 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		const e = [{ id: 1 }]
		component.onEdit(e, 'editar')
		expect(component.modalReference).toEqual(new MockModalOpen(), 'modalRefereren call')
		expect(component.formTitle).toEqual('Editar departamento', 'change FormTitle')
		expect(component.formBtnLabel).toEqual('Actualizar', 'change formBtnLabel')
		expect(component.model).toEqual(expectReturn[0], 'equal model')
	})
	
	
	it('#onSubmit (create) should', () => {
		const expectReturn: Client[] = [
			{
				id: 1,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
			{
				id: 2,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
		]
		const newData: any = {
			nombre: 'RICARDO PORTILLO',
			direccion: 'dsfdsf',
			telefono: '2666055',
			celular: '62334384',
			email: 'dsfdsf'
		}
		let req = httpMock.expectOne(url + '/clients', 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url + '/clients', 'call to post')
		expect(req.request.method).toBe('POST')
		req.flush({
			id: 3,
			nombre: 'RICARDO PORTILLO',
			direccion: 'dsfdsf',
			telefono: '2666055',
			celular: '62334384',
			email: 'dsfdsf'
		})
		httpMock.verify()
		expect(component.clients[2]).toBeTruthy()
		expect(component.clients[2].nombre).toEqual('RICARDO PORTILLO')
	})
	

	it('#onSubmit (create) should null data', () => {
		const expectReturn: Client[] = [
			{
				id: 1,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
			{
				id: 2,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
		]
		const newData: any = {
			nombre: 'RICARDO PORTILLO',
			direccion: 'dsfdsf',
			telefono: '2666055',
			celular: '62334384',
			email: 'dsfdsf'
		}
		let req = httpMock.expectOne(url + '/clients', 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url + '/clients', 'call to post')
		expect(req.request.method).toBe('POST')
		req.flush(null)
		httpMock.verify()
		expect(component.clients[2]).toBeUndefined()
	})

	it('#onSubmit (create) should error', () => {
		const expectReturn: Client[] = [
			{
				id: 1,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
			{
				id: 2,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
		]
		const newData: any = {
			nombre: 'RICARDO PORTILLO',
			direccion: 'dsfdsf',
			telefono: '2666055',
			celular: '62334384',
			email: 'dsfdsf'
		}
		const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
		let req = httpMock.expectOne(url + '/clients', 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url + '/clients', 'call to post')
		expect(req.request.method).toBe('POST')
		req.flush(1, mockErrorResponse)
		httpMock.verify()
		expect(component.clients[2]).toBeUndefined()
	})

	it('#onSubmit (edit) should', () => {
		const expectReturn: Client[] = [
			{
				id: 1,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
			{
				id: 2,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
		]
		const newData: Client = {
			id: 2,
			nombre: 'RICARDO PORTILLO',
			direccion: 'dsfdsf',
			telefono: '2666055',
			celular: '62334384',
			email: 'dsfdsf'
		}
		const loadAll = spyOn((<any>component), 'loadAll')
		let req = httpMock.expectOne(url + '/clients', 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url + '/clients/2', 'call to post')
		expect(req.request.method).toBe('PUT')
		req.flush({id: 2})
		httpMock.verify()
		expect(loadAll).toHaveBeenCalled()
	})
	

	it('#onSubmit (edit) should null data', () => {
		const expectReturn: Client[] = [
			{
				id: 1,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
			{
				id: 2,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
		]
		const newData: Client = {
			id: 2,
			nombre: 'RICARDO PORTILLO',
			direccion: 'dsfdsf',
			telefono: '2666055',
			celular: '62334384',
			email: 'dsfdsf'
		}
		let req = httpMock.expectOne(url + '/clients', 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url + '/clients/2', 'call to post')
		expect(req.request.method).toBe('PUT')
		req.flush(null)
		httpMock.verify()
		expect(component.clients[2]).toBeUndefined()
	})

	it('#onSubmit (edit) should error', () => {
		const expectReturn: Client[] = [
			{
				id: 1,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
			{
				id: 2,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			},
		]
		const newData: Client = {
			id: 2,
			nombre: 'RICARDO PORTILLO',
			direccion: 'dsfdsf',
			telefono: '2666055',
			celular: '62334384',
			email: 'dsfdsf'
		}
		const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
		let req = httpMock.expectOne(url + '/clients', 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url + '/clients/2', 'call to post')
		expect(req.request.method).toBe('PUT')
		req.flush(1, mockErrorResponse)
		httpMock.verify()
		expect(component.clients[2]).toBeUndefined()
	})
})
