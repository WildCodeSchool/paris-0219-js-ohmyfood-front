import { TestBed } from '@angular/core/testing';

import { MenuDatasService } from './menu-datas.service';

describe('MenuDatasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuDatasService = TestBed.get(MenuDatasService);
    expect(service).toBeTruthy();
  });
});
