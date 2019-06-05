import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaladsSaucesComponent } from './salads-sauces.component';

describe('SaladsSaucesComponent', () => {
  let component: SaladsSaucesComponent;
  let fixture: ComponentFixture<SaladsSaucesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaladsSaucesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaladsSaucesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
