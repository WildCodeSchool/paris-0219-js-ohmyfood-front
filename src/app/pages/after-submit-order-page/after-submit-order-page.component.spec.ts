import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterSubmitOrderPageComponent } from './after-submit-order-page.component';

describe('AfterSubmitOrderPageComponent', () => {
  let component: AfterSubmitOrderPageComponent;
  let fixture: ComponentFixture<AfterSubmitOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterSubmitOrderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterSubmitOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
