import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-defer-shutdown-dialog',
  templateUrl: './defer-shutdown-dialog.component.html',
  styleUrls: ['./defer-shutdown-dialog.component.scss']
})
export class DeferShutdownDialogComponent implements OnInit {
  deferShutdownForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.deferShutdownForm = this.formBuilder.group({
      Remarks: ['', Validators.required]
    });
  }

  handleCancelClick() {
    if (this.deferShutdownForm.dirty && this.deferShutdownForm.valid) {
      const data = this.deferShutdownForm.getRawValue();
      this.ref.close(data.Remarks);
    }
  }

  handleCloseClick() {
    this.ref.close();
  }

}
