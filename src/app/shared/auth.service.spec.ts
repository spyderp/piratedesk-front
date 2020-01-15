import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('AuthService', () => {
	let service: AuthService
	let httpMock: HttpTestingController
	const url = environment.apiServer
	beforeEach(() => {
		TestBed.configureTestingModule({
		imports: [HttpClientTestingModule],
		providers: [AuthService]
	})
		service = TestBed.get(AuthService)
		httpMock = TestBed.get(HttpTestingController)
	})

	it('should be created', () => {
		expect(service).toBeTruthy()
	})
	it('getUser', () => {
		localStorage.setItem('current.user', '1010');
		const result = service.getUser()
		expect(result).toEqual('1010')
	})

	it('getRefresh', () => {
		const now = (Date.now() / 1000) + 10000
		service.getRefresh()
		const req = httpMock.expectOne(url + '/token/refresh', 'call to api')
		expect(req.request.method).toBe('POST')
		req.flush({
			access_token: 'prueba',
			expired_token: 10000
		})
		httpMock.verify()
		const result = service.getToken()
		expect(result).toEqual('prueba')
	})

	it('getExpired', () => {
		const now = (Date.now() / 1000) - 500
		localStorage.setItem('current.expired', now.toString());
		const result = service.getExpired()
		expect(result).toBeTruthy
	})
	it('logout', () => {
		service.logout()
		let req = httpMock.expectOne(url + '/logout/access', 'call to api')
		expect(req.request.method).toBe('POST')
		req.flush({})
		req = httpMock.expectOne(url + '/logout/refresh', 'call to api')
		expect(req.request.method).toBe('POST')
		req.flush({})
		httpMock.verify()
		expect(localStorage.getItem('token')).toBeNull()
	})
	it('login', () => {
		service.login('test', 'test').subscribe((data) => {
			expect(data.access_token).toEqual('prueba')
		})
		const req = httpMock.expectOne(url + '/login', 'call to api')
		expect(req.request.method).toBe('POST')
		req.flush({
			user: {username: 'test'},
			refresh_token: 'test',
			access_token: 'prueba',
			expired_token: 10000
		})
		httpMock.verify()
	})

	it('forgot', () => {
		service.forgot('spyderp@gmail.com').subscribe((data) => {
			expect(data).toBeTruthy()
		})
		const req = httpMock.expectOne(url + '/reset/password', 'call to api')
		expect(req.request.method).toBe('POST')
		req.flush(1)
		httpMock.verify()
	})
	it('reset', () => {
		const token  = 'sjkdhfjksfhsj23k4'
		service.reset(token).subscribe((data) => {
			expect(data).toBeTruthy()
		})
		const req = httpMock.expectOne(url + '/reset/token/' + token, 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(1)
		httpMock.verify()
	})
})
