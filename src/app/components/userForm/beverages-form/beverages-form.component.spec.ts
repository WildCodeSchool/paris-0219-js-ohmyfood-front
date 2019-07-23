import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeveragesFormComponent } from './beverages-form.component';

describe('BeveragesFormComponent', () => {
  let component: BeveragesFormComponent;
  let fixture: ComponentFixture<BeveragesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeveragesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeveragesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
