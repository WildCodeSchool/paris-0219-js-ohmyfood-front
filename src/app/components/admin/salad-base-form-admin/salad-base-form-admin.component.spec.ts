import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaladBaseFormAdminComponent } from './salad-base-form-admin.component';

describe('SaladBaseFormAdminComponent', () => {
  let component: SaladBaseFormAdminComponent;
  let fixture: ComponentFixture<SaladBaseFormAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaladBaseFormAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaladBaseFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
