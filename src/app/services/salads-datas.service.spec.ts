import { TestBed } from '@angular/core/testing';

import { SaladsDatasService } from './salads-datas.service';

describe('SaucesDatasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaladsDatasService = TestBed.get(SaladsDatasService);
    expect(service).toBeTruthy();
  });
});
