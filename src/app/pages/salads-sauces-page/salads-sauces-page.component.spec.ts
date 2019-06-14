import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaladsSaucesPageComponent } from './salads-sauces-page.component';

describe('SaladsSaucesPageComponent', () => {
  let component: SaladsSaucesPageComponent;
  let fixture: ComponentFixture<SaladsSaucesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaladsSaucesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaladsSaucesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
