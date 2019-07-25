import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxFormAdminComponent } from './tax-form-admin.component';

describe('TaxFormAdminComponent', () => {
  let component: TaxFormAdminComponent;
  let fixture: ComponentFixture<TaxFormAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxFormAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
