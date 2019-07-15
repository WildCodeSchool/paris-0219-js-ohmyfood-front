import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasFormAdminComponent } from './pizzas-form-admin.component';

describe('PizzasFormAdminComponent', () => {
  let component: PizzasFormAdminComponent;
  let fixture: ComponentFixture<PizzasFormAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzasFormAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzasFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
