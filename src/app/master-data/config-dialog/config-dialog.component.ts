import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { ConfigValue } from 'src/app/shared/models/config-values.model';

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.scss']
})
export class ConfigDialogComponent implements OnInit {
  ConfigForm: FormGroup;
  configValue: ConfigValue;

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.configValue = this.config.data.currentConfigData;
    // create form group
    this.ConfigForm = this.formBuilder.group({
      Key: [{ value: this.configValue.Key, disabled: this.isKeyDisabled()}, Validators.required],
      Value: [{ value: this.configValue.Value, disabled: false}, Validators.required],
    });
  }

  handleSubmitClick() {
    if (this.ConfigForm.dirty && this.ConfigForm.valid) {
      const data = this.ConfigForm.getRawValue();
      this.ref.close(data);
    }
  }

  isKeyDisabled(): boolean {
    return this.configValue && this.configValue.Key ? true : false;
  }

  handleCloseClick() {
    this.ref.close();
  }

}
