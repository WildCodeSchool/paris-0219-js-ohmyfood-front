import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzasFormComponent } from './pizzas-form.component';

describe('PizzasFormComponent', () => {
  let component: PizzasFormComponent;
  let fixture: ComponentFixture<PizzasFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzasFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
