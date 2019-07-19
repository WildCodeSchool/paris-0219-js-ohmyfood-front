import { TestBed } from '@angular/core/testing';

import { GetOrdersDetailsAdminService } from './get-orders-details-admin.service';

describe('GetOrdersDetailsAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetOrdersDetailsAdminService = TestBed.get(GetOrdersDetailsAdminService);
    expect(service).toBeTruthy();
  });
});
