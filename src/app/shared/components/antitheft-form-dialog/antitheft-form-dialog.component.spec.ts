import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntitheftFormDialogComponent } from './antitheft-form-dialog.component';

describe('AntitheftFormDialogComponent', () => {
  let component: AntitheftFormDialogComponent;
  let fixture: ComponentFixture<AntitheftFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntitheftFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntitheftFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
