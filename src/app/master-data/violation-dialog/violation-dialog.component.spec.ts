import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationDialogComponent } from './violation-dialog.component';

describe('ViolationDialogComponent', () => {
  let component: ViolationDialogComponent;
  let fixture: ComponentFixture<ViolationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
