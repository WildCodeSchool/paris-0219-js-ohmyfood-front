import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressFormAccountComponent } from './user-address-form-account.component';

describe('UserAddressFormAccountComponent', () => {
  let component: UserAddressFormAccountComponent;
  let fixture: ComponentFixture<UserAddressFormAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddressFormAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddressFormAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
