import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterData, IOutageSelectOptions, MasterElementsData } from 'src/app/shared/models/master-data.model';
import { Logbook, LogbookViolationMessage, STATCOM, FSCTCSC } from 'src/app/shared/models/logbook.model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { CreateLogbookAction, CreateCodeAction, CancelCodeAction,
   GetReasonRemarksOptionsAction,
   GetShiftReportAction, GetEnergyReportAction} from 'src/app/store/actions';
import * as fromRoot from '../../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import * as RootActions from '../../../store/actions/logbook.actions';
import { OutageCodeData, CodeBase, CodeBaseViewModel } from 'src/app/shared/models/code-base.model';
import { DialogService, MessageService, ConfirmationService } from 'primeng/api';
import { CancelCodeDialogComponent } from 'src/app/shared/components/cancel-code-dialog/cancel-code-dialog.component';
import { ThirdPartyCodeDialogComponent } from 'src/app/shared/components/third-party-code-dialog/third-party-code-dialog.component';
import { ApprovedShutdownRequest } from 'src/app/shared/models/approved-shutdown.model';
import { OutageModel } from 'src/app/shared/models/outage.model';
import { TrippingModel } from 'src/app/shared/models/tripping.model';
import { AntiTheftModel } from 'src/app/shared/models/antiTheft.model';
import { AutoRecloseModel } from 'src/app/shared/models/auto-reclose.model';
import { FirstTimeChargeModel } from 'src/app/shared/models/first-time-charge.model';
import { LoadViewModel } from 'src/app/shared/models/load-management.model';
import { environment } from 'src/environments/environment';
import { NgxPermissionsService } from 'ngx-permissions';
import { ConstituentValue } from 'src/app/shared/models/constituent-value.model';

@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.component.html',
  styleUrls: ['./logbook.component.scss'],
  providers: [DialogService]
})
export class LogbookComponent implements OnInit, OnDestroy {
  masterData: MasterData;
  masterElements: MasterElementsData;
  logbookData: Logbook;
  ouatgeSelectOptions: IOutageSelectOptions;
  shutdownData: ApprovedShutdownRequest[];
  outageData: OutageModel[];
  autoRecloseData: AutoRecloseModel[];
  firstTimeChargeData: FirstTimeChargeModel[];
  antiTheftData: AntiTheftModel[];
  trippingData: TrippingModel[];
  violationMessageData: LogbookViolationMessage[];
  thisLogbookCodes: CodeBaseViewModel[];
  loadData: LoadViewModel[];
  loadReleaseData: LoadViewModel[];
  gridsWithRestriction: ConstituentValue[];
  statcomData: STATCOM[];
  fsctcscData: FSCTCSC[];
  logbookRequestId: string;
  isLogbookSubmitted = false;
  destroying = false;
  energyExcelURL: string;
  permission: any;
  allowLogbookUpdate = false;
  constructor(private route: ActivatedRoute,
              private store: Store<ApplicationState>,
              private actions: Actions,
              private router: Router,
              private dialogService: DialogService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private permissionsService: NgxPermissionsService) {
                this.store.dispatch(new GetReasonRemarksOptionsAction());
              }

  ngOnInit() {
    this.permission = this.permissionsService.getPermissions();
    this.masterData = this.route.snapshot.data.masterData;
    this.masterElements = this.route.snapshot.data.masterElements;
    this.store.pipe(select(fromRoot.selectCurrentLogbook),
      takeWhile(() => !this.destroying))
      .subscribe(data => {
        this.logbookData = data;
        this.logbookRequestId = this.logbookData.RequestId;
        this.energyExcelURL = environment.apiURL + 'LogbookEnergySheet/GetEnergySheet?logbookId=' + this.logbookRequestId;
        this.isLogbookSubmitted = this.logbookData.Status === 'Submitted';
        if (this.logbookData.ShutdownElements) {
          this.shutdownData = this.logbookData.ShutdownElements;
        }
        if (this.logbookData.OutageElements) {
          this.outageData = this.logbookData.OutageElements;
        }
        if (this.logbookData.AntiTheftElements) {
          this.antiTheftData = this.logbookData.AntiTheftElements;
        }
        if (this.logbookData.TrippingElements) {
          this.trippingData = this.logbookData.TrippingElements;
        }
        if (this.logbookData.ViolationMessages) {
          this.violationMessageData = this.logbookData.ViolationMessages;
        }
        if (this.logbookData.ShiftCodes) {
          this.thisLogbookCodes = this.logbookData.ShiftCodes;
        }
        if (this.logbookData.STATCOMData) {
          this.statcomData = this.logbookData.STATCOMData;
        }
        if (this.logbookData.FSCTCSCData) {
          this.fsctcscData = this.logbookData.FSCTCSCData;
        }
        if (this.logbookData.AutoRecloseData) {
          this.autoRecloseData = this.logbookData.AutoRecloseData;
        }
        if (this.logbookData.FirstTimeChargeData) {
          this.firstTimeChargeData = this.logbookData.FirstTimeChargeData;
        }
        if (this.logbookData.LoadData) {
          this.loadData = this.logbookData.LoadData;
        }
        if (this.logbookData.LoadReleaseData) {
          this.loadReleaseData = this.logbookData.LoadReleaseData;
        }
        if (this.logbookData.GridsWithRestriction) {
          this.gridsWithRestriction = this.logbookData.GridsWithRestriction;
        }
        this.allowLogbookUpdate = !this.logbookData.IsNextShiftCreated;
      });
    this.store.pipe(select(fromRoot.selectOutageMasterData),
      takeWhile(() => !this.destroying))
      .subscribe(data => {
        if (data && data.selectOptions) {
          this.ouatgeSelectOptions = data.selectOptions;
        }
      });
    this.setupSubscriptions();
  }

