import { TestBed } from '@angular/core/testing';

import { DessertsDataService } from './desserts-data.service';

describe('DessertsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DessertsDataService = TestBed.get(DessertsDataService);
    expect(service).toBeTruthy();
  });
});
