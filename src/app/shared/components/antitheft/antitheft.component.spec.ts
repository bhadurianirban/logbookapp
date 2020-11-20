import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntitheftComponent } from './antitheft.component';

describe('AntitheftComponent', () => {
  let component: AntitheftComponent;
  let fixture: ComponentFixture<AntitheftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntitheftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntitheftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
