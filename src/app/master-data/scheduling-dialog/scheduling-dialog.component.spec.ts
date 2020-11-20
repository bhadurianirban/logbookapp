import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingDialogComponent } from './scheduling-dialog.component';

describe('SchedulingDialogComponent', () => {
  let component: SchedulingDialogComponent;
  let fixture: ComponentFixture<SchedulingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
