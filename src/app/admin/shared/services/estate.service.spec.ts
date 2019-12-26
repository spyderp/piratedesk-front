import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Estate } from '../models'
import { EstateService } from './estate.service';
import { environment } from '../../../../environments/environment'

describe('EstateService', () => {
	let service: EstateService
	let httpMock: HttpTestingController
	const url = environment.apiServer
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [EstateService],
			imports: [HttpClientTestingModule],
		});
		service = TestBed.get(EstateService)
		httpMock = TestBed.get(HttpTestingController)
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	})

	it('should return expected Estate get all', () => {
		const expectReturn: Estate[] = [
			{
				id: 1,
				descripcion: 'dsfdsf',
			},
			{
				id: 2,
				descripcion: 'dsfdsf'
			},
		]
		service.getAll().subscribe(states => {
			expect(states).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/states', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})


	it('should return expected Estate get by id', () => {
		const expectReturn: Estate = {
			id: 1,
			descripcion: 'dsfdsf',
		}


		service.getById(1).subscribe(states => {
			expect(states).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/states/1', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Estate post', () => {
		const newData = {
			descripcion: 'dsfdsf',
		}

		const expectReturn: Estate = {
			id: 1,
			descripcion: 'dsfdsf',
		}

		service.create(newData).subscribe(states => {
			expect(states).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/states', 'call to post api')
		expect(req.request.method).toBe('POST')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Estate put', () => {
		const newData: Estate = {
			id: 1,
			descripcion: '32424323',
		}

		const expectReturn: Estate = {
			id: 1,
			descripcion: '32424323',
		}

		service.update(newData).subscribe(states => {
			expect(states).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/states/1', 'call to post api')
		expect(req.request.method).toBe('PUT')
		req.flush(expectReturn)
		httpMock.verify()
	})
	it('should return expected Estate delete', () => {
		service.delete(1).subscribe(reponse => {
			expect(reponse).toEqual(3, 'is equal')
		})
		const req = httpMock.expectOne(url + '/states/1', 'call to post api')
		expect(req.request.method).toBe('DELETE')
		req.flush(3)
		httpMock.verify()
	})
})
