import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaladsFormComponent } from './salads-form.component';

describe('SaladsComponent', () => {
  let component: SaladsFormComponent;
  let fixture: ComponentFixture<SaladsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaladsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaladsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
