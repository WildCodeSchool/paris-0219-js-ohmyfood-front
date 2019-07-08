import { TestBed } from '@angular/core/testing';

import { MenuPricesDataService } from './menu-prices-data.service';

describe('MenuPricesDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuPricesDataService = TestBed.get(MenuPricesDataService);
    expect(service).toBeTruthy();
  });
});
