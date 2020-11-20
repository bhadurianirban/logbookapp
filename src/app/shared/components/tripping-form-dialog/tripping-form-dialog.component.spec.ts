import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrippingFormDialogComponent } from './tripping-form-dialog.component';

describe('TrippingFormDialogComponent', () => {
  let component: TrippingFormDialogComponent;
  let fixture: ComponentFixture<TrippingFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrippingFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrippingFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
