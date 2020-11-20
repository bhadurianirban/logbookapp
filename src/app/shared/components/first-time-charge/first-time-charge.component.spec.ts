import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeChargeComponent } from './first-time-charge.component';

describe('FirstTimeChargeComponent', () => {
  let component: FirstTimeChargeComponent;
  let fixture: ComponentFixture<FirstTimeChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTimeChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimeChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
