import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaladToppingsFormAdminComponent } from './salad-toppings-form-admin.component';

describe('SaladToppingsFormAdminComponent', () => {
  let component: SaladToppingsFormAdminComponent;
  let fixture: ComponentFixture<SaladToppingsFormAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaladToppingsFormAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaladToppingsFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
