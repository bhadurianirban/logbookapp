import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFormDialogComponent } from './users-form-dialog.component';

describe('UsersFormDialogComponent', () => {
  let component: UsersFormDialogComponent;
  let fixture: ComponentFixture<UsersFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
