import { TestBed } from '@angular/core/testing';

import { PizzaService } from './pizza.service';

describe('ServicePizzaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PizzaService = TestBed.get(PizzaService);
    expect(service).toBeTruthy();
  });
});
