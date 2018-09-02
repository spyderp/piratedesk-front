import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientusersComponent } from './clientusers.component';

describe('ClientusersComponent', () => {
  let component: ClientusersComponent;
  let fixture: ComponentFixture<ClientusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
