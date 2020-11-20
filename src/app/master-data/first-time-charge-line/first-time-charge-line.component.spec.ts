import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeChargeLineComponent } from './first-time-charge-line.component';

describe('FirstTimeChargeLineComponent', () => {
  let component: FirstTimeChargeLineComponent;
  let fixture: ComponentFixture<FirstTimeChargeLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTimeChargeLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimeChargeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
