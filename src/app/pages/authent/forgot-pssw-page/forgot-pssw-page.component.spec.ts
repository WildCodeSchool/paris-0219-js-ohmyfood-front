import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPsswPageComponent } from './forgot-pssw-page.component';

describe('ForgotPsswPageComponent', () => {
  let component: ForgotPsswPageComponent;
  let fixture: ComponentFixture<ForgotPsswPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPsswPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPsswPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
