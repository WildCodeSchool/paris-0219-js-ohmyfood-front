import { TestBed } from '@angular/core/testing';

import { FinalOrderService } from './final-order.service';

describe('FinalOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinalOrderService = TestBed.get(FinalOrderService);
    expect(service).toBeTruthy();
  });
});
