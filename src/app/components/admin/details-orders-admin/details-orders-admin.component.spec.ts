import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOrdersAdminComponent } from './details-orders-admin.component';

describe('DetailsOrdersAdminComponent', () => {
  let component: DetailsOrdersAdminComponent;
  let fixture: ComponentFixture<DetailsOrdersAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOrdersAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOrdersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
