import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { By } from '@angular/platform-browser'
import { RouterOutlet } from '@angular/router'
import { NgxSmartLoaderModule, NgxSmartLoaderService, NgxSmartLoaderComponent} from 'ngx-smart-loader'
describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>
	let component: AppComponent
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				NgxSmartLoaderModule
			],
			declarations: [
				AppComponent
			],
			providers: [NgxSmartLoaderService]
		})
		fixture = TestBed.createComponent(AppComponent)
		component = fixture.debugElement.componentInstance
	}))

	it('should create the app', () => {
		expect(component).toBeTruthy()
	})
	it('should have a router outlet', () => {
		const de = fixture.debugElement.query(By.directive(RouterOutlet))
		expect(de).not.toBeNull()
	})
	it('should have a NgxSmart Loder component', () => {
		const de = fixture.debugElement.query(By.directive(NgxSmartLoaderComponent))
		expect(de).not.toBeNull()
	})

})
