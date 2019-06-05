import { TestBed } from '@angular/core/testing';

import { TransfertDatasService } from './transfert-datas.service';

describe('TransfertDatasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransfertDatasService = TestBed.get(TransfertDatasService);
    expect(service).toBeTruthy();
  });
});
