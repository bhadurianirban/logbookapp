import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MasterData, IOutageSelectOptions, MasterElementsData } from '../../models/master-data.model';
import { MasterElement } from '../../models/element.model';
import { MasterDataTypes } from '../../models/master-data-types';
import { MASTER_ELEMENTS_HEADERS, OUTAGE_HEADERS } from '../../models/table-headers';
import { OutageModel } from '../../models/outage.model';
import { DialogService, ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { OutageFormDialogComponent } from '../outage-form-dialog/outage-form-dialog.component';
import { ApplicationState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { AddOutageAction, UpdateOutageAction, DeleteOutageAction } from 'src/app/store/actions';
import { CodeBase } from '../../models/code-base.model';
import { takeWhile } from 'rxjs/operators';
import { DateFormatService } from '../../services/date-format.service';

@Component({
  selector: 'app-outage',
  templateUrl: './outage.component.html',
  styleUrls: ['./outage.component.scss'],
  providers: [DialogService]
})
export class OutageComponent implements OnInit, OnDestroy {
  @Output() createNewCode: EventEmitter<any> = new EventEmitter();
  @Output() cancelCurrentCode: EventEmitter<any> = new EventEmitter();
  @Input()
  masterData: MasterData;
  @Input()
  elementsData: MasterElementsData;
  currOutageData: OutageModel[];
  @Input()
  set outageData(data: OutageModel[]) {
    this.currOutageData = data;
    this.setOutageData();
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
  outageColumns: any[] = [];
  expand = false;
  lineReactorData: OutageModel[] = [];
  busReactorData: OutageModel[] = [];
  lineData: OutageModel[] = [];
  unitData: OutageModel[] = [];
  hvdcData: OutageModel[] = [];
  ictData: OutageModel[] = [];
  bayData: OutageModel[] = [];
  busData: OutageModel[] = [];
  fscTcscData: OutageModel[] = [];
  statcomData: OutageModel[] = [];
  subStationData: OutageModel[] = [];
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
    this.outageColumns = OUTAGE_HEADERS;
    this.getData(MasterDataTypes.LINE);
  }

  onTabChange(event) {
    this.selectedRows = [];
    switch (event.index) {
      case 0:
        this.getData(MasterDataTypes.LINE);
        break;
      case 1:
        this.getData(MasterDataTypes.GENERATINGUNIT);
        break;
      case 2:
        this.getData(MasterDataTypes.HVDC);
        break;
      case 3:
        this.getData(MasterDataTypes.TRANSFORMER);
        break;
      case 4:
        this.getData(MasterDataTypes.LINEREACTOR);
        break;
      case 5:
        this.getData(MasterDataTypes.BUSREACTOR);
        break;
      case 6:
        this.getData(MasterDataTypes.BUS);
        break;
      case 7:
        this.getData(MasterDataTypes.BAY);
        break;
      case 8:
        this.getData(MasterDataTypes.FSC);
        break;
      case 9:
        this.getData(MasterDataTypes.STATCOM);
        break;
      case 10:
        this.getData(MasterDataTypes.SUBSTATION);
    }
  }

  getData(type: number): void {
    if (!this.isDashboardUpdate && this.elementsData && this.elementsData.masterElements) {
      switch (type) {
        case MasterDataTypes.LINE:
          this.tableData = this.elementsData.masterElements.linesData;
          break;
        case MasterDataTypes.GENERATINGUNIT:
          this.tableData = this.elementsData.masterElements.unitsData;
          break;
        case MasterDataTypes.HVDC:
          this.tableData = this.elementsData.masterElements.hvdcData;
          break;
        case MasterDataTypes.TRANSFORMER:
          this.tableData = this.elementsData.masterElements.ictData;
          break;
        case MasterDataTypes.LINEREACTOR:
          this.tableData = this.elementsData.masterElements.lineReactorData;
          break;
        case MasterDataTypes.BUSREACTOR:
          this.tableData = this.elementsData.masterElements.busReactorData;
          break;
        case MasterDataTypes.BUS:
          this.tableData = this.elementsData.masterElements.busData;
          break;
        case MasterDataTypes.BAY:
          this.tableData = this.elementsData.masterElements.bayData;
          break;
        case MasterDataTypes.FSC:
          const fscData = this.elementsData.masterElements.fscData;
          const tcscData = this.elementsData.masterElements.tcscData;
          const fscTcscData = fscData.concat(tcscData);
          this.tableData = fscTcscData;
          break;
        case MasterDataTypes.STATCOM:
          this.tableData = this.elementsData.masterElements.statcomData;
          break;
        case MasterDataTypes.SUBSTATION:
          this.tableData = this.elementsData.masterElements.subStationData;
          break;
      }
    }
  }

  add() {
    if (this.selectedRows && this.selectedRows.length > 0) {
      const data: OutageModel[] = [];
      this.selectedRows.forEach(element => {
        const currData = new OutageModel();
        currData.EntityId = element.Id;
        currData.Name = element.Name;
        currData.Description = element.Description;
        currData.Type = element.EntityId;
        currData.LogbookId = this.logbookId;
        data.push(currData);
      });
      this.store.dispatch(new AddOutageAction(data));
    } else {
      // show select data message
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Add Outage',
         detail: 'Please select at least one row to add outage data.', closable: true }
      );
    }
  }

  setOutageData() {
    if (this.currOutageData) {
      this.lineReactorData = this.currOutageData
      .filter(x => x.Type === MasterDataTypes.LINEREACTOR)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.lineReactorData = this.lineReactorData.sort((l1, l2) => {
        const l1Date = l1.LogDate ? l1.LogDate.split('/').reverse().join() : '';
        const l2Date = l2.LogDate ? l2.LogDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.lineData = this.currOutageData
      .filter(x => x.Type === MasterDataTypes.LINE)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.lineData = this.lineData.sort((l1, l2) => {
        const l1Date = l1.LogDate ? l1.LogDate.split('/').reverse().join() : '';
        const l2Date = l2.LogDate ? l2.LogDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.unitData = this.currOutageData
      .filter(x => x.Type === MasterDataTypes.GENERATINGUNIT)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.unitData = this.unitData.sort((l1, l2) => {
        const l1Date = l1.LogDate ? l1.LogDate.split('/').reverse().join() : '';
        const l2Date = l2.LogDate ? l2.LogDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.hvdcData = this.currOutageData
      .filter(x => x.Type === MasterDataTypes.HVDC)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.hvdcData = this.hvdcData.sort((l1, l2) => {
        const l1Date = l1.LogDate ? l1.LogDate.split('/').reverse().join() : '';
        const l2Date = l2.LogDate ? l2.LogDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.ictData = this.currOutageData
      .filter(x => x.Type === MasterDataTypes.TRANSFORMER)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.ictData = this.ictData.sort((l1, l2) => {
        const l1Date = l1.LogDate ? l1.LogDate.split('/').reverse().join() : '';
        const l2Date = l2.LogDate ? l2.LogDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.busReactorData = this.currOutageData
      .filter(x => x.Type === MasterDataTypes.BUSREACTOR)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.busReactorData = this.busReactorData.sort((l1, l2) => {
        const l1Date = l1.LogDate ? l1.LogDate.split('/').reverse().join() : '';
        const l2Date = l2.LogDate ? l2.LogDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.busData = this.currOutageData
      .filter(x => x.Type === MasterDataTypes.BUS)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.busData = this.busData.sort((l1, l2) => {
        const l1Date = l1.LogDate ? l1.LogDate.split('/').reverse().join() : '';
        const l2Date = l2.LogDate ? l2.LogDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.bayData = this.currOutageData
      .filter(x => x.Type === MasterDataTypes.BAY)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.bayData = this.bayData.sort((l1, l2) => {
        const l1Date = l1.LogDate ? l1.LogDate.split('/').reverse().join() : '';
        const l2Date = l2.LogDate ? l2.LogDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.subStationData = this.currOutageData
      .filter(x => x.Type === MasterDataTypes.SUBSTATION)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.subStationData = this.subStationData.sort((l1, l2) => {
        const l1Date = l1.LogDate ? l1.LogDate.split('/').reverse().join() : '';
        const l2Date = l2.LogDate ? l2.LogDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.statcomData = this.currOutageData
      .filter(x => x.Type === MasterDataTypes.STATCOM)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.fscTcscData = this.currOutageData
      .filter(x => x.Type === MasterDataTypes.FSC || x.Type === MasterDataTypes.TCSC)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
    }
  }

  TogglePanel(): void {
    this.expand = !this.expand;
  }

  createCode(data: OutageModel, type: string) {
    const codeData = {
      itemData: data,
      codeType: type
    };
    this.createNewCode.emit(codeData);
  }
  cancelCode(codeData: CodeBase) {
    this.cancelCurrentCode.emit(codeData);
  }

  openSelectedRecord(data: OutageModel) {
    const currOutageUpdateData = [data];
    const dialogRef = this.dialogService.open(OutageFormDialogComponent,
      {
        data: {
          outageArrayData: currOutageUpdateData,
          outageData: data,
          outageSelectOptions: this.selectOptions,
          constituents: this.masterData.commonMaster.constituents
        },
        header: 'Outage',
        width: '980px',
      contentStyle: {border: '1px solid #171616',
                    'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
                    'padding-right': '3px !important', background: '#fff', color: '#000'}
      });

    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const thisOutageData = Object.assign({}, data, item) as OutageModel;
        const reasons = item.Reason as any;
        const remarks = item.Remarks as any;
        const restoreRemarks = item.RestoredRemarks as any;
        const constituent = item.Constituent as any;
        thisOutageData.IsDashboardUpdate = this.isDashboardUpdate;
        thisOutageData.IsHistoryUpdate = this.IsHistoryView;
        thisOutageData.LogDate = this.dateFormatService.getStringDate(thisOutageData.LogDate);
        thisOutageData.LogTime = thisOutageData.LogTime;
        thisOutageData.RestoreDate = this.dateFormatService.getStringDate(thisOutageData.RestoreDate);
        thisOutageData.RestoreTime = thisOutageData.RestoreTime;
        thisOutageData.Reason = reasons ? reasons.join('$') : null;
        thisOutageData.Remarks = remarks ? remarks.join('$') : null;
        thisOutageData.RestoredRemarks = restoreRemarks ? restoreRemarks.join('$') : null;
        thisOutageData.Constituent = constituent ? constituent.Id : 0;
        this.store.dispatch(new UpdateOutageAction(thisOutageData));
      }
    });
  }

  deleteOutageItem(data: OutageModel) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the item?',
        accept: () => {
          data.IsHistoryUpdate = this.IsHistoryView;
          this.store.dispatch(new DeleteOutageAction(data));
        }
    });
  }

  prepareActions(data: OutageModel): OutageModel {
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
    // if (!currData.LogDate && !this.IsHistoryView) {
    //   if (!currData.OpeningCode || (currData.OpeningCode && currData.OpeningCode.filter(x => !x.IsCancelled).length === 0)) {
    //     menuItems.push(
    //       {label: 'Create Opening Code', icon: 'pi pi-sign-in', command: () => {
    //         this.createCode(currData, 'O');
    //       }});
    //   }
    //   menuItems.push(
    //     {label: 'Create Third Party Opening Code', icon: 'pi pi-clone', command: () => {
    //       this.createCode(currData, 'TO');
    //     }}
    //   );
    // }
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
          this.deleteOutageItem(currData);
        }});
    }

    currData.menuItems = menuItems;
    currData.outagerequestid = currData.Id.toString();
    return currData;
  }

  isCancelCodeEnabled(rowData: OutageModel, codeType: string): boolean {
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
