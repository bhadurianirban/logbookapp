import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueDialogueComponent } from './issue-dialogue.component';

describe('IssueDialogueComponent', () => {
  let component: IssueDialogueComponent;
  let fixture: ComponentFixture<IssueDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
