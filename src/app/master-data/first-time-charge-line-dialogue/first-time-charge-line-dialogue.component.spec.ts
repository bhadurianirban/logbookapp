import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeChargeLineDialogueComponent } from './first-time-charge-line-dialogue.component';

describe('FirstTimeChargeLineDialogueComponent', () => {
  let component: FirstTimeChargeLineDialogueComponent;
  let fixture: ComponentFixture<FirstTimeChargeLineDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTimeChargeLineDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimeChargeLineDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
