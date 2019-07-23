import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPsswComponent } from './forgot-pssw.component';

describe('ForgotPsswComponent', () => {
  let component: ForgotPsswComponent;
  let fixture: ComponentFixture<ForgotPsswComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPsswComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPsswComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
