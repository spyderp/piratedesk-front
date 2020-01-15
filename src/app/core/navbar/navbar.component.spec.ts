import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../shared/auth.service';
import { of, throwError } from 'rxjs';
import { UserService } from '../../admin/shared/services/user.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
import { resolve } from 'url';

class AuthServiceStub {
	logout(){
		return true
	}

}

class UserServiceStub {
	patch(id: number, modal: any) {
		return of(true)
	}
}

class RouterStub {
	navigate(url: string){
		return url
	}
}

class ModalServiceStub {
	fakeMsg = {
		result: new Promise((resolve, reject) => {
			resolve(123)
			//reject(0)
		}),
	}
 	open(obj: any) {
	 return this.fakeMsg
 	}
}

class ToastrServiceStub {
	success(msg: string) { return of(true)}
	error(msg: string) { return of(true) }
}

class LoaderStub {
	start(msg = '') {
		return true
	}
	stop() {
		return true
	}
}



fdescribe('NavbarComponent', () => {
	let component: NavbarComponent;
	let fixture: ComponentFixture<NavbarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ NavbarComponent ],
			imports: [
				FormsModule,
				HttpClientModule
			],
			providers: [
				{ provide: AuthService, useClass: AuthServiceStub },
				{ provide: UserService, useClass: UserServiceStub },
				{ provide: Router, useClass: RouterStub },
				{ provide: NgbModal, useClass: ModalServiceStub },
				{ provide: ToastrService, useClass: ToastrServiceStub },
				{ provide: NgxSmartLoaderService, useClass: LoaderStub },
			],
			schemas: [
				NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
			]
		})
		.compileComponents();
	}))

	beforeEach(() => {
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	})

	it('should create', () => {
		expect(component).toBeTruthy();
	})
	it('should open resolve', () => {
		const fakeMsg = {
			result: new Promise((resolve, reject) => {
				resolve(123)
				reject()
			}),
		}
		//spyOn((<any>component).modalService, 'open').and.returnValue(fakeMsg)
		component.open('test')
		expect(component).toBeTruthy();
	})
	it('should open reject ESC', () => {
		const fakeMsg = {
			result: new Promise((resolve, reject) => {
				reject(ModalDismissReasons.ESC)
			}),
		}
		spyOn((<any>component).modalService, 'open').and.returnValue(fakeMsg)
		component.open('test')
		expect(component).toBeTruthy();

	})

	it('should open reject click', () => {
		const fakeMsg = {
			result: new Promise((resolve, reject) => {
				reject(ModalDismissReasons.BACKDROP_CLICK)
			}),
		}
		spyOn((<any>component).modalService, 'open').and.returnValue(fakeMsg)
		component.open('test')
		expect(component).toBeTruthy();

	})
	
	it('should submit', () => {
		localStorage.setItem('current.user', JSON.stringify({
			id: 1,
			email: 'test',
			password: 'password'
		}))
		spyOn((<any>component).userService, 'patch').and.returnValue(of(true))
		const toastr = spyOn((<any>component).toastyService, 'success')
		component.onSubmit()
		expect(toastr).toHaveBeenCalled()
	})

	it('should submit (error)', () => {
		localStorage.setItem('current.user', JSON.stringify({
			id: 1,
			email: 'test',
			password: 'password'
		}))
		spyOn((<any>component).userService, 'patch').and.returnValue(throwError('test error'))
		const toastr = spyOn((<any>component).toastyService, 'error')
		component.onSubmit()
		expect(toastr).toHaveBeenCalled()
	})
})
