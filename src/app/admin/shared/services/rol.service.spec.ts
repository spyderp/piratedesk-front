import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Rol } from '../models';
import { RolService } from './rol.service';
import { environment } from '../../../../environments/environment'

describe('RolService', () => {
	let service: RolService
	let httpMock: HttpTestingController
	const url = environment.apiServer
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [RolService],
			imports: [HttpClientTestingModule],
		})
		service = TestBed.get(RolService)
		httpMock = TestBed.get(HttpTestingController)
	})

	it('should be created', () => {
		expect(service).toBeTruthy();
	})

	it('should return expected Rol get all', () => {
		const expectReturn: Rol[] = [
			{
				id: 1,
				descripcion: 'dsfdsf',
				privileges: 'dsfdsf',
			},
			{
				id: 2,
				descripcion: 'dsfdsf',
				privileges: 'dsfdsf',
			},
		]
		service.getAll().subscribe(rols => {
			expect(rols).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/rols', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	

	it('should return expected Rol get by id', () => {
		const expectReturn: Rol = {
			id: 1,
			descripcion: 'dsfdsf',
			privileges: 'dsfdsf',
		}


		service.getById(1).subscribe(rols => {
			expect(rols).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/rols/1', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Rol post', () => {
		const newData = {
			descripcion: 'dsfdsf',
			privileges: 'dsfdsf',
		}

		const expectReturn: Rol = {
			id: 1,
			descripcion: 'dsfdsf',
			privileges: 'dsfdsf',
		}

		service.create(newData).subscribe(rols => {
			expect(rols).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/rols', 'call to post api')
		expect(req.request.method).toBe('POST')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Rol put', () => {
		const newData: Rol = {
			id: 1,
			descripcion: 'dsfdsf',
			privileges: 'dsfdsf',
		}

		const expectReturn: Rol = {
			id: 1,
			descripcion: 'dsfdsf',
			privileges: 'dsfdsf',
		}

		service.update(newData).subscribe(rols => {
			expect(rols).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/rols/1', 'call to post api')
		expect(req.request.method).toBe('PUT')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Rol delete', () => {

		service.delete(1).subscribe(reponse => {
			expect(reponse).toEqual(3, 'is equal')
		})
		const req = httpMock.expectOne(url + '/rols/1', 'call to post api')
		expect(req.request.method).toBe('DELETE')
		req.flush(3)
		httpMock.verify()
	})
})
