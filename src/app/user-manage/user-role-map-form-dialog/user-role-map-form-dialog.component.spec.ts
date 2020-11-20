import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleMapFormDialogComponent } from './user-role-map-form-dialog.component';

describe('UserRoleMapFormDialogComponent', () => {
  let component: UserRoleMapFormDialogComponent;
  let fixture: ComponentFixture<UserRoleMapFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleMapFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleMapFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
