import { TestBed } from '@angular/core/testing';

import { BasketlocalStorageService } from './basket-session-storage.service';

describe('BasketlocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasketlocalStorageService = TestBed.get(BasketlocalStorageService);
    expect(service).toBeTruthy();
  });
});
