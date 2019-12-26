import { TestBed, inject,  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientService } from './client.service';
import { Client } from '../models';
import { environment } from '../../../../environments/environment'

describe('ClientService', () => {
	let service: ClientService
	let httpMock: HttpTestingController
	const url = environment.apiServer
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ClientService],
			imports: [HttpClientTestingModule ],
		})
		service = TestBed.get(ClientService)
		httpMock = TestBed.get(HttpTestingController)
	})

	it('should be created', () => {
		expect(service).toBeTruthy();
	})

	it('should return expected Client get all', () => {
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
		service.getAll().subscribe( clients => {
			expect(clients).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/clients', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Client get list', () => {
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
		
		service.getList().subscribe(clients => {
			expect(clients).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/clients?type=list', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()

	})

	it('should return expected Client get by id', () => {
		const expectReturn: Client = {
				id: 1,
				nombre: 'dsfdsf',
				direccion: 'dsfdsf',
				telefono: 'dsfdsf',
				celular: 'dsfdsf',
				email: 'dsfdsf',
			}
		
	
		service.getById(1).subscribe(clients => {
			expect(clients).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/clients/1', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Client post', () => {
		const newData = {
			nombre: 'dsfdsf',
			direccion: 'dsfdsf',
			telefono: 'dsfdsf',
			celular: 'dsfdsf',
			email: 'dsfdsf',
		}

		const expectReturn: Client = {
			id:1,
			nombre: 'dsfdsf',
			direccion: 'dsfdsf',
			telefono: 'dsfdsf',
			celular: 'dsfdsf',
			email: 'dsfdsf',
		}

		service.create(newData).subscribe(clients => {
			expect(clients).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/clients', 'call to post api')
		expect(req.request.method).toBe('POST')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected Client put', () => {
		const newData: Client = {
			id: 1,
			nombre: 'dsfdsf',
			direccion: 'fgddfgdgd',
			telefono: 'dsfdsf',
			celular: 'dsfdsf',
			email: 'dsfdsf',
		}

		const expectReturn: Client = {
			id: 1,
			nombre: 'dsfdsf',
			direccion: 'fgddfgdgd',
			telefono: 'dsfdsf',
			celular: 'dsfdsf',
			email: 'dsfdsf',
		}

		service.update(newData).subscribe(clients => {
			expect(clients).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/clients/1', 'call to post api')
		expect(req.request.method).toBe('PUT')
		req.flush(expectReturn)
		httpMock.verify()
	})
	it('should return expected Client delete', () => {

		service.delete(1).subscribe( reponse => {
			expect(reponse).toEqual(3, 'is equal')
		})
		const req = httpMock.expectOne(url + '/clients/1', 'call to post api')
		expect(req.request.method).toBe('DELETE')
		req.flush(3)
		httpMock.verify()
	})
}) 
