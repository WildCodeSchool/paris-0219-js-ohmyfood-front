import { TestBed } from '@angular/core/testing';

import { QuantitySelectService } from './quantity-select.service';

describe('QuantitySelectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuantitySelectService = TestBed.get(QuantitySelectService);
    expect(service).toBeTruthy();
  });
});
