import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService, ConfirmationService} from 'primeng/api';
import { IDashboard } from '../shared/models/dashboard-model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../store/state';
import { GetDashboardDataAction, GetCommonMasterDataAction,
   GetReasonRemarksOptionsAction, CancelCodeAction, CreateCodeAction,
   GetPendingCodesAction, GetShiftReportAction, CaptureTieLineAction } from '../store/actions';
import * as fromRoot from '../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { ApprovedShutdownRequest } from '../shared/models/approved-shutdown.model';
import { OutageModel } from '../shared/models/outage.model';
import { TrippingModel } from '../shared/models/tripping.model';
import { IOutageSelectOptions, MasterData } from '../shared/models/master-data.model';
import { LogbookViolationMessage, STATCOM, FSCTCSC } from '../shared/models/logbook.model';
import { CodeBase, CodeBaseViewModel } from '../shared/models/code-base.model';
import { CancelCodeDialogComponent } from '../shared/components/cancel-code-dialog/cancel-code-dialog.component';
import { ThirdPartyCodeDialogComponent } from '../shared/components/third-party-code-dialog/third-party-code-dialog.component';
import { AntiTheftModel } from '../shared/models/antiTheft.model';
import { AutoRecloseModel } from '../shared/models/auto-reclose.model';
import { FirstTimeChargeModel } from '../shared/models/first-time-charge.model';
import * as moment from 'moment';
import { DayWiseTieLine } from '../shared/models/load-management.model';
import { ConstituentValue } from '../shared/models/constituent-value.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DialogService]
})
export class DashboardComponent implements OnInit, OnDestroy {
  dashboardData: IDashboard;
  destroying = false;
  shutdownData: ApprovedShutdownRequest[] = [];
  outageData: OutageModel[] = [];
  antiTheftData: AntiTheftModel[] = [];
  trippingData: TrippingModel[] = [];
  violationMessageData: LogbookViolationMessage[] = [];
  ouatgeSelectOptions: IOutageSelectOptions;
  masterData: MasterData;
  statcomData: STATCOM[] = [];
  fsctcscData: FSCTCSC[] = [];
  pendingCodes: CodeBaseViewModel[] = [];
  autoRecloseData: AutoRecloseModel[] = [];
  firstTimeChargeData: FirstTimeChargeModel[] = [];
  currDate = moment().format('LLLL');
  index: number;
  tieLineData: DayWiseTieLine[] = [];
  gridsWithRestriction: ConstituentValue[] = [];
  totalRestriction = 0;

  constructor(private store: Store<ApplicationState>,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService) {
    this.store.dispatch(new GetDashboardDataAction());
    this.store.dispatch(new GetCommonMasterDataAction());
    this.store.dispatch(new GetReasonRemarksOptionsAction());
    this.store.dispatch(new GetPendingCodesAction());
    this.checkForPendingItems();
  }

  ngOnInit() {
      this.store.pipe(select(fromRoot.selectCommonMasterData),
      takeWhile(() => !this.destroying))
      .subscribe(data => {
        if (data) {
          this.masterData = data;
        }
      });
      this.store.pipe(select(fromRoot.selectOutageMasterData),
      takeWhile(() => !this.destroying))
      .subscribe(data => {
        if (data && data.selectOptions) {
          this.ouatgeSelectOptions = data.selectOptions;
        }
      });
      this.store.pipe(select(fromRoot.selectDashboardData),
      takeWhile(() => !this.destroying))
      .subscribe(data => {
          this.dashboardData = data;
          this.bindData();
      });
      setInterval(() => {
        this.store.dispatch(new GetPendingCodesAction());
        this.checkForPendingItems();
      }, 1800000);
      // setInterval(() => {
      //   if (new Date().getMinutes() === 15) {
      //     const currTime = moment().format('HH:mm:ss');
      //     this.store.dispatch(new CaptureTieLineAction(currTime));
      //   }
      // }, 60000);
  }

  checkForPendingItems() {
    this.store.pipe(select(fromRoot.selectCodeRepository),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data && data.pendingCodes) {
        this.pendingCodes = data.pendingCodes;
        if (this.pendingCodes.length > 0) {
          this.confirmationService.confirm({
            header: 'Pending Actions from last shift!!',
            icon: 'pi pi-exclamation-triangle',
            message: `You have pending actions from last shift. Please clear these items in order to submit the current logbook.
            Do you want to navigate to pending actions view?`,
            accept: () => {
              this.change(8);
            }
        });
        }
      }
    });
  }

  bindData() {
    if (this.dashboardData && this.dashboardData.OutageElements) {
      this.outageData = this.dashboardData.OutageElements;
    }
    if (this.dashboardData && this.dashboardData.AntiTheftElements) {
        this.antiTheftData = this.dashboardData.AntiTheftElements;
    }
    if (this.dashboardData && this.dashboardData.TrippingElements) {
      this.trippingData = this.dashboardData.TrippingElements;
    }
    if (this.dashboardData && this.dashboardData.ShutdownElements) {
      this.shutdownData = this.dashboardData.ShutdownElements;
    }
    if (this.dashboardData && this.dashboardData.ViolationMessages) {
      this.violationMessageData = this.dashboardData.ViolationMessages;
    }
    if (this.dashboardData && this.dashboardData.STATCOMData) {
      this.statcomData = this.dashboardData.STATCOMData;
    }
    if (this.dashboardData && this.dashboardData.FSCTCSCData) {
      this.fsctcscData = this.dashboardData.FSCTCSCData;
    }
    if (this.dashboardData && this.dashboardData.AutoRecloseData) {
      this.autoRecloseData = this.dashboardData.AutoRecloseData;
    }
    if (this.dashboardData && this.dashboardData.FirstTimeChargeData) {
      this.firstTimeChargeData = this.dashboardData.FirstTimeChargeData;
    }
    if (this.dashboardData && this.dashboardData.TieLines) {
      this.tieLineData = this.dashboardData.TieLines;
    }
    if (this.dashboardData && this.dashboardData.GridsWithRestriction) {
      this.gridsWithRestriction = this.dashboardData.GridsWithRestriction;
      this.totalRestriction = 0;
      this.gridsWithRestriction.forEach(element => {
        this.totalRestriction += element.Restriction;
      });
    }
  }

  createCode(codeData: any, codeCreatedFor: string, codeCreatedFrom: string) {
    const currCode = Object.assign({}) as CodeBase;
    currCode.CodeType = codeData.codeType;
    currCode.ElementId = codeData.itemData.RequestId;
    currCode.ElementName = codeData.itemData.ElementName + ' (' + codeData.itemData.ElementDescription + ')';
    currCode.Type = codeCreatedFor;
    currCode.CodeCreatedFrom = codeCreatedFrom;
    currCode.LogbookId = codeData.itemData.LogbookId;
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
          this.store.dispatch(new CreateCodeAction({code: currCode,
             createdFrom: codeCreatedFrom }));
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

  downloadReport(type: string) {
    const isExcelReport = type === 'excel';
    this.store.dispatch(new GetShiftReportAction({
      logbookId: '',
      isExcel: isExcelReport
    }));
  }

  change(index: number): void {
    this.index = index;
  }

  ngOnDestroy() {
    this.destroying = true;
  }
}
