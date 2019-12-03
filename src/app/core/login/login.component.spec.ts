import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common'
import { LoginComponent } from './login.component';
import { By } from 'protractor';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let location: Location;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ LoginComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		location = TestBed.get(Location);
	});

	it('should be created component', () => {
		expect(component).toBeTruthy()
	})
	// it('should call onSubmit method', () => {
	// 	spyOn(component, 'onSubmit');
	// 	component.model.username = 'admin'
	// 	component.model.password = 'admin'
	// 	const el = fixture.debugElement.query(By.css('button')).nativeElement
	// 	el.click()
	// 	expect(location.path()).toBe('/inbox');
	// })
})
