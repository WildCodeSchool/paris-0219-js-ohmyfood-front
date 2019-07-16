import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DessertsFormComponent } from './desserts-form.component';

describe('DessertsComponent', () => {
  let component: DessertsFormComponent;
  let fixture: ComponentFixture<DessertsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DessertsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DessertsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
