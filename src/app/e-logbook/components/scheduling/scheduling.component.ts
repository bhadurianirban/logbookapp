import { Component, OnInit, Input } from '@angular/core';
import { MasterData, IMasterSchedulingType } from 'src/app/shared/models/master-data.model';
import { Logbook, LogbookSchedulingDetail } from 'src/app/shared/models/logbook.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DeleteSchedulingAction, AddSchedulingAction, UpdateSchedulingAction } from 'src/app/store/actions';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit {
  @Input()
  masterData: MasterData;
  currLogbookData: Logbook;
  @Input()
  set logbookData(data: Logbook) {
    this.currLogbookData = data;
    this.bindData();
  }
  masterSchedulingTypes: IMasterSchedulingType[] = [];
  logbookSchedulingDetails: LogbookSchedulingDetail[] = [];
  clonedScheduling: { [s: string]: LogbookSchedulingDetail; } = {};
  SchedulingForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store<ApplicationState>,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.masterSchedulingTypes = this.masterData.commonMaster.schedulingTypes;
    this.SchedulingForm = this.formBuilder.group({
      SchedulingType: [{
        value: '',
        disabled: false
      }, Validators.required],
      SchedulingDetail: [{
        value: '',
        disabled: false
      }, Validators.required]
    });
    this.bindData();
  }

  bindData() {
    this.logbookSchedulingDetails = [];
    if (this.currLogbookData && this.currLogbookData.SchedulingDetails) {
      this.logbookSchedulingDetails = this.currLogbookData.SchedulingDetails.map(data => {
        const schedulingData = Object.assign({}, data);
        schedulingData.schedulingid = data.Id.toString();
        return schedulingData;
      });
    }
  }

  onRowEditInit(data: LogbookSchedulingDetail) {
    this.clonedScheduling[data.schedulingid] = {...data};
  }

  onRowEditSave(data: LogbookSchedulingDetail, index: number) {
    if (data.SchedulingDetail && data.SchedulingDetail !== '') {
      delete this.clonedScheduling[data.schedulingid];
      this.store.dispatch(new UpdateSchedulingAction(data));
    } else {
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Update Scheduling',
         detail: 'Scheduling details is required', closable: true }
      );
      this.onRowEditCancel(data, index);
    }
  }

  onRowEditCancel(data: LogbookSchedulingDetail, index: number) {
    this.logbookSchedulingDetails[index] = this.clonedScheduling[data.schedulingid];
    delete this.clonedScheduling[data.schedulingid];
  }

  onRowDelete(data: LogbookSchedulingDetail) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the item?',
      accept: () => {
        this.store.dispatch(new DeleteSchedulingAction(data));
      }
  });
  }

  addScheduling() {
    const formData = this.SchedulingForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    formData.SchedulingType = formData.SchedulingType.SchedulingType;
    this.store.dispatch(new AddSchedulingAction(formData));
    this.SchedulingForm.reset();
  }

}
