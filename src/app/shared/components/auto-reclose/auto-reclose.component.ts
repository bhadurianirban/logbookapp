import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MasterData, MasterElementsData, IOutageSelectOptions } from '../../models/master-data.model';
import { AutoRecloseModel } from '../../models/auto-reclose.model';
import { MasterElement } from '../../models/element.model';
import { DialogService, ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { ApplicationState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { DateFormatService } from '../../services/date-format.service';
import { MASTER_ELEMENTS_HEADERS, AUTO_RECLOSE_HEADERS } from '../../models/table-headers';
import { MasterDataTypes } from '../../models/master-data-types';
import { CodeBase } from '../../models/code-base.model';
import { AutoRecloseDialogComponent } from '../auto-reclose-dialog/auto-reclose-dialog.component';
import { takeWhile } from 'rxjs/operators';
import { AddAutoRecloseAction, UpdateAutoRecloseAction, DeleteAutoRecloseAction } from 'src/app/store/actions';

@Component({
  selector: 'app-auto-reclose',
  templateUrl: './auto-reclose.component.html',
  styleUrls: ['./auto-reclose.component.scss'],
  providers: [DialogService]
})
export class AutoRecloseComponent implements OnInit, OnDestroy {
  @Output() createNewCode: EventEmitter<any> = new EventEmitter();
  @Output() cancelCurrentCode: EventEmitter<any> = new EventEmitter();
  @Input()
  masterData: MasterData;
  @Input()
  elementsData: MasterElementsData;
  currAutoRecloseData: AutoRecloseModel[];
  @Input()
  set autoRecloseData(data: AutoRecloseModel[]) {
    this.currAutoRecloseData = data;
    this.setAutoRecloseData();
  }
  @Input()
  IsHistoryView: boolean;
  @Input()
  isDashboardUpdate: boolean;
  @Input()
  selectOptions: IOutageSelectOptions;
  @Input()
  logbookId: string;
  @Input()
  showSearchPanel: boolean;
  tableData: MasterElement[] = [];
  selectedRows: MasterElement[] = [];
  selectedColumns: any[] = [];
  autoRecloseColumns: any[] = [];
  expand = false;
  autoRecloseType: number;
  lineData: AutoRecloseModel[] = [];
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
    this.selectedColumns = MASTER_ELEMENTS_HEADERS;
    this.autoRecloseColumns = AUTO_RECLOSE_HEADERS;
    this.getData(MasterDataTypes.AUTORECLOSE);
    this.autoRecloseType = MasterDataTypes.AUTORECLOSE;
  }

  getData(type: number): void {
    this.autoRecloseType = type;
    if (!this.isDashboardUpdate && this.elementsData && this.elementsData.masterElements) {
      this.tableData = this.elementsData.masterElements.autoReclosureData;
    }
  }

  add() {
    if (this.selectedRows && this.selectedRows.length > 0) {
      const data: AutoRecloseModel[] = [];
      this.selectedRows.forEach(element => {
        const currData = new AutoRecloseModel();
        currData.EntityId = element.Id;
        currData.Name = element.Name;
        currData.Description = element.Description;
        currData.Type = this.autoRecloseType;
        currData.LogbookId = this.logbookId;
        data.push(currData);
      });
      this.store.dispatch(new AddAutoRecloseAction(data));
    } else {
      // show select data message
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Add Auto Reclose',
         detail: 'Please select at least one row to add auto reclose data.', closable: true }
      );
    }
  }

  setAutoRecloseData() {
    if (this.currAutoRecloseData) {
      this.lineData = this.currAutoRecloseData
      .filter(x => x.Type === MasterDataTypes.AUTORECLOSE)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
    }
  }

  TogglePanel(): void {
    this.expand = !this.expand;
  }

  createCode(data: AutoRecloseModel, type: string) {
    const codeData = {
      itemData: data,
      codeType: type
    };
    this.createNewCode.emit(codeData);
  }

  cancelCode(codeData: CodeBase) {
    this.cancelCurrentCode.emit(codeData);
  }

  openSelectedRecord(data: AutoRecloseModel) {
    const currAutoRecloseUpdateData = [data];
    const dialogRef = this.dialogService.open(AutoRecloseDialogComponent,
      {
        data: {
          autoRecloseArrayData: currAutoRecloseUpdateData,
          autoRecloseData: data,
          autoRecloseSelectOptions: this.selectOptions
        },
        header: 'Auto Reclose',
        width: '980px',
      contentStyle: {border: '1px solid #171616',
                    'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
                    'padding-right': '3px !important', background: '#fff', color: '#000'}
      });

    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const thisAutoRecloseData = Object.assign({}, data, item) as AutoRecloseModel;
        const reasons = item.Reason as any;
        const remarks = item.Remarks as any;
        const restoreRemarks = item.RestoredRemarks as any;
        thisAutoRecloseData.IsDashboardUpdate = this.isDashboardUpdate;
        thisAutoRecloseData.IsHistoryUpdate = this.IsHistoryView;
        thisAutoRecloseData.LogDate = this.dateFormatService.getStringDate(thisAutoRecloseData.LogDate);
        thisAutoRecloseData.LogTime = thisAutoRecloseData.LogTime;
        thisAutoRecloseData.RestoreDate = this.dateFormatService.getStringDate(thisAutoRecloseData.RestoreDate);
        thisAutoRecloseData.RestoreTime = thisAutoRecloseData.RestoreTime;
        thisAutoRecloseData.Reason = reasons ? reasons.join('$') : null;
        thisAutoRecloseData.Remarks = remarks ? remarks.join('$') : null;
        thisAutoRecloseData.RestoredRemarks = restoreRemarks ? restoreRemarks.join('$') : null;
        this.store.dispatch(new UpdateAutoRecloseAction(thisAutoRecloseData));
      }
    });
  }

  deleteAutoRecloseItem(data: AutoRecloseModel) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the item?',
        accept: () => {
          data.IsHistoryUpdate = this.IsHistoryView;
          this.store.dispatch(new DeleteAutoRecloseAction(data));
        }
    });
  }

  prepareActions(data: AutoRecloseModel): AutoRecloseModel {
    const currData = Object.assign({}, data);
    const menuItems: MenuItem[] = [];
    if (currData.Reason) {
      currData.reasonsViewOnly = currData.Reason.split('$').join('; ');
    }
    if (currData.Remarks) {
      currData.remarksViewOnly = currData.Remarks.split('$').join('; ');
    }
    if (currData.RestoredRemarks) {
      currData.restoreRemarksViewOnly = currData.RestoredRemarks.split('$').join('; ');
    }
    if (!currData.LogDate && !this.IsHistoryView) {
      if (!currData.OpeningCode || (currData.OpeningCode && currData.OpeningCode.filter(x => !x.IsCancelled).length === 0)) {
        menuItems.push(
          {label: 'Create Opening Code', icon: 'pi pi-sign-in', command: () => {
            this.createCode(currData, 'O');
          }});
      }
      menuItems.push(
        {label: 'Create Third Party Opening Code', icon: 'pi pi-clone', command: () => {
          this.createCode(currData, 'TO');
        }}
      );
    }
    if (currData.LogDate && !currData.RestoreDate && !this.IsHistoryView) {
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

    if (!currData.OpeningCode || (currData.OpeningCode && currData.OpeningCode.filter(x => !x.IsCancelled).length === 0)) {
      menuItems.push(
        {label: 'Delete', icon: 'pi pi-trash', command: () => {
          this.deleteAutoRecloseItem(currData);
        }});
    }

    currData.menuItems = menuItems;
    currData.autorecloserequestid = currData.Id.toString();
    return currData;
  }

  isCancelCodeEnabled(rowData: AutoRecloseModel, codeType: string): boolean {
    if (rowData) {
      switch (codeType) {
        case 'O':
        case 'TO':
          return rowData.LogDate === null || rowData.LogTime === null;
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
