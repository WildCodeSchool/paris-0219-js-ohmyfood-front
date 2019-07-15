import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPizzaFormComponent } from './menu-pizza-form.component';

describe('MenuPizzaFormComponent', () => {
  let component: MenuPizzaFormComponent;
  let fixture: ComponentFixture<MenuPizzaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPizzaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPizzaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
