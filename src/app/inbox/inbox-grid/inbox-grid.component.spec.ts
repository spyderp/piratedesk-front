import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { InboxGridComponent } from './inbox-grid.component'
import { DepartmentService } from '../../admin/shared/services/department.service'
import { EstateService } from '../../admin/shared/services/estate.service'
import { TicketService } from '../shared/services/ticket.service'
import { Router } from '@angular/router'
import { RouterStub } from '../../core/forgot-password/activated-route-stub'
import { environment } from '../../../environments/environment'
import { FormsModule } from '@angular/forms'
import { Filter } from '../shared/models'
import { on } from 'cluster'
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

describe('InboxGridComponent', () => {
	let component: InboxGridComponent
	let fixture: ComponentFixture<InboxGridComponent>
	let httpMock: HttpTestingController
	let service1: TicketService
	let service2: DepartmentService
	let service3: EstateService
	let callInit
	const url = environment.apiServer
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InboxGridComponent ],
			imports: [ HttpClientTestingModule, FormsModule, NgbModule],
			providers: [
				DepartmentService,
				EstateService,
				TicketService,
				{ provide: NgbModal, useClass: MockModalService},
				{ provide: Router, useClass: RouterStub}
			],
			schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
		})
		.compileComponents()
		httpMock = TestBed.get(HttpTestingController)
		service1 = TestBed.get(TicketService)
		service2 = TestBed.get(DepartmentService)
		service3 = TestBed.get(EstateService)
		callInit = () =>  {
				const req = httpMock.expectOne(url + '/tickets', 'call to ticket')
			expect(req.request.method).toBe('GET')
			req.flush([
				{
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
					files: [],
				},
				{
					id: 2,
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
					files: [],
				}
			])
			const req2 = httpMock.expectOne(url + '/departments?type=list', 'call to deparment')
			req2.flush([
				{
					id: 1,
					descripcion: 'hola mnundo'
				},
				{
					id: 2,
					descripcion: 'hola mnundo2'
				}
			])
			const req3 = httpMock.expectOne(url + '/states', 'call to estates')
			req3.flush([
				{
					id: 1,
					descripcion: 'bueno'
				},
				{
					id: 2,
					descripcion: 'malo'
				}
			])
			httpMock.verify()
		}
	}))

	beforeEach(() => {
		fixture = TestBed.createComponent(InboxGridComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		callInit()
		expect(component).toBeTruthy()
	})
	it('test method getRowClass', () => {
		let result = component.getRowClass({priorities: {id: 2}})
		expect(result).toEqual('row-info')
		result = component.getRowClass({priorities: {id: 3}})
		expect(result).toEqual('row-warning')
		result = component.getRowClass({priorities: {id: 4}})
		expect(result).toEqual('row-orange')
		result = component.getRowClass({priorities: {id: 5}})
		expect(result).toEqual('row-danger')
	})

	it('test method sortDate', () => {
		let result = component.sortDate('2020-01-01', '2019-01-01', 0, 0, 0)
		expect(result).toEqual(-1)
		result = component.sortDate('2019-01-01', '2020-01-01', 0, 0, 0)
		expect(result).toEqual(1)
		result = component.sortDate('2020-01-01', '2020-01-01', 0, 0, 0)
		expect(result).toEqual(0)
	})
	it('test method modal open', () => {
		const event = new Event('click')
		component.onAdd('prueba')
		expect(component.modalReference).toEqual(new MockModalOpen(), 'modalRefereren call')
		component.onClose(event)
	})

	it('test method checked', () => {
		component.onCheck({target: { checked: true, value: 1}})
		expect(component.model.prioridad.length).toBeGreaterThan(0)
		component.onCheck({target: { checked: false, value: 1}})
		expect(component.model.prioridad.length).toEqual(1)
	})

	it('test method reset', () => {
		callInit()
		component.onReset('lala')
		expect(component.model).toEqual(new Filter)
		expect(component.tickets).toEqual(component.temp)
	})
	it('test method select', () => {
		let data: any = [{id: 1}]
		component.selected = data
		component.onSelect(data)
		expect(component.isEdit).toEqual(true)
		expect(component.isDel).toEqual(true)
		data = [{id: 1}, {id: 2}]
		component.selected = data
		component.onSelect(data)
		expect(component.isEdit).toEqual(false)
		expect(component.isDel).toEqual(true)
		data = []
		component.selected = data
		component.onSelect(data)
		expect(component.isEdit).toEqual(false)
		expect(component.isDel).toEqual(false)
	})
	it('test method onEdit', () => {
		component.onEdit(1)
		expect(component.isEdit).toEqual(false)
	})
	it('test method onDel', () => {
		callInit()
		spyOn(window, 'confirm').and.returnValue(true)
		component.selected = [{id: 2}]
		component.onDel()
		const req = httpMock.expectOne(url + '/tickets/2', 'call to deparment')
		expect(req.request.method).toBe('DELETE')
		req.flush([])
		httpMock.verify()
		expect(component.tickets[1]).toBeUndefined()
	})
	it('test method onDel multiple data', () => {
		callInit()
		spyOn(window, 'confirm').and.returnValue(true)
		component.selected = [{id: 1}, {id: 2}]
		component.onDel()
		let req = httpMock.expectOne(url + '/tickets/1', 'call to deparment')
		expect(req.request.method).toBe('DELETE')
		req.flush([])
		req = httpMock.expectOne(url + '/tickets/2', 'call to deparment')
		expect(req.request.method).toBe('DELETE')
		req.flush([])
		httpMock.verify()
		expect(component.tickets[1]).toBeUndefined()
	})
	it('test method onUpdate', () => {
		const event = new Event('click')
		const loadAll = spyOn(component, 'loadAll')
		component.onAdd('test')
		component.onUpdate(event)
		callInit()
		expect(loadAll).toHaveBeenCalled()
	})

	it('test method onfilter', () => {
		callInit()
		component.model.descripcion = 'kldsjfklsjfksdfj'
		component.onFilter()
		const req = httpMock.expectOne(url + '/tickets?find={"prioridad":[],"descripcion":"kldsjfklsjfksdfj"}', 'call to tickets')
		expect(req.request.method).toBe('GET')
		req.flush([])
		httpMock.verify()
		expect(component.tickets).toEqual([])
	})
})
