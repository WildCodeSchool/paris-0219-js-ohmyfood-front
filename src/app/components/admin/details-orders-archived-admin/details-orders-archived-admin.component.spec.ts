import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOrdersArchivedAdminComponent } from './details-orders-archived-admin.component';

describe('DetailsOrdersArchivedAdminComponent', () => {
  let component: DetailsOrdersArchivedAdminComponent;
  let fixture: ComponentFixture<DetailsOrdersArchivedAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOrdersArchivedAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOrdersArchivedAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
