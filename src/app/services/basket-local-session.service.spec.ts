import { TestBed } from '@angular/core/testing';

import { BasketSessionStorageService } from './basket-session-storage.service';

describe('BasketSessionStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasketSessionStorageService = TestBed.get(BasketSessionStorageService);
    expect(service).toBeTruthy();
  });
});
