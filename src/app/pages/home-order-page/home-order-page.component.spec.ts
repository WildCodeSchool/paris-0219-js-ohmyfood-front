import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOrderPageComponent } from './home-order-page.component';

describe('HomeOrderPageComponent', () => {
  let component: HomeOrderPageComponent;
  let fixture: ComponentFixture<HomeOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeOrderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
