import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxMinPowerComponent } from './max-min-power.component';

describe('MaxMinPowerComponent', () => {
  let component: MaxMinPowerComponent;
  let fixture: ComponentFixture<MaxMinPowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaxMinPowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxMinPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
