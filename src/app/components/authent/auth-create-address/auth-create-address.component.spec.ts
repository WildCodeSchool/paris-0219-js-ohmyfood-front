import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCreateAddressComponent } from './auth-create-address.component';

describe('AuthCreateAddressComponent', () => {
  let component: AuthCreateAddressComponent;
  let fixture: ComponentFixture<AuthCreateAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCreateAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCreateAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
