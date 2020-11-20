import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutageFormDialogComponent } from './outage-form-dialog.component';

describe('OutageFormDialogComponent', () => {
  let component: OutageFormDialogComponent;
  let fixture: ComponentFixture<OutageFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutageFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutageFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
