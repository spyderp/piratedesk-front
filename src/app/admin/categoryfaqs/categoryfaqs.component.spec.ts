import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryfaqsComponent } from './categoryfaqs.component';

describe('CategoryfaqsComponent', () => {
  let component: CategoryfaqsComponent;
  let fixture: ComponentFixture<CategoryfaqsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryfaqsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryfaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
