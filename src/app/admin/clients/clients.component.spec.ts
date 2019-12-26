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
class MockModalService {
	open(object: any) {
		return object
	}

}
fdescribe('ClientsComponent', () => {
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
		expect(component.modalReference).toEqual('prueba', 'modalRefereren call')
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
		let req = httpMock.expectOne(url + '/clients', 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		const e = [{ id: 1 }]
		component.onEdit(e, 'editar')
		expect(component.modalReference).toEqual('editar', 'modalRefereren call')
		expect(component.formTitle).toEqual('Editar departamento', 'change FormTitle')
		expect(component.formBtnLabel).toEqual('Actualizar', 'change formBtnLabel')
		expect(component.model).toEqual(expectReturn[0], 'equal model')
	})
})
