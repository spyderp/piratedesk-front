import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxGridComponent } from './inbox-grid.component';

describe('InboxGridComponent', () => {
  let component: InboxGridComponent;
  let fixture: ComponentFixture<InboxGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
