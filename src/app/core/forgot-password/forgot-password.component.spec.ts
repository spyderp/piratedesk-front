import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ForgotPasswordComponent } from './forgot-password.component'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { AuthService } from '../../shared/auth.service'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { RouterTestingModule } from '@angular/router/testing'

class ToastrServiceStub {
	success(msg: string) {
		return true
	}

	error(msg: string) {
		return true
	}
}

fdescribe('ForgotPasswordComponent', () => {
	let component: ForgotPasswordComponent
	let fixture: ComponentFixture<ForgotPasswordComponent>
	let service: AuthService
	let httpMock: HttpTestingController
	let routerMock: RouterTestingModule
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ForgotPasswordComponent ],
			imports: [FormsModule, HttpClientTestingModule, ToastrModule, RouterTestingModule],
			providers:[
				AuthService,
				{ provide: ToastrService, useClass: ToastrServiceStub },
			],
			schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
		})
		.compileComponents()
		service = TestBed.get(AuthService)
		httpMock = TestBed.get(HttpTestingController)
		routerMock = TestBed.get(RouterTestingModule)
	}))

	beforeEach(() => {
		fixture = TestBed.createComponent(ForgotPasswordComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
