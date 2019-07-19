import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOrdersAdminPagesComponent } from './details-orders-admin-pages.component';

describe('DetailsOrdersAdminPagesComponent', () => {
  let component: DetailsOrdersAdminPagesComponent;
  let fixture: ComponentFixture<DetailsOrdersAdminPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOrdersAdminPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOrdersAdminPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
