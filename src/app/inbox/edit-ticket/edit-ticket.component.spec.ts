import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTicketComponent } from './edit-ticket.component';
import { ClientService } from '../../admin/shared/services/client.service';
import { DepartmentService } from '../../admin/shared/services/department.service';
import { PriorityService } from '../../admin/shared/services/priority.service';
import { TicketService } from '../shared/services/ticket.service';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { QuillModule, QuillEditorComponent } from 'ngx-quill';
import { EstateService } from '../../admin/shared/services/estate.service';
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';

class MockEstateService {
	getAll() {
		return of( [
			{ id: 1, descripcion: 'Normal'}
		])
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

class ToastrServiceStub {
	success(msg: string) {
		return true
	}

	error(msg: string) {
		return true
	}
}

class TicketServiceMock {
	update(data) {
		return of(data)
	}

	getByid(id: number) {
		return of({
			id: 1,
			titulo: 'fdglkdlfgk',
			content: 'fdglkdlfgk',
			keys: 'fdglkdlfgk',
			email: 'fdglkdlfgk',
			telefono: 'fdglkdlfgk',
			celular: 'fdglkdlfgk',
			creado: 'fdglkdlfgk',
			modificado: 'fdglkdlfgk',
			clients: 'fdglkdlfgk',
			departments: 'fdglkdlfgk',
			priorities: 'fdglkdlfgk',
			states: 'fdglkdlfgk',
			users: 'fdglkdlfgk',
			client_id: 1,
			department_id: 1,
			state_id: 1,
			user_id: 1,
			priority_id: 1,
			assigments: [],
			files: []
		})
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
		return of( [{id: 1}] )
	}
}






fdescribe('EditTicketComponent', () => {
	let component: EditTicketComponent;
	let fixture: ComponentFixture<EditTicketComponent>;
	let service1: EstateService
	let service2: TicketService
	let initLoad
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EditTicketComponent ],
			imports: [HttpClientTestingModule, FormsModule, ToastrModule, QuillModule.forRoot() ],
			providers: [
				{ provide: ClientService, useClass: ClientServiceStub},
				{ provide: DepartmentService, useClass: DepartmentServiceStub},
				EstateService,
				{ provide: PriorityService, useClass: PriorityServiceStub},
				TicketService,
				{ provide: ToastrService, useClass: ToastrServiceStub },
				{ provide: NgxSmartLoaderService, useClass: NgxSmartLoaderServiceStub },
				{ provide: ActivatedRouteSnapshot, useValue: {paramMap: convertToParamMap({id: 1 })}},
			],
			schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
		})
		.compileComponents();
		service1 = TestBed.get(EstateService)
		service2 = TestBed.get(TicketService)
		initLoad = () => {
			spyOn(service1, 'getAll').and.returnValue(of([{id: 1}]))
			spyOn(service2, 'getById').and. returnValue(of({
				id: 1,
				titulo: 'fdglkdlfgk',
				content: 'fdglkdlfgk',
				keys: 'fdglkdlfgk',
				email: 'fdglkdlfgk',
				telefono: 'fdglkdlfgk',
				celular: 'fdglkdlfgk',
				creado: 'fdglkdlfgk',
				modificado: 'fdglkdlfgk',
				clients: 'fdglkdlfgk',
				departments: { descripcion: 'test' },
			priorities: { descripcion: 'test', id: 1 },
			states: { descripcion: 'test' },
				users: 'fdglkdlfgk',
				client_id: 1,
				department_id: 1,
				state_id: 1,
				user_id: 1,
				priority_id: 1,
				assigments: [],
				files: []
			}))
		}
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EditTicketComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		localStorage.setItem('current.user', JSON.stringify({id: 1, rol_id: 4}))
	});

	afterAll(() => {
		fixture = null
		component = null
	})

	it('should create', () => {
		initLoad()
		expect(component).toBeTruthy()
	})

	it('test method onAssign', () => {
		const patch = spyOn(service2, 'patch').and.returnValues(of([]))
		component.onAssign()
		expect(patch).toHaveBeenCalled()

	})
	it('test method onAssign (error)', () => {
		const patch = spyOn(service2, 'patch').and.returnValues(throwError([]))
		const patchError = spyOn((<any>component).toastrService, 'error')
		component.onAssign()
		expect(patchError).toHaveBeenCalled()
	})
	it('test method onEdit', () => {
		component.onEdit()
		expect(component.formEdit).toBeTruthy()
	})
	it('test method onCancelEdit', () => {
		component.onEdit()
		component.onCancelEdit()
		expect(component.formEdit).toBeFalsy()
	})
	it('test method onSubmit', () => {
		initLoad()
		spyOn(service2, 'update').and. returnValue(of({
			id: 1,
			titulo: 'fdglkdlfgk',
			content: 'fdglkdlfgk',
			keys: 'fdglkdlfgk',
			email: 'fdglkdlfgk',
			telefono: 'fdglkdlfgk',
			celular: 'fdglkdlfgk',
			creado: 'fdglkdlfgk',
			modificado: 'fdglkdlfgk',
			clients: 'fdglkdlfgk',
			departments: { descripcion: 'test' },
			priorities: { descripcion: 'test', id: 1 },
			states: { descripcion: 'test' },
			users: 'fdglkdlfgk',
			client_id: 1,
			department_id: 1,
			state_id: 1,
			user_id: 1,
			priority_id: 1,
			assigments: [],
			files: []
		}))
		component.onEdit()
		component.onSubmit()
		expect(component.formEdit).toBeFalsy()
	})
	it('test method onSubmit', () => {
		const patchError = spyOn((<any>component).toastrService, 'error')
		initLoad()
		spyOn(service2, 'update').and. returnValue(throwError([]))
		component.onEdit()
		component.onSubmit()
		expect(patchError).toHaveBeenCalled()
	})
	it('test method onState', () => {
		spyOn(window, 'confirm').and.returnValue(true)
		const patch = spyOn(service2, 'patch').and.returnValues(of([]))
		const e = new Event('click')
		component.onState(1, e)
		expect(patch).toHaveBeenCalled()
	})
	it('test method onState (error)', () => {
		spyOn(window, 'confirm').and.returnValue(true)
		const patch = spyOn(service2, 'patch').and.returnValues(throwError([]))
		const e = new Event('click')
		component.onState(1, e)
		
		expect(patch).toHaveBeenCalled()
	})
	it('test method onState', () => {
		component.changeState = 3
		spyOn(window, 'confirm').and.returnValue(false)
		const patch = spyOn(service2, 'patch').and.returnValues(of([]))
		const e = new Event('click')
		component.onState(4, e)
		expect(patch).not.toHaveBeenCalled()
	})
	
})
