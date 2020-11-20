import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShutdownFormDialogComponent } from './shutdown-form-dialog.component';

describe('ShutdownFormDialogComponent', () => {
  let component: ShutdownFormDialogComponent;
  let fixture: ComponentFixture<ShutdownFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShutdownFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShutdownFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
