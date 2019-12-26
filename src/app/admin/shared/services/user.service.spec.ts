import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models';
import { environment } from '../../../../environments/environment'

describe('UserService', () => {
	let service: UserService
	let httpMock: HttpTestingController
	const url = environment.apiServer
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [UserService],
			imports: [HttpClientTestingModule],
		})
		service = TestBed.get(UserService)
		httpMock = TestBed.get(HttpTestingController)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})

	it('should return expected User get all', () => {
		const expectReturn: User[] = [
			{
				id: 1,
				username: 'kfdjgldkgj',
				password: 'kfdjgldkgj',
				nombre: 'kfdjgldkgj',
				apellido: 'kfdjgldkgj',
				email: 'kfdjgldkgj',
				activo: true,
				creado: 'kfdjgldkgj',
				modificado:  new Date(),
				ultimo_acceso:  new Date(),
				puntaje: 0,
				rol_id: 1,
				file_id: 1,
				rol: 'kfdjgldkgj',
				clients: [],
				departments: []
			},
			{
				id: 1,
				username: 'kfdjgldkgj',
				password: 'kfdjgldkgj',
				nombre: 'kfdjgldkgj',
				apellido: 'kfdjgldkgj',
				email: 'kfdjgldkgj',
				activo: true,
				creado: 'kfdjgldkgj',
				modificado: new Date,
				ultimo_acceso: new Date,
				puntaje: 0,
				rol_id: 1,
				file_id: 1,
				rol: 'kfdjgldkgj',
				clients: [],
				departments: []
			},
		]
		service.getAll().subscribe(users => {
			expect(users).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/users', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected User get associons', () => {
		const expectReturn: User[] = [
			{
				id: 1,
				username: 'kfdjgldkgj',
				password: 'kfdjgldkgj',
				nombre: 'kfdjgldkgj',
				apellido: 'kfdjgldkgj',
				email: 'kfdjgldkgj',
				activo: true,
				creado: 'kfdjgldkgj',
				modificado: new Date(),
				ultimo_acceso: new Date(),
				puntaje: 0,
				rol_id: 1,
				file_id: 1,
				rol: 'kfdjgldkgj',
				clients: [],
				departments: []
			},
			{
				id: 1,
				username: 'kfdjgldkgj',
				password: 'kfdjgldkgj',
				nombre: 'kfdjgldkgj',
				apellido: 'kfdjgldkgj',
				email: 'kfdjgldkgj',
				activo: true,
				creado: 'kfdjgldkgj',
				modificado: new Date,
				ultimo_acceso: new Date,
				puntaje: 0,
				rol_id: 1,
				file_id: 1,
				rol: 'kfdjgldkgj',
				clients: [],
				departments: []
			},
		]
		service.associations().subscribe(users => {
			expect(users).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/departments?type=list', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})


	it('should return expected User get by id', () => {
		const expectReturn: User = {
			id: 1,
			username: 'kfdjgldkgj',
				password: 'kfdjgldkgj',
				nombre: 'kfdjgldkgj',
				apellido: 'kfdjgldkgj',
				email: 'kfdjgldkgj',
				activo: true,
				creado: 'kfdjgldkgj',
				modificado:  new Date(),
				ultimo_acceso:  new Date(),
				puntaje: 0,
				rol_id: 1,
				file_id: 1,
				rol: 'kfdjgldkgj',
				clients: [],
				departments: []
		}


		service.getById(1).subscribe(users => {
			expect(users).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/users/1', 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected User post', () => {
		const newData = {
			username: 'kfdjgldkgj',
				password: 'kfdjgldkgj',
				nombre: 'kfdjgldkgj',
				apellido: 'kfdjgldkgj',
				email: 'kfdjgldkgj',
				activo: true,
				creado: 'kfdjgldkgj',
				modificado:  new Date(),
				ultimo_acceso:  new Date(),
				puntaje: 0,
				rol_id: 1,
				file_id: 1,
				rol: 'kfdjgldkgj',
				clients: [],
				departments: []
		}

		const expectReturn: User = {
			id: 1,
			username: 'kfdjgldkgj',
				password: 'kfdjgldkgj',
				nombre: 'kfdjgldkgj',
				apellido: 'kfdjgldkgj',
				email: 'kfdjgldkgj',
				activo: true,
				creado: 'kfdjgldkgj',
				modificado:  new Date(),
				ultimo_acceso:  new Date(),
				puntaje: 0,
				rol_id: 1,
				file_id: 1,
				rol: 'kfdjgldkgj',
				clients: [],
				departments: []
		}

		service.create(newData).subscribe(users => {
			expect(users).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/users', 'call to post api')
		expect(req.request.method).toBe('POST')
		req.flush(expectReturn)
		httpMock.verify()
	})

	it('should return expected User put', () => {
		const newData: User = {
			id: 1,
			username: 'kfdjgldkgj',
				password: 'kfdjgldkgj',
				nombre: 'kfdjgldkgj',
				apellido: 'kfdjgldkgj',
				email: 'kfdjgldkgj',
				activo: true,
				creado: 'kfdjgldkgj',
				modificado:  new Date(),
				ultimo_acceso:  new Date(),
				puntaje: 0,
				rol_id: 1,
				file_id: 1,
				rol: 'kfdjgldkgj',
				clients: [],
				departments: []
		}

		const expectReturn: User = {
			id: 1,
			username: 'kfdjgldkgj',
				password: 'kfdjgldkgj',
				nombre: 'kfdjgldkgj',
				apellido: 'kfdjgldkgj',
				email: 'kfdjgldkgj',
				activo: true,
				creado: 'kfdjgldkgj',
				modificado:  new Date(),
				ultimo_acceso:  new Date(),
				puntaje: 0,
				rol_id: 1,
				file_id: 1,
				rol: 'kfdjgldkgj',
				clients: [],
				departments: []
		}

		service.update(newData).subscribe(users => {
			expect(users).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/users/1', 'call to post api')
		expect(req.request.method).toBe('PUT')
		req.flush(expectReturn)
		httpMock.verify()
	})
	it('should return expected User delete', () => {

		service.delete(1).subscribe(reponse => {
			expect(reponse).toEqual(3, 'is equal')
		})
		const req = httpMock.expectOne(url + '/users/1', 'call to post api')
		expect(req.request.method).toBe('DELETE')
		req.flush(3)
		httpMock.verify()
	})

	it('should return expected User patch', () => {
		const newData = {
			nombre: 'kfdjgldkgj',
			apellido: 'kfdjgldkgj',
			email: 'kfdjgldkgj',
			activo: true,
		}

		const expectReturn: User = {
			id: 1,
			username: 'kfdjgldkgj',
			password: 'kfdjgldkgj',
			nombre: 'kfdjgldkgj',
			apellido: 'kfdjgldkgj',
			email: 'kfdjgldkgj',
			activo: true,
			creado: 'kfdjgldkgj',
			modificado: new Date(),
			ultimo_acceso: new Date(),
			puntaje: 0,
			rol_id: 1,
			file_id: 1,
			rol: 'kfdjgldkgj',
			clients: [],
			departments: []
		}

		service.patch(1, newData).subscribe(users => {
			expect(users).toEqual(expectReturn, 'is equal')
		})
		const req = httpMock.expectOne(url + '/users/1', 'call to post api')
		expect(req.request.method).toBe('PATCH')
		req.flush(expectReturn)
		httpMock.verify()
	})
})
