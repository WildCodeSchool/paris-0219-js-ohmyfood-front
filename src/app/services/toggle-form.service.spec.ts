import { TestBed } from '@angular/core/testing';

import { ToggleFormService } from './toggle-form.service';

describe('ToggleFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToggleFormService = TestBed.get(ToggleFormService);
    expect(service).toBeTruthy();
  });
});
