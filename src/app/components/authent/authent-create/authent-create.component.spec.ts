import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentCreateComponent } from './authent-create.component';

describe('AuthentCreateComponent', () => {
  let component: AuthentCreateComponent;
  let fixture: ComponentFixture<AuthentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
