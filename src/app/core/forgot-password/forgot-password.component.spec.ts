import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing'

import { ForgotPasswordComponent } from './forgot-password.component'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { AuthService } from '../../shared/auth.service'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { RouterTestingModule } from '@angular/router/testing'
import { By } from '@angular/platform-browser'
import { environment } from '../../../environments/environment'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { of } from 'rxjs'
import { ActivatedRouteStub } from './activated-route-stub'
import { InboxComponent } from '../../inbox/inbox.component'
class ToastrServiceStub {
	success(msg: string) {
		return true
	}

	error(msg: string) {
		return true
	}
}

describe('ForgotPasswordComponent', () => {
	let component: ForgotPasswordComponent
	let fixture: ComponentFixture<ForgotPasswordComponent>
	let service: AuthService
	let httpMock: HttpTestingController
	let routerMock: ActivatedRoute
	const url = environment.apiServer
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule, HttpClientTestingModule, ToastrModule, RouterTestingModule.withRoutes([
				{ path: 'forgot_password', component: ForgotPasswordComponent},
				{ path: 'inbox', component: ForgotPasswordComponent}
			])],
			providers: [
				AuthService,
				{ provide: ToastrService, useClass: ToastrServiceStub },
			],
			schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
			declarations: [ ForgotPasswordComponent ]
		})
		.compileComponents()
		service = TestBed.get(AuthService)
		httpMock = TestBed.get(HttpTestingController)
		routerMock = TestBed.get(ActivatedRoute)
	}))

	beforeEach(() => {
		fixture = TestBed.createComponent(ForgotPasswordComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})

	it('validate dom form submit', () => {
		const onSubmit = spyOn(component, 'onSubmit')
		const email = fixture.debugElement.query(By.css('#email-forgot'))
		const submitButton = fixture.debugElement.query(By.css('button'))
		email.nativeElement.value = 'prueba'
		submitButton.nativeElement.click()
		expect(component).toBeTruthy()
		expect(onSubmit).toHaveBeenCalled()
	})

	it('validate onSubmit', () => {
		const toast = spyOn((<any>component).toastyService, 'success')
		component.model.email = 'spyderp@gmail.com'
		component.onSubmit()
		const req = httpMock.expectOne(url + '/reset/password', 'call to api')
		expect(req.request.method).toBe('POST')
		req.flush(1)
		httpMock.verify()
		expect(toast).toHaveBeenCalled()
	})

	it('validate onSubmit Error', () => {
		const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
		const toast = spyOn((<any>component).toastyService, 'error')
		component.model.email = 'spyderp@gmail.com'
		component.onSubmit()
		const req = httpMock.expectOne(url + '/reset/password', 'call to api')
		expect(req.request.method).toBe('POST')
		req.flush(1, mockErrorResponse)
		httpMock.verify()
		expect(toast).toHaveBeenCalled()
	}) 
})


describe('ForgotPasswordComponent 2', () => {
	let component: ForgotPasswordComponent
	let fixture: ComponentFixture<ForgotPasswordComponent>
	let service: AuthService
	let httpMock: HttpTestingController
	let routerMock: ActivatedRoute
	const url = environment.apiServer
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule, HttpClientTestingModule, ToastrModule, RouterTestingModule.withRoutes([
				{ path: 'forgot_password', component: ForgotPasswordComponent},
				{ path: 'inbox', component: ForgotPasswordComponent}
			])],
			providers: [
				AuthService,
				{ provide: ToastrService, useClass: ToastrServiceStub },
				{ provide: ActivatedRoute, useValue: { snapshot: { queryParams: { token: 'ljdsfhjks543534'} }} },
			],
			schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
			declarations: [ ForgotPasswordComponent ]
		})
		.compileComponents()
		service = TestBed.get(AuthService)
		httpMock = TestBed.get(HttpTestingController)
		routerMock = TestBed.get(ActivatedRoute)
	}))

	beforeEach(() => {
		fixture = TestBed.createComponent(ForgotPasswordComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})


	it('validate reset token', fakeAsync(() => {
		const token = 'ljdsfhjks543534'
		spyOn(window, 'setTimeout')
		const toast = spyOn((<any>component).toastyService, 'success')
		component.model.email = 'spyderp@gmail.com'
		const req = httpMock.expectOne(url + '/reset/token/' + token, 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(1)
		httpMock.verify()
		expect(toast).toHaveBeenCalled()
		expect(setTimeout).toHaveBeenCalled();
	}))

	it('validate reset token Error', fakeAsync(() => {
		const token = 'ljdsfhjks543534'
		const mockErrorResponse = { status: 400, statusText: 'Bad Request' }
		const toast = spyOn((<any>component).toastyService, 'error')
		component.model.email = 'spyderp@gmail.com'
		const req = httpMock.expectOne(url + '/reset/token/' + token, 'call to api')
		expect(req.request.method).toBe('GET')
		req.flush(1, mockErrorResponse)
		httpMock.verify()
		expect(toast).toHaveBeenCalled()
		
		
	}))
})
