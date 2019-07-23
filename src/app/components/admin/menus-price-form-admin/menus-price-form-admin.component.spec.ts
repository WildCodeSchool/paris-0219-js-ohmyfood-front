import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusPriceFormAdminComponent } from './menus-price-form-admin.component';

describe('MenusPriceFormAdminComponent', () => {
  let component: MenusPriceFormAdminComponent;
  let fixture: ComponentFixture<MenusPriceFormAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusPriceFormAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusPriceFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
