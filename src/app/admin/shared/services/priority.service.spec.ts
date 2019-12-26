import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PriorityService } from './priority.service';
import { Priority } from '../models'
import { environment } from '../../../../environments/environment'

describe('PriorityService', () => {
	let service: PriorityService
	let httpMock: HttpTestingController
	const url = environment.apiServer
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [PriorityService],
			imports: [HttpClientTestingModule],
		});
		service = TestBed.get(PriorityService)
		httpMock = TestBed.get(HttpTestingController)
	});

	it('should be created', () => {
		expect(service).toBeTruthy()
	})

	it('should return expected Priority get all', () => {
		const expectReturn: Priority[] = [
			{
				id: 1,
				descripcion: '453534',
				respuesta: 2144,
				resuelto: 34,
				escalable: 243,
			},
			{
				id: 2,
				descripcion: '453534',
				respuesta: 2144,
				resuelto: 34,
				escalable: 243,
			},
		]
		service.getAll().subscribe(priorities => {
			expect(priorities).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/priorities', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Priority get list', () => {
		const expectReturn: Priority[] = [
			{
				id: 1,
				descripcion: '453534',
				respuesta: 2144,
				resuelto: 34,
				escalable: 243,
			},
			{
				id: 2,
				descripcion: '453534',
				respuesta: 2144,
				resuelto: 34,
				escalable: 243,
			},
		]
		service.getList().subscribe(priorities => {
			expect(priorities).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/priorities?type=list', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Priority get by id', () => {
		const expectReturn: Priority = {
			id: 1,
			descripcion: '453534',
			respuesta: 2144,
			resuelto: 34,
			escalable: 243,
		}


		service.getById(1).subscribe(priorities => {
			expect(priorities).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/priorities/1', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Priority post', () => {
		const newData = {
			descripcion: '453534',
			respuesta: 2144,
			resuelto: 34,
			escalable: 243,
		}

		const expectReturn: Priority = {
			id: 1,
			descripcion: '453534',
			respuesta: 2144,
			resuelto: 34,
			escalable: 243,
		}

		service.create(newData).subscribe(priorities => {
			expect(priorities).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/priorities', 'call to post api')
		expect(req.request.method).toBe('POST')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Priority put', () => {
		const newData: Priority = {
			id: 1,
			descripcion: '453534',
			respuesta: 2144,
			resuelto: 34,
			escalable: 243,
		}

		const expectReturn: Priority = {
			id: 1,
			descripcion: '453534',
			respuesta: 2144,
			resuelto: 34,
			escalable: 243,
		}

		service.update(newData).subscribe(priorities => {
			expect(priorities).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/priorities/1', 'call to post api')
		expect(req.request.method).toBe('PUT')
		req.flush(expectReturn)
		httpMock.verify()
	})
	it('should return expected Priority delete', () => {
		service.delete(1).subscribe(reponse => {
			expect(reponse).toEqual(3, 'is equal')
		})
		const req = httpMock.expectOne(url + '/priorities/1', 'call to post api')
		expect(req.request.method).toBe('DELETE')
		req.flush(3)
		httpMock.verify()
	})
})
