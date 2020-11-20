import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrippingModel } from '../../models/tripping.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { DateFormatService } from '../../services/date-format.service';
import { MASTER_ELEMENTS_HEADERS } from '../../models/table-headers';
import { CodeBaseViewModel } from '../../models/code-base.model';

@Component({
  selector: 'app-tripping-form-dialog',
  templateUrl: './tripping-form-dialog.component.html',
  styleUrls: ['./tripping-form-dialog.component.scss']
})
export class TrippingFormDialogComponent implements OnInit {
  dateFormat = 'dd/mm/yy';
  maxDateValue = new Date();
  minRestoreDateValue = new Date();
  TrippingForm: FormGroup;
  selectedColumns: any[] = [];
  dialogTableData: any[] = [];
  currTrippingData: TrippingModel;
  natures: string[] = [];
  currLabel = 'Add';
  code: CodeBaseViewModel;

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef,
              private dateFormatService: DateFormatService) { }

  ngOnInit() {
    this.currTrippingData = this.config.data.trippingData;
    this.code = this.config.data.trippingCode;
    this.natures = this.config.data.natureArray;
    this.currLabel = this.config.data.isUpdate ? 'Update' : 'Add';
    if (this.currTrippingData.TripDate) {
      this.minRestoreDateValue = this.dateFormatService.getDateFromString(this.currTrippingData.TripDate);
    }
    this.TrippingForm = this.formBuilder.group({
      TripDate: [{
        value: this.dateFormatService.getDateFromString(this.currTrippingData.TripDate),
        disabled: false
      }, Validators.required],
      TripTime: [{
        value: this.currTrippingData.TripTime,
        disabled: false
      }, Validators.required],
      ExpectedDate: [{
        value: this.dateFormatService.getDateFromString(this.currTrippingData.ExpectedDate),
        disabled: false
      }],
      RevivalDate: [{
        value: this.dateFormatService.getDateFromString(this.currTrippingData.RevivalDate),
        disabled: !this.isClosingCodeCreated()
      }],
      RevivalTime: [{
        value: this.currTrippingData.RevivalTime,
        disabled: !this.isClosingCodeCreated()
      }],
      Nature: [
        {
          value: this.currTrippingData.Nature,
          disabled: false
        }, Validators.required],
      EndRelayReasonOne: [{
        value: this.currTrippingData.EndRelayReasonOne,
        disabled: false
      }, Validators.required],
      EndRelayReasonTwo: [{
        value: this.currTrippingData.EndRelayReasonTwo,
        disabled: false
      }],
      LoadAffectedMW: [{
        value: this.currTrippingData.LoadAffectedMW,
        disabled: false
      }],
      GenerationEffectedMW: [{
        value: this.currTrippingData.GenerationEffectedMW,
        disabled: false
      }],
      AffectedArea: [{
        value: this.currTrippingData.AffectedArea,
        disabled: false
      }],
      AffectedPlant: [{
        value: this.currTrippingData.AffectedPlant,
        disabled: false
      }],
      ClearanceComment: [{
        value: this.currTrippingData.ClearanceComment,
        disabled: false
      }]
    });
    this.selectedColumns = MASTER_ELEMENTS_HEADERS;
    this.dialogTableData = this.config.data.trippingArrayData;
    this.updateValidators();
  }

  updateValidators() {
    if ((this.currTrippingData && this.currTrippingData.ClosingCode &&
       this.currTrippingData.ClosingCode.length > 0)
        || (this.code && this.code.CodeType === 'C' && !this.code.IsCancelled)) {
      this.TrippingForm.get('RevivalDate').setValidators([Validators.required]);
      this.TrippingForm.get('RevivalTime').setValidators([Validators.required]);
    } else {
      this.TrippingForm.get('RevivalDate').setValidators([]);
      this.TrippingForm.get('RevivalTime').setValidators([]);
    }
    if ((this.currTrippingData && this.currTrippingData.ClosingCode &&
      this.currTrippingData.ClosingCode.length > 0)
      || (this.code && this.code.CodeType === 'C' && !this.code.IsCancelled)) {
      this.TrippingForm.get('RevivalDate').enable();
      this.TrippingForm.get('RevivalTime').enable();
    } else {
      this.TrippingForm.get('RevivalDate').disable();
      this.TrippingForm.get('RevivalTime').disable();
    }
    this.TrippingForm.get('RevivalDate').updateValueAndValidity();
    this.TrippingForm.get('RevivalTime').updateValueAndValidity();
  }

  isClosingCodeCreated() {
    return (this.currTrippingData.ClosingCode && this.currTrippingData.ClosingCode.filter(x => !x.IsCancelled).length > 0)
    || (this.code && this.code.CodeType === 'C' && !this.code.IsCancelled);
  }

  isTrippingTypeUnit() {
    return this.currTrippingData.Type === 8;
  }

  handleSubmitClick() {
    if (this.TrippingForm.dirty && this.TrippingForm.valid) {
      const data = this.TrippingForm.getRawValue();
      this.ref.close(data);
    }
  }

  handleCloseClick() {
    this.ref.close();
  }
}
