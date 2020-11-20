import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstituentDialogueComponent } from './constituent-dialogue.component';

describe('ConstituentDialogueComponent', () => {
  let component: ConstituentDialogueComponent;
  let fixture: ComponentFixture<ConstituentDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConstituentDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstituentDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
