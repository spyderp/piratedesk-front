import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../shared/auth.service';
import { of } from 'rxjs';
import { UserService } from '../../admin/shared/services/user.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartLoaderService } from 'ngx-smart-loader';

class AuthServiceStub {
	logout(){
		return true
	}
}

class UserServiceStub {
	patch(id:number, modal: any){
		return of(true)
	}
}

class RouterStub {
	navigate(url: string){
		return url
	}
}

class ModalServiceStub {
 open(obj:any){
	 return of(true)
 }
}

class ToastrServiceStub {
	success(msg: string) { return of(true)}
	error(msg: string) { return of(true) }
}

class LoaderStub {
	start() {
		return true
	}
	stop() {
		return true
	}
}



describe('NavbarComponent', () => {
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
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
