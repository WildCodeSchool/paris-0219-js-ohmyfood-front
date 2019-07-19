import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaladIngredientsFormAdminComponent } from './salad-ingredients-form-admin.component';

describe('SaladIngredientsFormAdminComponent', () => {
  let component: SaladIngredientsFormAdminComponent;
  let fixture: ComponentFixture<SaladIngredientsFormAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaladIngredientsFormAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaladIngredientsFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
