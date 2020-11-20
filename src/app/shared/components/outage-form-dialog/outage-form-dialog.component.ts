import { Component, OnInit } from '@angular/core';
import { MASTER_ELEMENTS_HEADERS } from '../../models/table-headers';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutageModel } from '../../models/outage.model';
import { DateFormatService } from '../../services/date-format.service';
import { CodeBaseViewModel } from '../../models/code-base.model';
import { IConstituents } from '../../models/master-data.model';

@Component({
  selector: 'app-outage-form-dialog',
  templateUrl: './outage-form-dialog.component.html',
  styleUrls: ['./outage-form-dialog.component.scss']
})
export class OutageFormDialogComponent implements OnInit {
  dateFormat = 'dd/mm/yy';
  maxDateValue = new Date();
  minRestoreDateValue = new Date();
  OutageForm: FormGroup;
  selectedColumns: any[] = [];
  dialogTableData: any[] = [];
  outageReasons: string[] = [];
  selectedOutageReasons: string[] = [];
  masterConstituents: IConstituents[] = [];
  selectedConstituent: IConstituents[] = [];
  outageRemarks: string[] = [];
  selectedOutageRemarks: string[] = [];
  restoreRemarks: string[] = [];
  selectedRestoreRemarks: string[] = [];
  currOutageData: OutageModel;
  code: CodeBaseViewModel;
  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef,
              private dateFormatService: DateFormatService) { }

  ngOnInit() {
    this.currOutageData = this.config.data.outageData;
    this.code = this.config.data.outageCode;
    this.masterConstituents = this.config.data.constituents;
    const selectOptions =  this.config.data.outageSelectOptions;
    if (selectOptions) {
      this.outageReasons = selectOptions.Reasons ? selectOptions.Reasons : [];
      this.outageRemarks = selectOptions.Remarks ? selectOptions.Remarks : [];
      this.restoreRemarks = selectOptions.RestoreRemarks ? selectOptions.RestoreRemarks : [];
    }
    const constituent = this.currOutageData.Constituent > 0 ?
      this.masterConstituents.find(x => x.Id === this.currOutageData.Constituent) : null;
    if (this.currOutageData.LogDate) {
      this.minRestoreDateValue = this.dateFormatService.getDateFromString(this.currOutageData.LogDate);
    }
        // create form group
    this.OutageForm = this.formBuilder.group({
        LogDate: [{
          value: this.dateFormatService.getDateFromString(this.currOutageData.LogDate),
          disabled: false
        }, Validators.required],
        LogTime: [{
          value: this.currOutageData.LogTime,
          disabled: false
        },  Validators.required],
        Constituent: [{
          value: constituent,
          disabled: false
        }],
        RestoreDate: [{
          value: this.dateFormatService.getDateFromString(this.currOutageData.RestoreDate),
          disabled: !this.isClosingCodeCreated()
        }],
        RestoreTime: [{
          value: this.currOutageData.RestoreTime,
          disabled: !this.isClosingCodeCreated()
        }],
        Reason: [{
          value: this.currOutageData.Reason ? this.currOutageData.Reason.split('$') : null,
          disabled: false
        }, Validators.required],
        Remarks: [{
          value: this.currOutageData.Remarks ? this.currOutageData.Remarks.split('$') : null,
          disabled: false
          }],
        RestoredRemarks: [{
          value: this.currOutageData.RestoredRemarks ? this.currOutageData.RestoredRemarks.split('$') : null,
          disabled: !this.isClosingCodeCreated()
        }],
        ClearanceComment: [{
          value: this.currOutageData.ClearanceComment,
          disabled: true
        }]
    });
    this.selectedColumns = MASTER_ELEMENTS_HEADERS;
    this.dialogTableData = this.config.data.outageArrayData;
    this.updateValidators();
  }

  updateValidators() {
    if (this.currOutageData &&  this.currOutageData.ClosingCode
       && this.currOutageData.ClosingCode.length > 0) {
      this.OutageForm.controls.RestoreDate.setValidators([Validators.required]);
      this.OutageForm.controls.RestoreTime.setValidators([Validators.required]);
      this.OutageForm.controls.RestoredRemarks.setValidators([Validators.required]);
    } else {
      this.OutageForm.controls.RestoreDate.setValidators([]);
      this.OutageForm.controls.RestoreTime.setValidators([]);
      this.OutageForm.controls.RestoredRemarks.setValidators([]);
    }
    this.OutageForm.controls.RestoreDate.updateValueAndValidity();
    this.OutageForm.controls.RestoreTime.updateValueAndValidity();
    this.OutageForm.controls.RestoredRemarks.updateValueAndValidity();
  }

  isOpeningCodeCreated() {
    return (this.currOutageData.OpeningCode && this.currOutageData.OpeningCode.filter(x => !x.IsCancelled).length > 0)
     || (this.code && this.code.CodeType === 'O' && !this.code.IsCancelled);
  }

  isClosingCodeCreated() {
    return (this.currOutageData.ClosingCode && this.currOutageData.ClosingCode.filter(x => !x.IsCancelled).length > 0)
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
      case 'constituent':
        this.selectedConstituent = this.masterConstituents.filter(x => x.Name.toLowerCase().includes(event.query.toString().toLowerCase()));
        break;
    }
  }

  handleSubmitClick() {
    if (this.OutageForm.dirty && this.OutageForm.valid) {
      const data = this.OutageForm.getRawValue();
      this.ref.close(data);
    }
  }

  handleCloseClick() {
    this.ref.close();
  }

}
