import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirstTimeChargeModel } from '../../models/first-time-charge.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { DateFormatService } from '../../services/date-format.service';
import { MASTER_ELEMENTS_HEADERS } from '../../models/table-headers';
import { CodeBaseViewModel } from '../../models/code-base.model';

@Component({
  selector: 'app-first-time-charge-dialog',
  templateUrl: './first-time-charge-dialog.component.html',
  styleUrls: ['./first-time-charge-dialog.component.scss']
})
export class FirstTimeChargeDialogComponent implements OnInit {

  dateFormat = 'dd/mm/yy';
  maxDateValue = new Date();
  minRestoreDateValue = new Date();
  FirstTimeChargeForm: FormGroup;
  selectedColumns: any[] = [];
  dialogTableData: any[] = [];
  outageReasons: string[] = [];
  selectedOutageReasons: string[] = [];
  outageRemarks: string[] = [];
  selectedOutageRemarks: string[] = [];
  restoreRemarks: string[] = [];
  selectedRestoreRemarks: string[] = [];
  currFirstTimeChargeData: FirstTimeChargeModel;
  code: CodeBaseViewModel;

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef,
              private dateFormatService: DateFormatService) { }

  ngOnInit() {
    this.currFirstTimeChargeData = this.config.data.firstTimeChargeData;
    this.code = this.config.data.firstTimeChargeCode;
    const selectOptions =  this.config.data.firstTimeChargeSelectOptions;
    if (selectOptions) {
      this.restoreRemarks = selectOptions.RestoreRemarks ? selectOptions.RestoreRemarks : [];
    }
    // create form group
    this.FirstTimeChargeForm = this.formBuilder.group({
      RestoreDate: [{
        value: this.dateFormatService.getDateFromString(this.currFirstTimeChargeData.RestoreDate),
        disabled: !this.isClosingCodeCreated()
      }],
      RestoreTime: [{
        value: this.currFirstTimeChargeData.RestoreTime,
        disabled: !this.isClosingCodeCreated()
      }],
      RestoredRemarks: [{
        value: this.currFirstTimeChargeData.RestoredRemarks ? this.currFirstTimeChargeData.RestoredRemarks.split('$') : null,
        disabled: !this.isClosingCodeCreated()
      }],
  });
    this.selectedColumns = MASTER_ELEMENTS_HEADERS;
    this.dialogTableData = this.config.data.firstTimeChargeArrayData;
    this.updateValidators();
  }

  updateValidators() {
    if (this.currFirstTimeChargeData &&  this.currFirstTimeChargeData.ClosingCode
       && this.currFirstTimeChargeData.ClosingCode.length > 0) {
      this.FirstTimeChargeForm.controls.RestoreDate.setValidators([Validators.required]);
      this.FirstTimeChargeForm.controls.RestoreTime.setValidators([Validators.required]);
      this.FirstTimeChargeForm.controls.RestoredRemarks.setValidators([Validators.required]);
    } else {
      this.FirstTimeChargeForm.controls.RestoreDate.setValidators([]);
      this.FirstTimeChargeForm.controls.RestoreTime.setValidators([]);
      this.FirstTimeChargeForm.controls.RestoredRemarks.setValidators([]);
    }
    this.FirstTimeChargeForm.controls.RestoreDate.updateValueAndValidity();
    this.FirstTimeChargeForm.controls.RestoreTime.updateValueAndValidity();
    this.FirstTimeChargeForm.controls.RestoredRemarks.updateValueAndValidity();
  }


  isClosingCodeCreated() {
    return (this.currFirstTimeChargeData.ClosingCode && this.currFirstTimeChargeData.ClosingCode.filter(x => !x.IsCancelled).length > 0)
    || (this.code && this.code.CodeType === 'C' && !this.code.IsCancelled);
  }

  search(event, type: string) {
    switch (type) {
      case 'restoreRemarks':
        this.selectedRestoreRemarks = this.restoreRemarks.filter(x => x.toLowerCase().includes(event.query.toString().toLowerCase()));
        if (this.selectedRestoreRemarks.length === 0) {
          this.selectedRestoreRemarks.push(event.query.toString());
        }
        break;
    }
  }

  handleSubmitClick() {
    if (this.FirstTimeChargeForm.dirty && this.FirstTimeChargeForm.valid) {
      const data = this.FirstTimeChargeForm.getRawValue();
      this.ref.close(data);
    }
  }

  handleCloseClick() {
    this.ref.close();
  }

}
