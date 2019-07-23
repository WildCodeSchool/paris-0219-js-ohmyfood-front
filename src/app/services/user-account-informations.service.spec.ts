import { TestBed } from '@angular/core/testing';

import { UserAccountInformationsService } from './user-account-informations.service';

describe('UserAccountInformationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserAccountInformationsService = TestBed.get(UserAccountInformationsService);
    expect(service).toBeTruthy();
  });
});
