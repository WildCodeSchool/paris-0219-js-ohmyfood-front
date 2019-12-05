import { TestBed } from '@angular/core/testing';

import { BeveragesDataService } from './beverages-data.service';

describe('BeveragesDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BeveragesDataService = TestBed.get(BeveragesDataService);
    expect(service).toBeTruthy();
  });
});
