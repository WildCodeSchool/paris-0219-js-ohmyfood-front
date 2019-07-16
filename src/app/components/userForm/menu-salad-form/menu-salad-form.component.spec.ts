import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSaladFormComponent } from './menu-salad-form.component';

describe('MenuSaladFormComponent', () => {
  let component: MenuSaladFormComponent;
  let fixture: ComponentFixture<MenuSaladFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuSaladFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuSaladFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
