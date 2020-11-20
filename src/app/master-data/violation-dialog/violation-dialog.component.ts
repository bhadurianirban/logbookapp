import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { ViolationValue } from 'src/app/shared/models/violation-value.model';

@Component({
  selector: 'app-violation-dialog',
  templateUrl: './violation-dialog.component.html',
  styleUrls: ['./violation-dialog.component.scss']
})
export class ViolationDialogComponent implements OnInit {
  ViolationForm: FormGroup;
  violationValue: ViolationValue;


  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.violationValue = this.config.data.currentViolationData;
    // create form group
    this.ViolationForm = this.formBuilder.group({
      ViolationType: [{ value: this.violationValue.ViolationType, disabled: false}, Validators.required],
    });
  }
  handleSubmitClick() {
    if (this.ViolationForm.dirty && this.ViolationForm.valid) {
      const data = this.ViolationForm.getRawValue();
      this.ref.close(data);
    }
  }
  isKeyDisabled(): boolean {
    return this.violationValue  ? true : false;
  }

  handleCloseClick() {
    this.ref.close();
  }
}
