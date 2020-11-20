import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApprovedShutdownRequest } from '../../models/approved-shutdown.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { DateFormatService } from '../../services/date-format.service';
import { CodeBaseViewModel } from '../../models/code-base.model';

@Component({
  selector: 'app-shutdown-form-dialog',
  templateUrl: './shutdown-form-dialog.component.html',
  styleUrls: ['./shutdown-form-dialog.component.scss']
})
export class ShutdownFormDialogComponent implements OnInit {
  dateFormat = 'dd/mm/yy';
  maxDateValue = new Date();
  minRestoreDateValue = new Date();
  ShutdownForm: FormGroup;
  currShutdownData: ApprovedShutdownRequest;
  code: CodeBaseViewModel;

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef,
              private dateFormatService: DateFormatService) { }

  ngOnInit() {
    this.currShutdownData = this.config.data.shutdownData;
    this.code = this.config.data.shutdownCode;
    if (this.currShutdownData.ActualOutageDate) {
      this.minRestoreDateValue = this.dateFormatService.getDateFromString(this.currShutdownData.ActualOutageDate);
    }
    // create form group
    this.ShutdownForm = this.formBuilder.group({
      ElementName: [{
        value: this.currShutdownData.ElementName,
        disabled: true
      }],
      Conditions: [{
        value: this.currShutdownData.Conditions,
        disabled: true
      }],
      Nature: [{
        value: this.currShutdownData.Nature,
        disabled: true
      }],
      PlannedOutage: [{
        value: this.currShutdownData.PlannedOutage,
        disabled: true
      }],
      PlannedRestore: [{
        value: this.currShutdownData.PlannedRestore,
        disabled: true
      }],
      ShutdownAvailedBy: [{
        value: this.currShutdownData.ShutdownAvailedBy,
        disabled: true
      }],
      Type: [{
        value: this.currShutdownData.Type,
        disabled: true
      }],
      Reason: [{
        value: this.currShutdownData.Reason,
        disabled: true
      }],
      ActualOutageDate: [{
        value: this.dateFormatService.getDateFromString(this.currShutdownData.ActualOutageDate),
        disabled: !this.isOpeningCodeCreated()
      }, Validators.required],
      ActualOutageTime: [{
        value: this.currShutdownData.ActualOutageTime,
        disabled: !this.isOpeningCodeCreated()
      }, Validators.required],
      ActualRestoreDate: [{
        value: this.dateFormatService.getDateFromString(this.currShutdownData.ActualRestoreDate),
        disabled: !this.isClosingCodeCreated()
      }],
      ActualRestoreTime: [{
        value: this.currShutdownData.ActualRestoreTime,
        disabled: !this.isClosingCodeCreated()
      }]
    });
    this.updateValidators();
  }

  updateValidators() {
    if (this.currShutdownData &&  this.currShutdownData.ClosingCode
       && this.currShutdownData.ClosingCode.length > 0) {
      this.ShutdownForm.controls.ActualRestoreDate.setValidators([Validators.required]);
      this.ShutdownForm.controls.ActualRestoreTime.setValidators([Validators.required]);
    } else {
      this.ShutdownForm.controls.ActualRestoreDate.setValidators([]);
      this.ShutdownForm.controls.ActualRestoreTime.setValidators([]);
    }
    this.ShutdownForm.controls.ActualRestoreDate.updateValueAndValidity();
    this.ShutdownForm.controls.ActualRestoreTime.updateValueAndValidity();
  }

  isOpeningCodeCreated() {
    return (this.currShutdownData.OpeningCode && this.currShutdownData.OpeningCode.filter(x => !x.IsCancelled).length > 0)
    || (this.code && this.code.CodeType === 'O' && !this.code.IsCancelled);
  }

  isClosingCodeCreated() {
    return (this.currShutdownData.ClosingCode && this.currShutdownData.ClosingCode.filter(x => !x.IsCancelled).length > 0)
    || (this.code && this.code.CodeType === 'C' && !this.code.IsCancelled);
  }

  handleSubmitClick() {
    if (this.ShutdownForm.dirty && this.ShutdownForm.valid) {
      const data = this.ShutdownForm.getRawValue();
      this.ref.close(data);
    }
  }

  handleCloseClick() {
    this.ref.close();
  }

}
