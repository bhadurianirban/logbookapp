import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AntiTheftModel } from '../../models/antiTheft.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { DateFormatService } from '../../services/date-format.service';
import { MASTER_ELEMENTS_HEADERS } from '../../models/table-headers';
import { CodeBaseViewModel } from '../../models/code-base.model';

@Component({
  selector: 'app-antitheft-form-dialog',
  templateUrl: './antitheft-form-dialog.component.html',
  styleUrls: ['./antitheft-form-dialog.component.scss']
})
export class AntitheftFormDialogComponent implements OnInit {
  dateFormat = 'dd/mm/yy';
  maxDateValue = new Date();
  minRestoreDateValue = new Date();
  AntiTheftForm: FormGroup;
  selectedColumns: any[] = [];
  dialogTableData: any[] = [];
  outageReasons: string[] = [];
  selectedOutageReasons: string[] = [];
  outageRemarks: string[] = [];
  selectedOutageRemarks: string[] = [];
  restoreRemarks: string[] = [];
  selectedRestoreRemarks: string[] = [];
  currAntiTheftData: AntiTheftModel;
  code: CodeBaseViewModel;
  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef,
              private dateFormatService: DateFormatService) { }

  ngOnInit() {
    this.currAntiTheftData = this.config.data.antiTheftData;
    this.code = this.config.data.antiTheftCode;
    const selectOptions =  this.config.data.outageSelectOptions;
    if (selectOptions) {
      this.outageReasons = selectOptions.Reasons ? selectOptions.Reasons : [];
      this.outageRemarks = selectOptions.Remarks ? selectOptions.Remarks : [];
      this.restoreRemarks = selectOptions.RestoreRemarks ? selectOptions.RestoreRemarks : [];
    }
    if (this.currAntiTheftData.LogDate) {
      this.minRestoreDateValue = this.dateFormatService.getDateFromString(this.currAntiTheftData.LogDate);
    }
    // create form group
    this.AntiTheftForm = this.formBuilder.group({
      LogDate: [{
        value: this.dateFormatService.getDateFromString(this.currAntiTheftData.LogDate),
        disabled: !this.isOpeningCodeCreated()
      }, Validators.required],
      LogTime: [{
        value: this.currAntiTheftData.LogTime,
        disabled: !this.isOpeningCodeCreated()
      },  Validators.required],
      RestoreDate: [{
        value: this.dateFormatService.getDateFromString(this.currAntiTheftData.RestoreDate),
        disabled: !this.isClosingCodeCreated()
      }],
      RestoreTime: [{
        value: this.currAntiTheftData.RestoreTime,
        disabled: !this.isClosingCodeCreated()
      }],
      Reason: [{
        value: this.currAntiTheftData.Reason ? this.currAntiTheftData.Reason.split('$') : null,
        disabled: !this.isOpeningCodeCreated()
      }, Validators.required],
      Remarks: [{
        value: this.currAntiTheftData.Remarks ? this.currAntiTheftData.Remarks.split('$') : null,
        disabled: !this.isOpeningCodeCreated()
        }],
      RestoredRemarks: [{
        value: this.currAntiTheftData.RestoredRemarks ? this.currAntiTheftData.RestoredRemarks.split('$') : null,
        disabled: !this.isClosingCodeCreated()
      }],
    });
    this.selectedColumns = MASTER_ELEMENTS_HEADERS;
    this.dialogTableData = this.config.data.antiTheftArrayData;
    this.updateValidators();
  }

  updateValidators() {
    if (this.currAntiTheftData &&  this.currAntiTheftData.AntiTheftClosingCode
       && this.currAntiTheftData.AntiTheftClosingCode.length > 0) {
      this.AntiTheftForm.controls.RestoreDate.setValidators([Validators.required]);
      this.AntiTheftForm.controls.RestoreTime.setValidators([Validators.required]);
      this.AntiTheftForm.controls.RestoredRemarks.setValidators([Validators.required]);
    } else {
      this.AntiTheftForm.controls.RestoreDate.setValidators([]);
      this.AntiTheftForm.controls.RestoreTime.setValidators([]);
      this.AntiTheftForm.controls.RestoredRemarks.setValidators([]);
    }
    this.AntiTheftForm.controls.RestoreDate.updateValueAndValidity();
    this.AntiTheftForm.controls.RestoreTime.updateValueAndValidity();
    this.AntiTheftForm.controls.RestoredRemarks.updateValueAndValidity();
  }

  isOpeningCodeCreated() {
    return (this.currAntiTheftData.AntiTheftOpeningCode &&
     this.currAntiTheftData.AntiTheftOpeningCode.filter(x => !x.IsCancelled).length > 0)
     || (this.code && this.code.CodeType === 'AO' && !this.code.IsCancelled);
  }

  isClosingCodeCreated() {
    return (this.currAntiTheftData.AntiTheftClosingCode &&
     this.currAntiTheftData.AntiTheftClosingCode.filter(x => !x.IsCancelled).length > 0)
     || (this.code && this.code.CodeType === 'AC' && !this.code.IsCancelled);
  }

  search(event, type: string) {
    switch (type) {
      case 'reason':
        this.selectedOutageReasons = this.outageReasons.filter(x => x.toLowerCase().includes(event.query.toString().toLowerCase()));
        if (this.selectedOutageReasons.length === 0) {
          this.selectedOutageReasons.push(event.query.toString());
        }
        break;
      case 'remarks':
        this.selectedOutageRemarks = this.outageRemarks.filter(x => x.toLowerCase().includes(event.query.toString().toLowerCase()));
        if (this.selectedOutageRemarks.length === 0) {
          this.selectedOutageRemarks.push(event.query.toString());
        }
        break;
      case 'restoreRemarks':
        this.selectedRestoreRemarks = this.restoreRemarks.filter(x => x.toLowerCase().includes(event.query.toString().toLowerCase()));
        if (this.selectedRestoreRemarks.length === 0) {
          this.selectedRestoreRemarks.push(event.query.toString());
        }
        break;
    }
  }

  handleSubmitClick() {
    if (this.AntiTheftForm.dirty && this.AntiTheftForm.valid) {
      const data = this.AntiTheftForm.getRawValue();
      this.ref.close(data);
    }
  }

  handleCloseClick() {
    this.ref.close();
  }

}
