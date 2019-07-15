import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeveragesFormAdminComponent } from './beverages-form-admin.component';

describe('BeveragesFormAdminComponent', () => {
  let component: BeveragesFormAdminComponent;
  let fixture: ComponentFixture<BeveragesFormAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeveragesFormAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeveragesFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
