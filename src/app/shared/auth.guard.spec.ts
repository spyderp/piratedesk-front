import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { HttpClientModule } from '@angular/common/http'
import { ToastrService, ToastrModule } from 'ngx-toastr'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'

class AuthServiceStub {
	token = true
	user = {
		role: 'admin'
	}
	getExpired() {
		return false
	}
	getToken() {
		return this.token
	}
	getUser() {
		return this.user
	}
	setTokken(data) {
		this.token = data
	}
	setUser(data) {
		this.user = data
	}
}

class AuthServiceStub2 {
	token = false
	user = {
	}
	getExpired() {
		return true
	}
	getToken() {
		return true
	}
	getUser() {
		return this.user
	}
	setTokken(data) {
		this.token = data
	}
	setUser(data) {
		this.user = data
	}
	getRefresh() {
		return true
	}
}

class AuthServiceStub3 {
	token = false
	user = {
	}
	getExpired() {
		return true
	}
	getToken() {
		return false
	}
	getUser() {
		return this.user
	}
	setTokken(data) {
		this.token = data
	}
	setUser(data) {
		this.user = data
	}
	getRefresh() {
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
	info(msg: string) {
		return true
	}
}


describe('AuthGuard', () => {
	const routeMock: any = { snapshot: {}, data: {roles: ['admin']} }
	const routeStateMock: any = { snapshot: {}, url: '/inbox', }
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule, ToastrModule.forRoot(), RouterTestingModule],
			providers: [
				AuthGuard,
				{ provide: AuthService, useClass: AuthServiceStub},
				{ provide: ToastrService, useClass: ToastrServiceStub}],
		})
	})

	it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
		expect(guard).toBeTruthy()
	}))

	it('should canActive, navigate', inject([AuthGuard], (guard: AuthGuard) => {
		expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
	}))

})


describe('AuthGuard', () => {
	const routeMock: any = { snapshot: {}, data: {roles: ['admin']} }
	const routeStateMock: any = { snapshot: {}, url: '/inbox', }
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule, ToastrModule.forRoot(), RouterTestingModule],
			providers: [
				AuthGuard,
				{ provide: AuthService, useClass: AuthServiceStub2},
				{ provide: ToastrService, useClass: ToastrServiceStub}],
		})
	})

	it('should canActive, navigate', inject([AuthGuard], (guard: AuthGuard) => {
		expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
	}))

})


describe('AuthGuard', () => {
	const routeMock: any = { snapshot: {}, data: {roles: ['admin']} }
	const routeStateMock: any = { snapshot: {}, url: '/inbox', }
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule, ToastrModule.forRoot(), RouterTestingModule],
			providers: [
				AuthGuard,
				{ provide: AuthService, useClass: AuthServiceStub3},
				{ provide: ToastrService, useClass: ToastrServiceStub}],
		})
	})

	it('should canActive, navigate', inject([AuthGuard], (guard: AuthGuard) => {
		expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
	}))

})