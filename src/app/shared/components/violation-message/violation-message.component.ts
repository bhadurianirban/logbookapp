import { Component, OnInit, Input } from '@angular/core';
import { MasterData, IViolationMaster, IConstituents, ISubViolationMaster } from 'src/app/shared/models/master-data.model';
import { LogbookViolationMessage } from 'src/app/shared/models/logbook.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApplicationState } from 'src/app/store/state';
import { Store, select } from '@ngrx/store';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AddViolationMessageAction,
   DeleteViolationMessageAction, DownloadViolationMessageAction, UpdateViolationMessageAction } from 'src/app/store/actions';
import * as fromRoot from '../../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { IScadaData } from 'src/app/shared/models/scada-data.model';

@Component({
  selector: 'app-violation-message',
  templateUrl: './violation-message.component.html',
  styleUrls: ['./violation-message.component.scss']
})
export class ViolationMessageComponent implements OnInit {
  @Input()
  masterData: MasterData;
  currMessages: LogbookViolationMessage[];
  @Input()
  set violationMessageData(data: LogbookViolationMessage[]) {
    this.currMessages = data;
    this.bindData();
  }
  @Input()
  IsDashboardView: boolean;
  masterViolationTypes: IViolationMaster[] = [];
  masterConstituents: IConstituents[] = [];
  selectedConstituents: IConstituents[] = [];
  masterSubViolationTypes: ISubViolationMaster[] = [];
  MessageForm: FormGroup;
  currViolationMessage: LogbookViolationMessage[] = [];
  stateDeviation: IScadaData[] = [];
  showScadaData = false;
  showSubViolationType = false;
  destroying = false;
  selectedConstituent: string;
  clonedMessage: { [s: string]: LogbookViolationMessage; } = {};
  @Input()
  logbookId: string;
  constituentList: string[] = [];
  constructor(private formBuilder: FormBuilder,
              private store: Store<ApplicationState>,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    if (this.masterData && this.masterData.commonMaster) {
      this.masterViolationTypes = this.masterData.commonMaster.violationTypes;
      this.masterConstituents = this.masterData.commonMaster.constituents;
      this.masterSubViolationTypes = this.masterData.commonMaster.subViolationTypes;
    }
    this.MessageForm = this.formBuilder.group({
      ViolationType: [{
        value: '',
        disabled: false
      }, Validators.required],
      Constituent: [{
        value: '',
        disabled: false
      }, Validators.required],
      SubViolationType: [{
        value: '',
        disabled: false
      }],
      Message: [{
        value: '',
        disabled: false
      }, Validators.required]
    });

    this.store.pipe(select(fromRoot.selectStateDeviation),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data && data.deviation) {
        this.stateDeviation = [data.deviation];
      }
    });
  }

  bindData() {
    if (this.MessageForm) {
      this.MessageForm.reset();
    }
    this.stateDeviation = [];
    if (this.currMessages) {
      this.currViolationMessage = this.currMessages
      .map(data => {
        const currData = this.prepareActions(data);
        currData.messageid = data.Id.toString();
        return currData;
      });
    }
  }

  onViolationTypeChange(data: any) {
    if (data) {
      const thisViolationType = this.MessageForm.get('ViolationType').value;
      if (thisViolationType.ViolationType === 'DEVIATION' || thisViolationType.ViolationType === 'ZERO CROSSING') {
        this.showSubViolationType = true;
        this.MessageForm.controls.SubViolationType.setValidators([Validators.required]);
        this.MessageForm.controls.SubViolationType.updateValueAndValidity();
      } else {
        this.showSubViolationType = false;
        this.MessageForm.controls.SubViolationType.setValidators([]);
        this.MessageForm.controls.SubViolationType.updateValueAndValidity();
      }
    }
  }

  addMessage() {
    if (this.MessageForm.valid) {
      const dataToSave = Object.assign({}) as LogbookViolationMessage;
      const formData = this.MessageForm.getRawValue();
      dataToSave.LogbookId = this.logbookId;
      dataToSave.ViolationType = formData.ViolationType.ViolationType;
      dataToSave.SubViolationType = formData.SubViolationType ? formData.SubViolationType.Name : null;
      dataToSave.Constituent = this.constituentList.join(', ');
      dataToSave.Message = formData.Message;
      if (this.stateDeviation.length > 0) {
        const deviationData = this.stateDeviation[0];
        dataToSave.ScheduleMW = deviationData.Scheduled;
        dataToSave.ActualMW = deviationData.Actual;
        dataToSave.ActualDeviationMW = deviationData.Deviation;
        dataToSave.AreaControlErrorMW = deviationData.Scheduled;
        dataToSave.Desired = deviationData.Actual.toString();
      }
      this.store.dispatch(new AddViolationMessageAction(dataToSave));
    } else {
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Add Violation Message',
         detail: 'Please provide all required fields.', closable: true }
      );
    }
  }

  prepareActions(data: LogbookViolationMessage): LogbookViolationMessage {
    const currData = Object.assign({}, data);
    if (!this.IsDashboardView) {
      const menuItems = [
        {label: 'Delete', icon: 'pi pi-trash', command: () => {
          this.deleteItem(currData);
        }}
      ];
      currData.menuItems = menuItems;
    }
    return currData;
  }

  deleteItem(data: LogbookViolationMessage) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the item?',
      accept: () => {
        this.store.dispatch(new DeleteViolationMessageAction(data));
      }
    });
  }

  downloadPDF(data: LogbookViolationMessage) {
    if (data) {
      this.store.dispatch(new DownloadViolationMessageAction(data.RequestId));
    }
  }

  onRowEditInit(data: LogbookViolationMessage) {
    this.clonedMessage[data.messageid] = {...data};
  }

  onRowEditCancel(data: LogbookViolationMessage, index: number) {
    this.currViolationMessage[index] = this.clonedMessage[data.messageid];
    delete this.clonedMessage[data.messageid];
  }

  onRowEditSave(data: LogbookViolationMessage, index: number) {
    if (data.Message && data.Message !== '') {
      delete this.clonedMessage[data.messageid];
      this.store.dispatch(new UpdateViolationMessageAction(data));
    } else {
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Update Violation Message',
         detail: 'Violation Message is required', closable: true }
      );
      this.onRowEditCancel(data, index);
    }
  }

  searchConstituent(event) {
    this.selectedConstituents = this.masterConstituents.filter(x => x.Name.toLowerCase().includes(event.query.toString().toLowerCase()));
  }

  onConstituentSelect(data: IConstituents) {
    this.constituentList.push(data.Name);
  }
}
