import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPublicComponent } from './login-public.component';

describe('LoginPublicComponent', () => {
  let component: LoginPublicComponent;
  let fixture: ComponentFixture<LoginPublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
