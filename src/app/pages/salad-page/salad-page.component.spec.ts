import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaladPageComponent } from './salad-page.component';

describe('SaladPageComponent', () => {
  let component: SaladPageComponent;
  let fixture: ComponentFixture<SaladPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaladPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaladPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
