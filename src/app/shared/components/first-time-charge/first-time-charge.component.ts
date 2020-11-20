import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MasterData, MasterElementsData, IOutageSelectOptions } from '../../models/master-data.model';
import { FirstTimeChargeModel } from '../../models/first-time-charge.model';
import { DialogService, ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { ApplicationState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { DateFormatService } from '../../services/date-format.service';
import { FIRST_TIME_CHARGE_HEADERS, FTC_ELEMENTS_HEADERS } from '../../models/table-headers';
import { MasterDataTypes } from '../../models/master-data-types';
import { CodeBase } from '../../models/code-base.model';
import { FirstTimeChargeDialogComponent } from '../first-time-charge-dialog/first-time-charge-dialog.component';
import { takeWhile } from 'rxjs/operators';
import { AddFirstTimeChargeAction, UpdateFirstTimeChargeAction, DeleteFirstTimeChargeAction } from 'src/app/store/actions';

@Component({
  selector: 'app-first-time-charge',
  templateUrl: './first-time-charge.component.html',
  styleUrls: ['./first-time-charge.component.scss'],
  providers: [DialogService]
})
export class FirstTimeChargeComponent implements OnInit, OnDestroy {
  @Output() createNewCode: EventEmitter<any> = new EventEmitter();
  @Output() cancelCurrentCode: EventEmitter<any> = new EventEmitter();
  @Input()
  masterData: MasterData;
  currFirstTimeChargeData: FirstTimeChargeModel[];
  @Input()
  set firstTimeChargeData(data: FirstTimeChargeModel[]) {
    this.currFirstTimeChargeData = data;
    this.setFirstTimeChargeData();
  }
  @Input()
  selectOptions: IOutageSelectOptions;
  @Input()
  IsHistoryView: boolean;
  @Input()
  isDashboardUpdate: boolean;
  @Input()
  logbookId: string;
  @Input()
  elementsData: MasterElementsData;
  @Input()
  showSearchPanel: boolean;
  tableData: FirstTimeChargeModel[] = [];
  // @Input()
  // logbookData: Logbook;
  selectedRows: FirstTimeChargeModel[] = [];
  selectedColumns: any[] = [];
  firstTimeChargeColumns: any[] = [];
  expand = false;
  firstTimeChargeType: number;
  lineData: FirstTimeChargeModel[] = [];
  destroying = false;
  constructor(public dialogService: DialogService,
              private store: Store<ApplicationState>,
              private confirmationService: ConfirmationService,
              private dateFormatService: DateFormatService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.bindData();
  }

  bindData(): void {
    // get master data and filter based on tab
    this.selectedColumns = FTC_ELEMENTS_HEADERS;
    this.firstTimeChargeColumns = FIRST_TIME_CHARGE_HEADERS;
    this.getData(MasterDataTypes.FIRSTTIMECHARGE);
    this.firstTimeChargeType = MasterDataTypes.FIRSTTIMECHARGE;
  }

  getData(type: number): void {
    this.firstTimeChargeType = type;
    if (!this.isDashboardUpdate && this.elementsData && this.elementsData.masterElements) {
       this.tableData = this.elementsData.masterElements.firstTimeChargeData;
    }
  }

  add() {
    if (this.selectedRows && this.selectedRows.length > 0) {
      const data: FirstTimeChargeModel[] = [];
      this.selectedRows.forEach(element => {
        const currData = new FirstTimeChargeModel();
        currData.EntityId = element.EntityId;
        currData.Name = element.Name;
        currData.Description = element.Description;
        currData.RegionId = element.RegionId,
        currData.RequestedDate = element.RequestedDate,
        currData.ChargeDate = element.ChargeDate,
        currData.Owner = element.Owner,
        currData.LogbookId = this.logbookId;
        data.push(currData);
      });
      this.store.dispatch(new AddFirstTimeChargeAction(data));
    } else {
      // show select data message
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Add line',
         detail: 'Please select at least one row to add first time charge line data.', closable: true }
      );
    }
  }

  setFirstTimeChargeData() {
    if (this.currFirstTimeChargeData) {
      this.lineData = this.currFirstTimeChargeData
      .filter(x => x.Id)
      .map(data => {
          const currData = this.prepareActions(data);
          return currData;
      });
    }
  }

  TogglePanel(): void {
    this.expand = !this.expand;
  }

  createCode(data: FirstTimeChargeModel, type: string) {
    const codeData = {
      itemData: data,
      codeType: type
    };
    this.createNewCode.emit(codeData);
  }

  cancelCode(codeData: CodeBase) {
    this.cancelCurrentCode.emit(codeData);
  }

  openSelectedRecord(data: FirstTimeChargeModel) {
    const currFirstTimeChargeUpdateData = [data];
    const dialogRef = this.dialogService.open(FirstTimeChargeDialogComponent,
      {
        data: {
          firstTimeChargeArrayData: currFirstTimeChargeUpdateData,
          firstTimeChargeData: data,
          firstTimeChargeSelectOptions: this.selectOptions
        },
        header: 'First Time Charge',
        width: '980px',
      contentStyle: {border: '1px solid #171616',
                    'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
                    'padding-right': '3px !important', background: '#fff', color: '#000'}
      });

    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const thisFirstTimeChargeData = Object.assign({}, data, item) as FirstTimeChargeModel;
        const reasons = item.Reason as any;
        const remarks = item.Remarks as any;
        const restoreRemarks = item.RestoredRemarks as any;
        thisFirstTimeChargeData.IsDashboardUpdate = this.isDashboardUpdate;
        thisFirstTimeChargeData.IsHistoryUpdate = this.IsHistoryView;
        thisFirstTimeChargeData.RestoreDate = this.dateFormatService.getStringDate(thisFirstTimeChargeData.RestoreDate);
        thisFirstTimeChargeData.RestoreTime = thisFirstTimeChargeData.RestoreTime;
        thisFirstTimeChargeData.RestoredRemarks = restoreRemarks ? restoreRemarks.join('$') : null;
        this.store.dispatch(new UpdateFirstTimeChargeAction(thisFirstTimeChargeData));
      }
    });
  }

  deleteFirstTimeChargeItem(data: FirstTimeChargeModel) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the item?',
        accept: () => {
          data.IsHistoryUpdate = this.IsHistoryView;
          this.store.dispatch(new DeleteFirstTimeChargeAction(data));
        }
    });
  }

  prepareActions(data: FirstTimeChargeModel): FirstTimeChargeModel {
    const currData = Object.assign({}, data);
    const menuItems: MenuItem[] = [];
    if (currData.RestoredRemarks) {
      currData.restoreRemarksViewOnly = currData.RestoredRemarks.split('$').join('; ');
    }
    if (!currData.RestoreDate && !this.IsHistoryView) {
      if (!currData.ClosingCode || (currData.ClosingCode && currData.ClosingCode.filter(x => !x.IsCancelled).length === 0)) {
        menuItems.push( {label: 'Create Closing Code', icon: 'pi pi-sign-out', command: () => {
          this.createCode(currData, 'C');
        }});
      }
      menuItems.push(
      {label: 'Create Third Party Closing Code', icon: 'pi pi-key', command: () => {
        this.createCode(currData, 'TC');
      }});
    }

    if (!currData.ClosingCode || (currData.ClosingCode && currData.ClosingCode.filter(x => !x.IsCancelled).length === 0)) {
      menuItems.push(
        {label: 'Delete', icon: 'pi pi-trash', command: () => {
          this.deleteFirstTimeChargeItem(currData);
        }});
    }

    currData.menuItems = menuItems;
    currData.firsttimechargerequestid = currData.Id.toString();
    return currData;
  }

  isCancelCodeEnabled(rowData: FirstTimeChargeModel, codeType: string): boolean {
    if (rowData) {
      switch (codeType) {
        case 'C':
        case 'TC':
          return rowData.RestoreDate === null || rowData.RestoreTime === null;
      }
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.destroying = true;
  }
}
