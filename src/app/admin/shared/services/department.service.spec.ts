import { TestBed, inject } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { DepartmentService } from './department.service'
import { Department } from '../models'
import { environment } from '../../../../environments/environment'

describe('departmentservice', () => {
	let service: DepartmentService
	let httpMock: HttpTestingController
	const url = environment.apiServer
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [DepartmentService],
			imports: [HttpClientTestingModule],
		})
		service = TestBed.get(DepartmentService)
		httpMock = TestBed.get(HttpTestingController)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})

	it('should return expected Department get all', () => {
		const expectReturn: Department[] = [
			{
				id: 1,
				descripcion: 'dsfdsf',
			},
			{
				id: 2,
				descripcion: 'dsfdsf'
			},
		]
		service.getAll().subscribe(departments => {
			expect(departments).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/departments', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Department get all page', () => {
		const expectReturn: Department[] = [
			{
				id: 1,
				descripcion: 'dsfdsf',
			},
			{
				id: 2,
				descripcion: 'dsfdsf'
			},
		]
		service.getAll(1).subscribe(departments => {
			expect(departments).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/departments?page=2', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Department get list', () => {
		const expectReturn: Department[] = [
			{
				id: 1,
				descripcion: 'dsfdsf',
			},
			{
				id: 2,
				descripcion: 'dsfdsf'
			},
		]

		service.getList().subscribe(departments => {
			expect(departments).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/departments?type=list', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()

	})

	it('should return expected Department get by id', () => {
		const expectReturn: Department = {
			id: 1,
			descripcion: 'dsfdsf',
		}


		service.getById(1).subscribe(departments => {
			expect(departments).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/departments/1', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Department post', () => {
		const newData = {
			descripcion: 'dsfdsf',
		}

		const expectReturn: Department = {
			id: 1,
			descripcion: 'dsfdsf',
		}

		service.create(newData).subscribe(departments => {
			expect(departments).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/departments', 'call to post api')
		expect(req.request.method).toBe('POST')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Department put', () => {
		const newData: Department = {
			id: 1,
			descripcion: '32424323',
		}

		const expectReturn: Department = {
			id: 1,
			descripcion: '32424323',
		}

		service.update(newData).subscribe(departments => {
			expect(departments).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/departments/1', 'call to post api')
		expect(req.request.method).toBe('PUT')
		req.flush(expectReturn)
		httpMock.verify()
	})
	it('should return expected Department delete', () => {
		service.delete(1).subscribe(reponse => {
			expect(reponse).toEqual(3, 'is equal')
		})
		const req = httpMock.expectOne(url + '/departments/1', 'call to post api')
		expect(req.request.method).toBe('DELETE')
		req.flush(3)
		httpMock.verify()
	})
})
