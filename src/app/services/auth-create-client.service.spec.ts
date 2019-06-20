import { TestBed } from '@angular/core/testing';

import { AuthCreateClientService } from './auth-create-client.service';

describe('AuthCreateClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthCreateClientService = TestBed.get(AuthCreateClientService);
    expect(service).toBeTruthy();
  });
});
