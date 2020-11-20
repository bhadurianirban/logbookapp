import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { ConstituentValue } from 'src/app/shared/models/constituent-value.model';

@Component({
  selector: 'app-constituent-dialogue',
  templateUrl: './constituent-dialogue.component.html',
  styleUrls: ['./constituent-dialogue.component.scss']
})
export class ConstituentDialogueComponent implements OnInit {
  ConstituentForm: FormGroup;
  constituentValue: ConstituentValue;
  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.constituentValue = this.config.data.currentConstituentData;
    // create form group
    this.ConstituentForm = this.formBuilder.group({
      Name: [{ value: this.constituentValue.Name, disabled: false}, Validators.required],
      Region: [{ value: this.constituentValue.Region, disabled: false}, Validators.required],
      MaxPeak: [{ value: this.constituentValue.MaxPeak, disabled: false}, Validators.required],
      MaxOffPeak: [{ value: this.constituentValue.MaxOffPeak, disabled: false}, Validators.required],
      MobileNumber: [{ value: this.constituentValue.MobileNumber, disabled: false}, Validators.required],
      EmailId: [{ value: this.constituentValue.EmailId, disabled: false}, Validators.required]
    });
  }
  handleSubmitClick() {
    if (this.ConstituentForm.dirty && this.ConstituentForm.valid) {
      const data = this.ConstituentForm.getRawValue();
      this.ref.close(data);
    }
  }
  isKeyDisabled(): boolean {
    return this.constituentValue  ? true : false;
  }

  handleCloseClick() {
    this.ref.close();
  }
}
