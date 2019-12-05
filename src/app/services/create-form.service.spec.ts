import { TestBed } from '@angular/core/testing';

import { CreateFormService } from './create-form.service';

describe('CreateFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateFormService = TestBed.get(CreateFormService);
    expect(service).toBeTruthy();
  });
});
