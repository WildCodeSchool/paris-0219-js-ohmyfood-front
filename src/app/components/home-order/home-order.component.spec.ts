import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOrderComponent } from './home-order.component';

describe('HomeOrderComponent', () => {
  let component: HomeOrderComponent;
  let fixture: ComponentFixture<HomeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
