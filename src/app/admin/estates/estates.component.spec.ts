import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatesComponent } from './estates.component';
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { NgxSmartLoaderService } from 'ngx-smart-loader'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { DepartmentService } from '../shared/services/department.service';
import { Estate } from '../shared/models';
import { environment } from '../../../environments/environment'
import { EstateService } from '../shared/services/estate.service';


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


describe('EstatesComponent', () => {
	let component: EstatesComponent;
	let fixture: ComponentFixture<EstatesComponent>;
	let service: EstateService
	let httpMock: HttpTestingController
	const url = environment.apiServer + '/states'
	const expectReturn: Estate[] = [
		{
			id: 1,
			descripcion: 'dfjsjdkf'
		},
		{
			id: 2,
			descripcion: 'fdgdgdfj'
		},
	]
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EstatesComponent ],
			imports: [FormsModule, HttpClientTestingModule, ToastrModule],
			providers: [
				EstateService,
				{ provide: ToastrService, useClass: ToastrServiceStub },
				{ provide: NgxSmartLoaderService, useClass: NgxSmartLoaderServiceStub },
				{ provide: NgbModal, useClass: MockModalService}
			],
			schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
		})
		.compileComponents();
		service = TestBed.get(EstateService)
		httpMock = TestBed.get(HttpTestingController)
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EstatesComponent);
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
		expect(component.formTitle).toEqual('Crear Estado', 'change FormTitle')
		expect(component.formBtnLabel).toEqual('Guardar', 'change FormTitle')
		expect(component.model).toEqual(new Estate(), 'change FormTitle')
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
		expect(component.formTitle).toEqual('Editar Estado', 'change FormTitle')
		expect(component.formBtnLabel).toEqual('Actualizar', 'change formBtnLabel')
		expect(component.model).toEqual(expectReturn[0], 'equal model')
	})

	it('#onSubmit (create) should', () => {
		const newData: any = {
			descripcion: 'nuevo'
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
			descripcion: 'nuevo'
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
			descripcion: 'nuevo'
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
		const newData: Estate = {
			id: 2,
			descripcion: 'nuevo'
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
		const newData: Estate = {
			id: 2,
			descripcion: 'nuevo'
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
		const newData: Estate = {
			id: 2,
			descripcion: 'nuevo'
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
