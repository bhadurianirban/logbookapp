import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { TrippingValue } from 'src/app/shared/models/tripping-value.model';


@Component({
  selector: 'app-tripping-dialogue',
  templateUrl: './tripping-dialogue.component.html',
  styleUrls: ['./tripping-dialogue.component.scss']
})
export class TrippingDialogueComponent implements OnInit {
  TrippingForm: FormGroup;
  trippingValue: TrippingValue;

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.trippingValue = this.config.data.currentTrippingData;
    // create form group
    this.TrippingForm = this.formBuilder.group({
      Name: [{ value: this.trippingValue.Name, disabled: false}],
    });
  }
  handleSubmitClick() {
    if (this.TrippingForm.dirty && this.TrippingForm.valid) {
      const data = this.TrippingForm.getRawValue();
      this.ref.close(data);
    }
  }
  isKeyDisabled(): boolean {
    return this.trippingValue  ? true : false;
  }

  handleCloseClick() {
    this.ref.close();
  }
}
