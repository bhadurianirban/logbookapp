import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-third-party-code-dialog',
  templateUrl: './third-party-code-dialog.component.html',
  styleUrls: ['./third-party-code-dialog.component.scss']
})
export class ThirdPartyCodeDialogComponent implements OnInit {
  codeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.codeForm = this.formBuilder.group({
      Code: ['', Validators.required]
    });
  }

  handleSubmitClick() {
    if (this.codeForm.dirty && this.codeForm.valid) {
      const data = this.codeForm.getRawValue();
      this.ref.close(data.Code);
    }
  }

  handleCloseClick() {
    this.ref.close();
  }

}
