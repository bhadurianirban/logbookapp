import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationDialogueComponent } from './designation-dialogue.component';

describe('DesignationDialogueComponent', () => {
  let component: DesignationDialogueComponent;
  let fixture: ComponentFixture<DesignationDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
