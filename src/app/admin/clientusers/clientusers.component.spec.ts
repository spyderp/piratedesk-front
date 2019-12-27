import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientusersComponent } from './clientusers.component';
import { UserService } from '../shared/services/user.service';
import { ClientService } from '../shared/services/client.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
class ToastrServiceStub {
	success(msg: string) {
		return true
	}

	error(msg: string) {
		return true
	}
}
class NgxSmartLoaderServiceStub {
	start(name: string) {
		return true
	}

	stop(name: string) {
		return true
	}
}

class MockModalOpen {
	close(): void {

	}
}
class MockModalService {
	open(object: any) {
		return new MockModalOpen()
	}
}


describe('ClientusersComponent', () => {
	let component: ClientusersComponent;
	let fixture: ComponentFixture<ClientusersComponent>;
	let serviceUser: UserService
	let serviceClient: ClientService 
	let httpMock: HttpTestingController
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ClientusersComponent ],
			imports: [ FormsModule, HttpClientTestingModule, ToastrModule],
			providers: [
				ClientService,
				UserService,
				{provide: ToastrService, useClass: ToastrServiceStub },
				{ provide: NgxSmartLoaderService, useClass: NgxSmartLoaderServiceStub },
			],
			schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
			
		})
		.compileComponents();
		serviceUser = TestBed.get(UserService)
		serviceClient = TestBed.get(ClientService)
		httpMock = TestBed.get(HttpTestingController)
	}))

	beforeEach(() => {
		fixture = TestBed.createComponent(ClientusersComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

	});

	afterAll(() => {
		serviceUser = null
		httpMock = null
		fixture = null
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
