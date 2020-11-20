import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationMessageComponent } from './violation-message.component';

describe('ViolationMessageComponent', () => {
  let component: ViolationMessageComponent;
  let fixture: ComponentFixture<ViolationMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolationMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
