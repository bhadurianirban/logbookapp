import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { IssueValue } from 'src/app/shared/models/issue-value.model';


@Component({
  selector: 'app-issue-dialogue',
  templateUrl: './issue-dialogue.component.html',
  styleUrls: ['./issue-dialogue.component.scss']
})
export class IssueDialogueComponent implements OnInit {
  IssueForm: FormGroup;
  issueValue: IssueValue;

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.issueValue = this.config.data.currentIssueData;
    // create form group
    this.IssueForm = this.formBuilder.group({
      Issue: [{ value: this.issueValue.Issue, disabled: false}],
    });
  }
  handleSubmitClick() {
    if (this.IssueForm.dirty && this.IssueForm.valid) {
      const data = this.IssueForm.getRawValue();
      this.ref.close(data);
    }
  }
  isKeyDisabled(): boolean {
    return this.issueValue  ? true : false;
  }

  handleCloseClick() {
    this.ref.close();
  }
}
