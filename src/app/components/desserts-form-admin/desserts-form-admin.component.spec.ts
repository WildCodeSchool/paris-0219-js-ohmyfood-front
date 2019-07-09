import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertsFormAdminComponent } from './desserts-form-admin.component';

describe('DessertsFormAdminComponent', () => {
  let component: DessertsFormAdminComponent;
  let fixture: ComponentFixture<DessertsFormAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DessertsFormAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertsFormAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
