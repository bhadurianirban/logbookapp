import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleMapComponent } from './user-role-map.component';

describe('UserRoleMapComponent', () => {
  let component: UserRoleMapComponent;
  let fixture: ComponentFixture<UserRoleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRoleMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
