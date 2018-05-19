import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivesComponent } from './festives.component';

describe('FestivesComponent', () => {
  let component: FestivesComponent;
  let fixture: ComponentFixture<FestivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FestivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FestivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
