import { TestBed } from '@angular/core/testing';

import { PizzasDataService } from './pizzas-data.service';

describe('PizzasDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PizzasDataService = TestBed.get(PizzasDataService);
    expect(service).toBeTruthy();
  });
});
