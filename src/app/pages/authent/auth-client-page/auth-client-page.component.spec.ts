import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthClientPageComponent } from './auth-client-page.component';

describe('AuthClientComponent', () => {
  let component: AuthClientPageComponent;
  let fixture: ComponentFixture<AuthClientPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthClientPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
