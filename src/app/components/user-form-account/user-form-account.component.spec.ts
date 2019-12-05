import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormAccountComponent } from './user-form-account.component';

describe('UserFormAccountComponent', () => {
  let component: UserFormAccountComponent;
  let fixture: ComponentFixture<UserFormAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
