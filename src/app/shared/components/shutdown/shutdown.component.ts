import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { DialogService, ConfirmationService, MenuItem } from 'primeng/api';
import { ApprovedShutdownRequest } from '../../models/approved-shutdown.model';
import { ApplicationState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { DateFormatService } from '../../services/date-format.service';
import { SHUTDOWN_HEADERS } from '../../models/table-headers';
import { CodeBase } from '../../models/code-base.model';
import { ShutdownFormDialogComponent } from '../shutdown-form-dialog/shutdown-form-dialog.component';
import { takeWhile } from 'rxjs/operators';
import { UpdateApprovedShutdownAction, DeferShutdownAction, RefreshShutdownAction, DownloadApprovalAction } from 'src/app/store/actions';
import { DeferShutdownDialogComponent } from '../defer-shutdown-dialog/defer-shutdown-dialog.component';

@Component({
  selector: 'app-shutdown',
  templateUrl: './shutdown.component.html',
  styleUrls: ['./shutdown.component.scss'],
  providers: [DialogService]
})
export class ShutdownComponent implements OnInit, OnDestroy {
  @Output() createNewCode: EventEmitter<any> = new EventEmitter();
  @Output() cancelCurrentCode: EventEmitter<any> = new EventEmitter();
  currApprovedShutdowns: ApprovedShutdownRequest[];
  @Input()
  set thisShutdownData(data: ApprovedShutdownRequest[]) {
    this.currApprovedShutdowns = data;
    this.setShutdownData();
  }
  @Input()
  isDashboardUpdate: boolean;
  @Input()
  isLogbookSubmitted: boolean;
  @Input()
  logbookId: string;
  @Input()
  IsHistoryView: boolean;
  shutdownColumns: any[] = [];
  shutdownData: ApprovedShutdownRequest[] = [];
  destroying = false;
  constructor(public dialogService: DialogService,
              private store: Store<ApplicationState>,
              private confirmationService: ConfirmationService,
              private dateFormatService: DateFormatService) { }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.shutdownColumns = SHUTDOWN_HEADERS;
  }

  setShutdownData() {
    if (this.currApprovedShutdowns) {
      this.shutdownData = this.currApprovedShutdowns
      .map(x => this.prepareActions(x));
      this.shutdownData = this.shutdownData.sort((l1, l2) => {
        const l1Date = l1.PlannedOutage ? l1.PlannedOutage.split(' ')[0].split('/').reverse().join() : '';
        const l2Date = l2.PlannedOutage ? l2.PlannedOutage.split(' ')[0].split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
    }
  }

  createCode(data: ApprovedShutdownRequest, type: string) {
    const codeData = {
      itemData: data,
      codeType: type
    };
    this.createNewCode.emit(codeData);
  }

  cancelCode(codeData: CodeBase) {
    this.cancelCurrentCode.emit(codeData);
  }

  prepareActions(shutdownData: ApprovedShutdownRequest): ApprovedShutdownRequest {
    const currData = Object.assign({}, shutdownData);
    const menuItems: MenuItem[] = [];
    if (!currData.ActualOutageDate && !this.IsHistoryView) {
      if (!currData.OpeningCode || (currData.OpeningCode && currData.OpeningCode.filter(x => !x.IsCancelled).length === 0)) {
        menuItems.push(
          {label: 'Create Opening Code', icon: 'pi pi-sign-in', command: () => {
            this.createCode(currData, 'O');
          }}
        );
      }
      menuItems.push(
        {label: 'Create Third Party Opening Code', icon: 'pi pi-clone', command: () => {
          this.createCode(currData, 'TO');
        }}
      );
    }
    if (currData.ActualOutageDate && !currData.ActualRestoreDate && !this.IsHistoryView) {
      if (!currData.ClosingCode || (currData.ClosingCode && currData.ClosingCode.filter(x => !x.IsCancelled).length === 0)) {
        menuItems.push(
        {label: 'Create Closing Code', icon: 'pi pi-sign-out', command: () => {
          this.createCode(currData, 'C');
        }});
      }
      menuItems.push(
      {label: 'Create Third Party Closing Code', icon: 'pi pi-key', command: () => {
        this.createCode(currData, 'TC');
      }});
    }

    if (!currData.OpeningCode
       || (currData.OpeningCode && currData.OpeningCode.filter(x => !x.IsCancelled).length === 0)) {
      menuItems.push(
        {label: 'Defer', icon: 'pi pi-arrow-circle-up', command: () => {
          this.deferShutdown(currData);
        }});
    }

    // menuItems.push(
    //   {label: 'Download', icon: 'pi pi-cloud-download', command: () => {
    //     this.downloadApprovalPDF(currData.ElementId);
    //   }}
    // );

    currData.menuItems = menuItems;
    // map columns
    if (currData.ActualOutageDate && currData.ActualOutageTime) {
      currData.ActualOutage = `${currData.ActualOutageDate} ${currData.ActualOutageTime}`;
    }
    if (currData.ActualRestoreDate && currData.ActualRestoreTime) {
      currData.ActualRestore = `${currData.ActualRestoreDate} ${currData.ActualRestoreTime}`;
    }
    currData.shutdownrequestid = currData && currData.Id ? currData.Id.toString() : '';
    return currData;
  }

  deferShutdown(data: ApprovedShutdownRequest) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to defer the selected shutdown?',
      accept: () => {
        const dialogRef = this.dialogService.open(DeferShutdownDialogComponent, {
          header: 'Defer Shutdown',
          width: '480px',
          contentStyle: {border: '1px solid #b1b2b3',
          'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
          'padding-right': '3px !important', 'background-color': '#ffffff !important',
          background: '#fff', color: '#000'}
        });
        dialogRef.onClose.pipe(
          takeWhile(() => !this.destroying)
        ).subscribe(formData => {
          if (formData) {
            data.IsHistoryUpdate = this.IsHistoryView;
            data.DeferComments = formData;
            this.store.dispatch(new DeferShutdownAction(data));
          }
        });
      }
    });
  }

  downloadApprovalPDF(requestId: number) {
    this.store.dispatch(new DownloadApprovalAction(requestId));
  }

  openSelectedRecord(data: ApprovedShutdownRequest) {
    const dialogRef = this.dialogService.open(ShutdownFormDialogComponent,
      {
        data: {
          shutdownData: data,
        },
        header: 'Approved Shutdown',
        width: '980px',
      contentStyle: { border: '1px solid #b1b2b3',
                    'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
                    'padding-right': '3px !important', 'background-color': '#ffffff !important',
                    background: '#fff', color: '#000'}
      });

    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const thisShutdownData = Object.assign({}, data, item) as ApprovedShutdownRequest;
        thisShutdownData.IsDashboardUpdate = this.isDashboardUpdate;
        thisShutdownData.IsHistoryUpdate = this.IsHistoryView;
        thisShutdownData.ActualOutageDate = this.dateFormatService.getStringDate(thisShutdownData.ActualOutageDate);
        thisShutdownData.ActualOutageTime = thisShutdownData.ActualOutageTime;
        thisShutdownData.ActualRestoreDate = this.dateFormatService.getStringDate(thisShutdownData.ActualRestoreDate);
        thisShutdownData.ActualRestoreTime = thisShutdownData.ActualRestoreTime;
        this.store.dispatch(new UpdateApprovedShutdownAction(thisShutdownData));
      }
    });
  }

  refreshShutdowns() {
    this.store.dispatch(new RefreshShutdownAction(
      { logbookId: this.logbookId, isIntervalCall: false, isDashBoardCall: false}));
  }

  isCancelCodeEnabled(rowData: ApprovedShutdownRequest, codeType: string): boolean {
    if (rowData) {
      switch (codeType) {
        case 'O':
        case 'TO':
          return rowData.ActualOutageDate === null || rowData.ActualOutageTime === null;
        case 'C':
        case 'TC':
          return rowData.ActualRestoreDate === null || rowData.ActualRestoreTime === null;
      }
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.destroying = true;
  }
}
