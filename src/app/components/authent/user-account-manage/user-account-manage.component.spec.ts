import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountManageComponent } from './user-account-manage.component';

describe('UserAccountManageComponent', () => {
  let component: UserAccountManageComponent;
  let fixture: ComponentFixture<UserAccountManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
