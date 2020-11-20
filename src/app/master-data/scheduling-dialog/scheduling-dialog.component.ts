import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { SchedulingValue } from 'src/app/shared/models/scheduling-value.model';


@Component({
  selector: 'app-scheduling-dialog',
  templateUrl: './scheduling-dialog.component.html',
  styleUrls: ['./scheduling-dialog.component.scss']
})
export class SchedulingDialogComponent implements OnInit  {
  SchedulingForm: FormGroup;
  schedulingValue: SchedulingValue;


  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.schedulingValue = this.config.data.currentSchedulingData;
    // create form group
    this.SchedulingForm = this.formBuilder.group({
      SchedulingType: [{ value: this.schedulingValue.SchedulingType, disabled: false}],
    });
  }
  handleSubmitClick() {
    if (this.SchedulingForm.dirty && this.SchedulingForm.valid) {
      const data = this.SchedulingForm.getRawValue();
      this.ref.close(data);
    }
  }
  isKeyDisabled(): boolean {
    return this.schedulingValue  ? true : false;
  }

  handleCloseClick() {
    this.ref.close();
  }
}
