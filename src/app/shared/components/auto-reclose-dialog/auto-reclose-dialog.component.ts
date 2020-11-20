import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutoRecloseModel } from '../../models/auto-reclose.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { DateFormatService } from '../../services/date-format.service';
import { MASTER_ELEMENTS_HEADERS } from '../../models/table-headers';
import { CodeBaseViewModel } from '../../models/code-base.model';

@Component({
  selector: 'app-auto-reclose-dialog',
  templateUrl: './auto-reclose-dialog.component.html',
  styleUrls: ['./auto-reclose-dialog.component.scss']
})
export class AutoRecloseDialogComponent implements OnInit {
  dateFormat = 'dd/mm/yy';
  maxDateValue = new Date();
  minRestoreDateValue = new Date();
  AutoRecloseForm: FormGroup;
  selectedColumns: any[] = [];
  dialogTableData: any[] = [];
  outageReasons: string[] = [];
  selectedOutageReasons: string[] = [];
  outageRemarks: string[] = [];
  selectedOutageRemarks: string[] = [];
  restoreRemarks: string[] = [];
  selectedRestoreRemarks: string[] = [];
  currAutoRecloseData: AutoRecloseModel;
  code: CodeBaseViewModel;

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef,
              private dateFormatService: DateFormatService) { }

  ngOnInit() {
    this.currAutoRecloseData = this.config.data.autoRecloseData;
    this.code = this.config.data.autoRecloseCode;
    const selectOptions =  this.config.data.autoRecloseSelectOptions;
    if (selectOptions) {
      this.outageReasons = selectOptions.Reasons ? selectOptions.Reasons : [];
      this.outageRemarks = selectOptions.Remarks ? selectOptions.Remarks : [];
      this.restoreRemarks = selectOptions.RestoreRemarks ? selectOptions.RestoreRemarks : [];
    }
    if (this.currAutoRecloseData.LogDate) {
      this.minRestoreDateValue = this.dateFormatService.getDateFromString(this.currAutoRecloseData.LogDate);
    }
    // create form group
    this.AutoRecloseForm = this.formBuilder.group({
      LogDate: [{
        value: this.dateFormatService.getDateFromString(this.currAutoRecloseData.LogDate),
        disabled: !this.isOpeningCodeCreated()
      }, Validators.required],
      LogTime: [{
        value: this.currAutoRecloseData.LogTime,
        disabled: !this.isOpeningCodeCreated()
      },  Validators.required],
      RestoreDate: [{
        value: this.dateFormatService.getDateFromString(this.currAutoRecloseData.RestoreDate),
        disabled: !this.isClosingCodeCreated()
      }],
      RestoreTime: [{
        value: this.currAutoRecloseData.RestoreTime,
        disabled: !this.isClosingCodeCreated()
      }],
      Reason: [{
        value: this.currAutoRecloseData.Reason ? this.currAutoRecloseData.Reason.split('$') : null,
        disabled: !this.isOpeningCodeCreated()
      }, Validators.required],
      Remarks: [{
        value: this.currAutoRecloseData.Remarks ? this.currAutoRecloseData.Remarks.split('$') : null,
        disabled: !this.isOpeningCodeCreated()
        }],
      RestoredRemarks: [{
        value: this.currAutoRecloseData.RestoredRemarks ? this.currAutoRecloseData.RestoredRemarks.split('$') : null,
        disabled: !this.isClosingCodeCreated()
      }],
  });
    this.selectedColumns = MASTER_ELEMENTS_HEADERS;
    this.dialogTableData = this.config.data.autoRecloseArrayData;
    this.updateValidators();
  }

  updateValidators() {
    if (this.currAutoRecloseData &&  this.currAutoRecloseData.ClosingCode
       && this.currAutoRecloseData.ClosingCode.length > 0) {
      this.AutoRecloseForm.controls.RestoreDate.setValidators([Validators.required]);
      this.AutoRecloseForm.controls.RestoreTime.setValidators([Validators.required]);
      this.AutoRecloseForm.controls.RestoredRemarks.setValidators([Validators.required]);
    } else {
      this.AutoRecloseForm.controls.RestoreDate.setValidators([]);
      this.AutoRecloseForm.controls.RestoreTime.setValidators([]);
      this.AutoRecloseForm.controls.RestoredRemarks.setValidators([]);
    }
    this.AutoRecloseForm.controls.RestoreDate.updateValueAndValidity();
    this.AutoRecloseForm.controls.RestoreTime.updateValueAndValidity();
    this.AutoRecloseForm.controls.RestoredRemarks.updateValueAndValidity();
  }

  isOpeningCodeCreated() {
    return (this.currAutoRecloseData.OpeningCode && this.currAutoRecloseData.OpeningCode.filter(x => !x.IsCancelled).length > 0)
    || (this.code && this.code.CodeType === 'O' && !this.code.IsCancelled);
  }

  isClosingCodeCreated() {
    return (this.currAutoRecloseData.ClosingCode && this.currAutoRecloseData.ClosingCode.filter(x => !x.IsCancelled).length > 0)
    || (this.code && this.code.CodeType === 'C' && !this.code.IsCancelled);
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
    if (this.AutoRecloseForm.dirty && this.AutoRecloseForm.valid) {
      const data = this.AutoRecloseForm.getRawValue();
      this.ref.close(data);
    }
  }

  handleCloseClick() {
    this.ref.close();
  }
}
