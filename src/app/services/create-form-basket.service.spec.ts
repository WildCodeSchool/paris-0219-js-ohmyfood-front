import { TestBed } from '@angular/core/testing';

import { CreateFormBasketService } from './create-form-basket.service';

describe('CreateFormBasketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateFormBasketService = TestBed.get(CreateFormBasketService);
    expect(service).toBeTruthy();
  });
});
