import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { NgxSmartLoaderService } from 'ngx-smart-loader'
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { InboxComponent } from './inbox.component'
class NgxSmartLoaderServiceStub {
	start(name: string) {
		return true
	}

	stop(name: string) {
		return true
	}
}



describe('InboxComponent', () => {
	let component: InboxComponent
	let fixture: ComponentFixture<InboxComponent>

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InboxComponent ],
			providers: [
				{ provide: NgxSmartLoaderService, useClass: NgxSmartLoaderServiceStub },
			],
			schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
		})
		.compileComponents()
	}))

	beforeEach(() => {
		fixture = TestBed.createComponent(InboxComponent)
		component = fixture.componentInstance
		fixture.detectChanges()
	})

	it('should create', () => {
		expect(component).toBeTruthy()
	})
})
