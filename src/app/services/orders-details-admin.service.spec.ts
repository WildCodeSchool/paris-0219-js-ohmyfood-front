import { TestBed } from '@angular/core/testing';

import { OrdersDetailsAdminService } from './orders-details-admin.service';

describe('OrdersDetailsAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersDetailsAdminService = TestBed.get(OrdersDetailsAdminService);
    expect(service).toBeTruthy();
  });
});
