import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatesComponent } from './estates.component';
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { NgxSmartLoaderService } from 'ngx-smart-loader'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { DepartmentService } from '../shared/services/department.service';
import { Estate } from '../shared/models';
import { environment } from '../../../environments/environment'
import { EstateService } from '../shared/services/estate.service';


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


fdescribe('EstatesComponent', () => {
	let component: EstatesComponent;
	let fixture: ComponentFixture<EstatesComponent>;
	let service: EstateService
	let httpMock: HttpTestingController
	const url = environment.apiServer + '/estates'
	const expectReturn: Estate[] = [
		{
			id: 1,
			descripcion: 'dfjsjdkf'
		},
		{
			id: 2,
			descripcion: 'fdgdgdfj'
		},
	]
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ EstatesComponent ],
			imports: [FormsModule, HttpClientTestingModule, ToastrModule],
			providers: [
				EstateService,
				{ provide: ToastrService, useClass: ToastrServiceStub },
				{ provide: NgxSmartLoaderService, useClass: NgxSmartLoaderServiceStub },
				{ provide: NgbModal, useClass: MockModalService}
			],
			schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
		})
		.compileComponents();
		service = TestBed.get(EstateService)
		httpMock = TestBed.get(HttpTestingController)
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EstatesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	})

	afterAll(() => {
		service = null
		httpMock = null
		fixture = null
	})

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
