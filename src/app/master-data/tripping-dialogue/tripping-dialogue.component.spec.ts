import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrippingDialogueComponent } from './tripping-dialogue.component';

describe('TrippingDialogueComponent', () => {
  let component: TrippingDialogueComponent;
  let fixture: ComponentFixture<TrippingDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrippingDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrippingDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
