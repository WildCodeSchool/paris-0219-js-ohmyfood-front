import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaladsIngredientsComponent } from './salads-ingredients.component';

describe('SaladsIngredientsComponent', () => {
  let component: SaladsIngredientsComponent;
  let fixture: ComponentFixture<SaladsIngredientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaladsIngredientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaladsIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
