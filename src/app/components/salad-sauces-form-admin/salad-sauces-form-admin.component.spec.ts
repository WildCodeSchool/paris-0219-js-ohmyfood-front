import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaladSaucesFormAdminComponent } from './salad-sauces-form-admin.component';

describe('SaladSaucesFormAdminComponent', () => {
  let component: SaladSaucesFormAdminComponent;
  let fixture: ComponentFixture<SaladSaucesFormAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaladSaucesFormAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaladSaucesFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
