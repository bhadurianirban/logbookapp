import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeChargeDialogComponent } from './first-time-charge-dialog.component';

describe('FirstTimeChargeDialogComponent', () => {
  let component: FirstTimeChargeDialogComponent;
  let fixture: ComponentFixture<FirstTimeChargeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTimeChargeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimeChargeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