  setupSubscriptions() {
    this.actions.pipe(
      ofType(RootActions.LogBookActions.CREATE_LOGBOOK_SUCCESS),
      takeWhile(() => !this.destroying)
    ).subscribe(payload => {
      this.router.navigate([`/elogbook/logbook/${this.logbookData.RequestId}`]);
    });
  }

  createLogbook(data: Logbook) {
    if (data) {
      this.store.dispatch(new CreateLogbookAction(data));
    }
  }

  createCode(codeData: OutageCodeData, codeCreatedFor: string, codeCreatedFrom: string) {
    const currCode = Object.assign({}) as CodeBase;
    currCode.CodeType = codeData.codeType;
    currCode.LogbookId = this.logbookData.RequestId;
    currCode.ElementId = codeData.itemData.RequestId;
    currCode.ElementName = codeData.itemData.Name + ' (' + codeData.itemData.Description + ')';
    currCode.Type = codeCreatedFor;
    currCode.CodeCreatedFrom = codeCreatedFrom;
    if (codeData.codeType === 'TO' || codeData.codeType === 'TC'
      || codeData.codeType === 'ATO' || codeData.codeType === 'ATC') {
      // get user's input for third party code and pass same to action
      const dialogRef = this.dialogService.open(ThirdPartyCodeDialogComponent, {
        header: 'Third Party Code',
        width: '480px',
      contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
      dialogRef.onClose.pipe(
        takeWhile(() => !this.destroying)
      ).subscribe(data => {
        if (data) {
          currCode.Code = data;
          this.store.dispatch(new CreateCodeAction({code: currCode, createdFrom: codeCreatedFrom }));
        }
      });
    } else {
      this.store.dispatch(new CreateCodeAction({code: currCode, createdFrom: codeCreatedFrom }));
    }
  }

  cancelCode(codeData: CodeBase, codeDeleteFrom: string) {
    const dialogRef = this.dialogService.open(CancelCodeDialogComponent, {
      header: 'Cancel Code',
      width: '480px',
      contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
    });
    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(data => {
      if (data) {
        const currCodeData = Object.assign({}, codeData);
        currCodeData.CancelRemarks = data;
        this.store.dispatch(new CancelCodeAction({code: currCodeData, createdFrom: codeDeleteFrom}));
      }
    });
  }

  saveLogbookData(data: Logbook) {
    const logbookData = Object.assign({}, this.logbookData, data) as Logbook;
    this.store.dispatch(new RootActions.UpdateLogbookAction(logbookData));
  }

  submitLogbook(data: string) {
    // check if shift is confirmed and statistics data is filled.
    // if (!this.isStatisticsDataValid()) {
    //   this.messageService.add(
    //     { key: 'errorNotification', severity: 'error', summary: 'Submit Logbook',
    //      detail: 'Statistics details are required. Please fill all required details.', closable: true }
    //   );
    // }
    // check if shift is confirmed
    if (!this.logbookData.ShiftConfirmation) {
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Submit Logbook',
         detail: 'Please confirm shift users before submitting the logbook.', closable: true }
      );
    }
    if (this.logbookData.ShiftConfirmation) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to submit the logbook?',
        accept: () => {
          this.store.dispatch(new RootActions.SubmitLogbookAction(data));
        }
      });
    }

  }

  isStatisticsDataValid(): boolean {
    if (this.logbookData.FBDemandMaximumMW === null || this.logbookData.FBDemandMaximumTime === null
      || this.logbookData.FBDemandMinimumMW === null || this.logbookData.FBDemandMinimumTime === null
      || this.logbookData.FBFrequencyMaximumHz === null || this.logbookData.FBFrequencyMaximumTime === null
      || this.logbookData.FBFrequencyMinimumHz === null || this.logbookData.FBFrequencyMinimumTime === null) {
      return false;
    } else {
      return true;
    }
  }

  downloadReport(type: string) {
    const isExcelReport = type === 'excel';
    this.store.dispatch(new GetShiftReportAction({
      logbookId: this.logbookData.RequestId,
      isExcel: isExcelReport
    }));
  }

  downloadEnergySheet() {
    this.store.dispatch(new GetEnergyReportAction({
      logbookId: this.logbookData.RequestId
    }));
  }

  ngOnDestroy() {
    this.store.dispatch(new RootActions.ClearLogbookAction());
    this.destroying = true;
  }
}
