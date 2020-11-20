import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-cancel-code-dialog',
  templateUrl: './cancel-code-dialog.component.html',
  styleUrls: ['./cancel-code-dialog.component.scss']
})
export class CancelCodeDialogComponent implements OnInit {
  cancelCodeForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.cancelCodeForm = this.formBuilder.group({
      Remarks: ['', Validators.required]
    });
  }

  handleCancelClick() {
    if (this.cancelCodeForm.dirty && this.cancelCodeForm.valid) {
      const data = this.cancelCodeForm.getRawValue();
      this.ref.close(data.Remarks);
    }
  }

  handleCloseClick() {
    this.ref.close();
  }
}
