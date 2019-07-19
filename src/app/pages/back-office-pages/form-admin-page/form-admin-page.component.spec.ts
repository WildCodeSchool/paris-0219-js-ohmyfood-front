import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAdminPageComponent } from './form-admin-page.component';

describe('FormAdminPageComponent', () => {
  let component: FormAdminPageComponent;
  let fixture: ComponentFixture<FormAdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAdminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
