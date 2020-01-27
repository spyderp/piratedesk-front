import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTicketComponent } from './add-ticket.component';
import { ClientService } from '../../admin/shared/services/client.service';
import { DepartmentService } from '../../admin/shared/services/department.service';
import { PriorityService } from '../../admin/shared/services/priority.service';
import { TicketService } from '../shared/services/ticket.service';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { QuillModule, QuillEditorComponent } from 'ngx-quill';

class NgxSmartLoaderServiceStub {
	start(name: string) {
		return true
	}

	stop(name: string) {
		return true
	}
}

class ToastrServiceStub {
	success(msg: string) {
		return true
	}

	error(msg: string) {
		return true
	}
}
class TicketServiceStub {
	create(data){
		return of(data)
	}
}
class ClientServiceStub {
	getAll() {
		return of([ { 
			id: 2,
			telefono: '2222',
			email: 'kdjfksdfj',
			celular: '45345'
		},
		{
			id: 3,
			telefono: '2222',
			email: 'kdjfksdfj',
			celular: '45345'
		}
	])
	}
}

class DepartmentServiceStub {
	getList() {
		return of([{id: 1}])
	}
}

class PriorityServiceStub {
	getList() {
		return of([{id: 1}])
	}
}
describe('AddTicketComponent', () => {
	let component: AddTicketComponent
	let fixture: ComponentFixture<AddTicketComponent>
	let service1: ClientService
	let service2: DepartmentService
	let service3: PriorityService
	let service4: TicketService
	let httpMock: HttpTestingController
	const url = environment.apiServer
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ AddTicketComponent],
			imports: [HttpClientTestingModule, FormsModule, ToastrModule, QuillModule.forRoot() ],
			providers: [
				{ provide: ClientService, useClass: ClientServiceStub},
				{ provide: DepartmentService, useClass: DepartmentServiceStub},
				{ provide: PriorityService, useClass: PriorityServiceStub},
				{ provide: TicketService, useClass: TicketServiceStub},
				{ provide: ToastrService, useClass: ToastrServiceStub },
				{ provide: NgxSmartLoaderService, useClass: NgxSmartLoaderServiceStub },
			],
			schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
		})
		.compileComponents();
		service1 = TestBed.get(ClientService)
		service2 = TestBed.get(DepartmentService)
		service3= TestBed.get(PriorityService)
		service4 = TestBed.get(TicketService)
		httpMock = TestBed.get(HttpTestingController)
		localStorage.setItem('current.user', JSON.stringify({id: 1}))
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddTicketComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	});

	it('should create', () => {
		expect(component).toBeTruthy()
	})
	it('test method onSubmit', () => {
		const emit = spyOn((<any>component).update, 'emit')
		component.model.titulo = 'hola mundo'
		component.onSubmit()
		expect(emit).toHaveBeenCalled()
	})

	it('test method onSubmit (error)', () => {
		const mockErrorResponse = { status: 400, statusText: 'Bad Request' }
		const toast = spyOn((<any>component).notificationService, 'error')
		spyOn((<any>component).ticketService, 'create').and.returnValue(throwError('error'))
		component.model.titulo = 'hola mundo'
		component.onSubmit()
		expect(toast).toHaveBeenCalled()
	})

	it('test method close', () => {
		const emit = spyOn((<any>component).close, 'emit')
		component.onClose()
		expect(emit).toHaveBeenCalled()
	})
	it('test method onSelectClient', () => {
		component.onSelectClient(2)
		expect(component.model.telefono).toEqual('2222')
		component.onSelectClient(1)
		expect(component.model.telefono).toEqual('')
	})
})
