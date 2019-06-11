import { TestBed } from '@angular/core/testing';

import { ServicePizzaService } from './service-pizza.service';

describe('ServicePizzaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePizzaService = TestBed.get(ServicePizzaService);
    expect(service).toBeTruthy();
  });
});
