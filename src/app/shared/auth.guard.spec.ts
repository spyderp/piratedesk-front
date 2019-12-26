import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { HttpClientModule } from '@angular/common/http'
import { ToastrService, ToastrModule } from 'ngx-toastr'
import { Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'

class AuthServiceStub {
	getExpired() {
		return false
	}
	getToken() {
		return true;
	}
	getUser() {
		return {
			role: 'admin'
		}
	}
}
describe('AuthGuard', () => {
	const routeMock: any = { snapshot: {}, data: {roles: ['admin']} }
	const routeStateMock: any = { snapshot: {}, url: '/inbox', }
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule, ToastrModule.forRoot(), RouterTestingModule],
			providers: [AuthGuard, { provide: AuthService, useClass: AuthServiceStub}, ToastrService]
		})
	})

	it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
		expect(guard).toBeTruthy()
	}))

	it('should canActive, navigate', inject([AuthGuard], (guard: AuthGuard) => {
		expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
		//expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
	}))

})
