import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../shared/auth.service';
import { ToastrService, ToastrComponentlessModule, ToastrModule } from 'ngx-toastr';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
import { FormsModule } from '@angular/forms'
import { of, Subject } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

class ToastrServiceStub{
	success(msg: string) {
		return true
	}

	error(msg: string) {
		return true
	}
}
class NgxSmartLoaderServiceStub{
	start(name: string) {
		return true
	}

	stop(name: string) {
		return true
	}
}

const activeRouteStub = {
	snapshot: {
		queryParams: {
			returnUrl: false
		}
	}
}

class RouterStub {
	navigate(url: string) { return url }
}
describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LoginComponent ],
			providers: [
				AuthService,
				{ provide: ToastrService, useClass: ToastrServiceStub },
				{ provide: NgxSmartLoaderService, useClass: NgxSmartLoaderServiceStub},
			],
			imports: [
				FormsModule,
				HttpClientModule,
				ToastrModule.forRoot(),
				RouterTestingModule
			]
		}).compileComponents()
	}))

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created component', () => {
		expect(component).toBeTruthy()
	})
	describe('When component is initilizated', () => {
		it('should init returUrl', () => {
			const returnUrl = component.returnUrl;
			expect(returnUrl).not.toBeNull()
		})
	})
	describe('When component submit', () => {
		it('should call event submit method', () => {
			const submit = spyOn(component, 'onSubmit')
			const button = fixture.debugElement.query(By.css('button')).nativeElement
			component.model.username = 'admin'
			component.model.password = 'admin'
			button.click()
			expect(submit).toHaveBeenCalled()
		})

		it('should call AuthService call', () => {
			const login = spyOn((<any>component).auth, 'login').and.returnValue(of(true))
			const navigate = spyOn((<any>component).router, 'navigate')
			component.model.username = 'admin'
			component.model.password = 'admin'
			component.onSubmit()
			expect(login).toHaveBeenCalled()
			expect(navigate).toHaveBeenCalledWith(['/inbox'])
		})

		it('should call AuthService call error', () => {
			const login = spyOn((<any>component).auth, 'login').and.returnValue(of(false))
			component.model.username = 'admin'
			component.model.password = 'admin'
			component.onSubmit()
			expect(login).toHaveBeenCalled()
		})
	})
})
