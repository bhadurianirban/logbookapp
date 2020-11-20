import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logbook } from 'src/app/shared/models/logbook.model';
import { ShiftHandoverModel } from 'src/app/shared/models/shift-user.model';
import { ApplicationState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { UpdateShiftHandoverAction, GetShiftHandoverReportAction } from 'src/app/store/actions';

@Component({
  selector: 'app-shift-handover',
  templateUrl: './shift-handover.component.html',
  styleUrls: ['./shift-handover.component.scss']
})
export class ShiftHandoverComponent implements OnInit {
  ShiftHandoverForm: FormGroup;
  currLogbookData: Logbook;
  shiftHandoverData: ShiftHandoverModel = null;
  @Input()
  set logbookData(data: Logbook) {
    this.currLogbookData = data;
    this.bindData();
  }
  radioOptions = [
    {
        id: 'Yes',
        name: 'Yes',
    },
    {
        id: 'No',
        name: 'No'
    },
];
  constructor(private formBuilder: FormBuilder,
              private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.shiftHandoverData = null;
    if (this.currLogbookData && this.currLogbookData.ShiftHandover) {
      this.shiftHandoverData = this.currLogbookData.ShiftHandover;
    }
    const selectedRadio = this.shiftHandoverData && this.shiftHandoverData.IsOutageTrippingRecorded ?
    (this.shiftHandoverData.IsOutageTrippingRecorded === 'Yes' ? 'Yes' : 'No') : null;
    this.ShiftHandoverForm = this.formBuilder.group({
      PresentSituation: [{
        value: this.shiftHandoverData ? this.shiftHandoverData.PresentSituation : null,
        disabled: false
      }, Validators.required],
      LoadCutDetails: [{
        value: this.shiftHandoverData ? this.shiftHandoverData.LoadCutDetails : null,
        disabled: false
      }, Validators.required],
      DateTelemetryDetails: [{
        value: this.shiftHandoverData ? this.shiftHandoverData.DateTelemetryDetails : null,
        disabled: false
      }, Validators.required],
      TransmissionSystemDetails: [{
        value: this.shiftHandoverData ? this.shiftHandoverData.TransmissionSystemDetails : null,
        disabled: false
      }, Validators.required],
      IsOutageTrippingRecorded: [{
        value: selectedRadio,
        disabled: false
      }, Validators.required],
      NewTransmissionOutageDetails: [{
        value: this.shiftHandoverData ? this.shiftHandoverData.NewTransmissionOutageDetails : null,
        disabled: false
      }, Validators.required],
      ImportantInformation: [{
        value: this.shiftHandoverData ? this.shiftHandoverData.ImportantInformation : null,
        disabled: false
      }, Validators.required],
      ImportantEvents: [{
        value: this.shiftHandoverData ? this.shiftHandoverData.ImportantEvents : null,
        disabled: false
      }, Validators.required]
    });
  }

  updateShiftHandover() {
    const formData = this.ShiftHandoverForm.getRawValue();
    const shiftData = Object.assign({}, formData) as ShiftHandoverModel;
    shiftData.IsOutageTrippingRecorded = shiftData.IsOutageTrippingRecorded ?
     (shiftData.IsOutageTrippingRecorded === 'Yes' ? 'Yes' : 'No') : null;
    shiftData.LogbookId = this.currLogbookData.RequestId;
    shiftData.RequestId = this.currLogbookData.ShiftHandover ? this.currLogbookData.ShiftHandover.RequestId : null;
    shiftData.Id = this.currLogbookData.ShiftHandover ? this.currLogbookData.ShiftHandover.Id : 0;
    this.store.dispatch(new UpdateShiftHandoverAction(shiftData));
  }

  downloadHandoverReport(type: string) {
    const isExcelReport = type === 'excel';
    this.store.dispatch(new GetShiftHandoverReportAction({
      logbookId: this.currLogbookData.RequestId,
      isExcel: isExcelReport
    }));
  }

}
