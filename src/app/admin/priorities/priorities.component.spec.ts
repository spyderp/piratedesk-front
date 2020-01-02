import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritiesComponent } from './priorities.component';
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { NgxSmartLoaderService } from 'ngx-smart-loader'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'

import { environment } from '../../../environments/environment'
import { PriorityService } from '../shared/services/priority.service';
import { Priority } from '../shared/models';

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
describe('PrioritiesComponent', () => {
	let component: PrioritiesComponent;
	let fixture: ComponentFixture<PrioritiesComponent>;
	let service: PriorityService
	let httpMock: HttpTestingController
	const url = environment.apiServer + '/priorities'
	const expectReturn: Priority[] = [
		{
			id: 1,
			descripcion: 'dfjsjdkf',
			respuesta: 0,
			resuelto: 0,
			escalable: 0
		},
		{
			id: 2,
			descripcion: 'fdgdgdfj',
			respuesta: 0,
			resuelto: 0,
			escalable: 0
		},
	]
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ PrioritiesComponent ],
			imports: [FormsModule, HttpClientTestingModule, ToastrModule],
			providers: [
				PriorityService,
				{ provide: ToastrService, useClass: ToastrServiceStub },
				{ provide: NgxSmartLoaderService, useClass: NgxSmartLoaderServiceStub },
				{ provide: NgbModal, useClass: MockModalService }
			],
			schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
		})
		.compileComponents()
		service = TestBed.get(PriorityService)
		httpMock = TestBed.get(HttpTestingController)
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PrioritiesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	})

	afterAll(() => {
		service = null
		httpMock = null
		fixture = null
	})

	it('should create', () => {
		expect(component).toBeTruthy();
	})

	it('#onLoadForm ', () => {
		const event = new Event('click')
		component.onLoadForm(event, 'prueba')
		expect(component.modalReference).toEqual(new MockModalOpen(), 'modalRefereren call')
		expect(component.formTitle).toEqual('Crear Prioridad', 'change FormTitle')
		expect(component.formBtnLabel).toEqual('Guardar', 'change FormTitle')
		expect(component.model).toEqual(new Priority(), 'change FormTitle')
	})

	it('#onDelete should', () => {
		const event = new Event('click')
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		const e = [{ id: 1 }]
		component.onDelete(e)
		req = httpMock.expectOne(url + '/1', 'call to DELETE')
		expect(req.request.method).toBe('DELETE')
		req.flush(3)
		httpMock.verify()
		expect(component.rowsData[0]).toBeUndefined()
	})

	it('#onDelete should error', () => {
		const event = new Event('click')
		const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		const e = [{ id: 1 }]
		component.onDelete(e)
		req = httpMock.expectOne(url + '/1', 'call to DELETE')
		expect(req.request.method).toBe('DELETE')
		req.flush(3, mockErrorResponse)
		httpMock.verify()
		expect(component.rowsData).toEqual(expectReturn)
	})

	it('#onEdit should', () => {
		const req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		const e = [{ id: 1 }]
		component.onEdit(e, 'editar')
		expect(component.modalReference).toEqual(new MockModalOpen(), 'modalRefereren call')
		expect(component.formTitle).toEqual('Editar Prioridad', 'change FormTitle')
		expect(component.formBtnLabel).toEqual('Actualizar', 'change formBtnLabel')
		expect(component.model).toEqual(expectReturn[0], 'equal model')
	})

	it('#onSubmit (create) should', () => {
		const newData: any = {
			descripcion: 'nuevo',
			respuesta: 0,
			resuelto: 0,
			escalable: 0
		}
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url, 'call to post')
		expect(req.request.method).toBe('POST')
		req.flush({
			id: 3,
			descripcion: 'nuevo'
		})
		httpMock.verify()
		expect(component.rowsData[2]).toBeTruthy()
		expect(component.rowsData[2].descripcion).toEqual('nuevo')
	})

	it('#onSubmit (create) should nulll ', () => {
		const newData: any = {
			descripcion: 'nuevo',
			respuesta: 0,
			resuelto: 0,
			escalable: 0
		}
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url, 'call to post')
		expect(req.request.method).toBe('POST')
		req.flush(null)
		httpMock.verify()
		expect(component.rowsData[2]).toBeUndefined()
	})

	it('#onSubmit (create) should error ', () => {
		const newData: any = {
			descripcion: 'nuevo',
			respuesta: 0,
			resuelto: 0,
			escalable: 0
		}
		const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url, 'call to post')
		expect(req.request.method).toBe('POST')
		req.flush(1, mockErrorResponse)
		httpMock.verify()
		expect(component.rowsData[2]).toBeUndefined()
	})

	it('#onSubmit (edit) should', () => {
		const newData: Priority = {
			id: 2,
			descripcion: 'nuevo',
			respuesta: 0,
			resuelto: 0,
			escalable: 0
		}
		const loadAll = spyOn((<any>component), 'loadAll')
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
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
	const newData: Priority = {
			id: 2,
			descripcion: 'nuevo',
			respuesta: 0,
			resuelto: 0,
			escalable: 0
		}
		const loadAll = spyOn((<any>component), 'loadAll')
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url + '/2', 'call to put')
		expect(req.request.method).toBe('PUT')
		req.flush(null)
		httpMock.verify()
		expect(component.rowsData[2]).toBeUndefined()
	})

	it('#onSubmit (edit) should edit', () => {
	const newData: Priority = {
			id: 2,
			descripcion: 'nuevo',
			respuesta: 0,
			resuelto: 0,
			escalable: 0
		}
		const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
		const loadAll = spyOn((<any>component), 'loadAll')
		let req = httpMock.expectOne(url, 'call to get')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
		component.model = newData
		const e = [{ id: 1 }]
		component.modalReference = new MockModalOpen()
		component.onSubmit()
		req = httpMock.expectOne(url + '/2', 'call to put')
		expect(req.request.method).toBe('PUT')
		req.flush(1, mockErrorResponse)
		httpMock.verify()
		expect(component.rowsData[2]).toBeUndefined()
	})
})
