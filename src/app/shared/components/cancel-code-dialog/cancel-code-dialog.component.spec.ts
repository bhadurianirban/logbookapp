import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelCodeDialogComponent } from './cancel-code-dialog.component';

describe('CancelCodeDialogComponent', () => {
  let component: CancelCodeDialogComponent;
  let fixture: ComponentFixture<CancelCodeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelCodeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
