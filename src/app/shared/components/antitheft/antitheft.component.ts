import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { MasterData, MasterElementsData, IOutageSelectOptions } from '../../models/master-data.model';
import { AntiTheftModel } from '../../models/antiTheft.model';
import { MasterElement } from '../../models/element.model';
import { DialogService, ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { DateFormatService } from '../../services/date-format.service';
import { MASTER_ELEMENTS_HEADERS, ANTITHEFT_HEADERS } from '../../models/table-headers';
import { MasterDataTypes } from '../../models/master-data-types';
import { AddAntiTheftAction, UpdateAntiTheftAction, DeleteAntiTheftAction } from 'src/app/store/actions';
import { CodeBase } from '../../models/code-base.model';
import { AntitheftFormDialogComponent } from '../antitheft-form-dialog/antitheft-form-dialog.component';
import { takeWhile } from 'rxjs/internal/operators/takeWhile';

@Component({
  selector: 'app-antitheft',
  templateUrl: './antitheft.component.html',
  styleUrls: ['./antitheft.component.scss']
})
export class AntitheftComponent implements OnInit, OnDestroy {
  @Output() createNewCode: EventEmitter<any> = new EventEmitter();
  @Output() cancelCurrentCode: EventEmitter<any> = new EventEmitter();
  @Input()
  masterData: MasterData;
  @Input()
  elementsData: MasterElementsData;
  currAntiTheftData: AntiTheftModel[];
  @Input()
  set antiTheftData(data: AntiTheftModel[]) {
    this.currAntiTheftData = data;
    this.setAntiTheftData();
  }
  @Input()
  IsHistoryView: boolean;
  @Input()
  showSearchPanel: boolean;
  @Input()
  isDashboardUpdate: boolean;
  @Input()
  selectOptions: IOutageSelectOptions;
  @Input()
  logbookId: string;
  tableData: MasterElement[] = [];
  selectedRows: MasterElement[] = [];
  selectedColumns: any[] = [];
  antiTheftColumns: any[] = [];
  expand = false;
  antiTheftType: number;
  lineReactorData: AntiTheftModel[] = [];
  busReactorData: AntiTheftModel[] = [];
  lineData: AntiTheftModel[] = [];
  unitData: AntiTheftModel[] = [];
  hvdcData: AntiTheftModel[] = [];
  ictData: AntiTheftModel[] = [];
  bayData: AntiTheftModel[] = [];
  busData: AntiTheftModel[] = [];
  subStationData: AntiTheftModel[] = [];
  destroying = false;

  constructor(public dialogService: DialogService,
              private store: Store<ApplicationState>,
              private confirmationService: ConfirmationService,
              private dateFormatService: DateFormatService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.bindData();
  }

  bindData(): void {
    // get master data and filter based on tab
    this.selectedColumns = MASTER_ELEMENTS_HEADERS;
    this.antiTheftColumns = ANTITHEFT_HEADERS;
    this.getData(MasterDataTypes.LINE);
    this.antiTheftType = MasterDataTypes.LINE;
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
        this.getData(MasterDataTypes.SUBSTATION);
    }
  }

  getData(type: number): void {
    this.antiTheftType = type;
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
        case MasterDataTypes.SUBSTATION:
          this.tableData = this.elementsData.masterElements.subStationData;
          break;
      }
    }
  }

  add() {
    if (this.selectedRows && this.selectedRows.length > 0) {
      const data: AntiTheftModel[] = [];
      this.selectedRows.forEach(element => {
        const currData = new AntiTheftModel();
        currData.EntityId = element.Id;
        currData.Name = element.Name;
        currData.Description = element.Description;
        currData.Type = this.antiTheftType;
        currData.LogbookId = this.logbookId;
        data.push(currData);
      });
      this.store.dispatch(new AddAntiTheftAction(data));
    } else {
      // show select data message
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Add Anti Theft',
         detail: 'Please select at least one row to add outage data.', closable: true }
      );
    }
  }

  setAntiTheftData() {
    if (this.currAntiTheftData) {
      this.subStationData = this.currAntiTheftData
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
      this.lineReactorData = this.currAntiTheftData
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
      this.lineData = this.currAntiTheftData
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
      this.unitData = this.currAntiTheftData
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
      this.hvdcData = this.currAntiTheftData
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
      this.ictData = this.currAntiTheftData
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
      this.busReactorData = this.currAntiTheftData
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
      this.busData = this.currAntiTheftData
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
      this.bayData = this.currAntiTheftData
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
    }
  }

  TogglePanel(): void {
    this.expand = !this.expand;
  }

  createCode(data: AntiTheftModel, type: string) {
    const codeData = {
      itemData: data,
      codeType: type
    };
    this.createNewCode.emit(codeData);
  }
  cancelCode(codeData: CodeBase) {
    this.cancelCurrentCode.emit(codeData);
  }

  openSelectedRecord(data: AntiTheftModel) {
    const currTheftData = [data];
    const dialogRef = this.dialogService.open(AntitheftFormDialogComponent,
      {
        data: {
          antiTheftArrayData: currTheftData,
          antiTheftData: data,
          outageSelectOptions: this.selectOptions
        },
        header: 'Anti Theft',
        width: '980px',
      contentStyle: {border: '1px solid #171616',
                    'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
                    'padding-right': '3px !important', background: '#fff', color: '#000'}
      });

    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const thisAntiTheftData = Object.assign({}, data, item) as AntiTheftModel;
        const reasons = item.Reason as any;
        const remarks = item.Remarks as any;
        const restoreRemarks = item.RestoredRemarks as any;
        thisAntiTheftData.IsDashboardUpdate = this.isDashboardUpdate;
        thisAntiTheftData.IsHistoryUpdate = this.IsHistoryView;
        thisAntiTheftData.LogDate = this.dateFormatService.getStringDate(thisAntiTheftData.LogDate);
        thisAntiTheftData.LogTime = thisAntiTheftData.LogTime;
        thisAntiTheftData.RestoreDate = this.dateFormatService.getStringDate(thisAntiTheftData.RestoreDate);
        thisAntiTheftData.RestoreTime = thisAntiTheftData.RestoreTime;
        thisAntiTheftData.Reason = reasons ? reasons.join('$') : null;
        thisAntiTheftData.Remarks = remarks ? remarks.join('$') : null;
        thisAntiTheftData.RestoredRemarks = restoreRemarks ? restoreRemarks.join('$') : null;
        this.store.dispatch(new UpdateAntiTheftAction(thisAntiTheftData));
      }
    });
  }

  deleteAntiTheftItem(data: AntiTheftModel) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the item?',
        accept: () => {
          data.IsHistoryUpdate = this.IsHistoryView;
          this.store.dispatch(new DeleteAntiTheftAction(data));
        }
    });
  }

  prepareActions(data: AntiTheftModel): AntiTheftModel {
    const currData = Object.assign({}, data);
    const menuItems: MenuItem[] = [];
    if (!currData.LogDate && !this.IsHistoryView) {
      if (!currData.AntiTheftOpeningCode || (currData.AntiTheftOpeningCode &&
         currData.AntiTheftOpeningCode.filter(x => !x.IsCancelled).length === 0)) {
        menuItems.push(
          {label: 'Create Anti Theft Opening Code', icon: 'pi pi-lock-open', command: () => {
            this.createCode(currData, 'AO');
          }}
        );
      }
      menuItems.push(
        {label: 'Create Third Party Opening Code', icon: 'pi pi-clone', command: () => {
          this.createCode(currData, 'ATO');
        }}
      );
    }
    if (currData.LogDate && !currData.RestoreDate && !this.IsHistoryView) {
      if (!currData.AntiTheftClosingCode || (currData.AntiTheftClosingCode &&
         currData.AntiTheftClosingCode.filter(x => !x.IsCancelled).length === 0)) {
        menuItems.push(
          {label: 'Create Anti Theft Closing Code', icon: 'pi pi-lock-open', command: () => {
            this.createCode(currData, 'AC');
          }});
      }
      menuItems.push(
        {label: 'Create Third Party Closing Code', icon: 'pi pi-key', command: () => {
          this.createCode(currData, 'ATC');
        }});
    }

    if (!currData.AntiTheftOpeningCode || (currData.AntiTheftOpeningCode &&
      currData.AntiTheftOpeningCode.filter(x => !x.IsCancelled).length === 0)) {
        menuItems.push({label: 'Delete', icon: 'pi pi-trash', command: () => {
          this.deleteAntiTheftItem(currData);
        }});
   }
    if (currData.Reason) {
      currData.reasonsViewOnly = currData.Reason.split('$').join('; ');
    }
    if (currData.Remarks) {
      currData.remarksViewOnly = currData.Remarks.split('$').join('; ');
    }
    if (currData.RestoredRemarks) {
      currData.restoreRemarksViewOnly = currData.RestoredRemarks.split('$').join('; ');
    }
    currData.menuItems = menuItems;
    currData.antitheftrequestid = currData.Id.toString();
    return currData;
  }

  isCancelCodeEnabled(rowData: AntiTheftModel, codeType: string): boolean {
    if (rowData) {
      switch (codeType) {
        case 'AO':
        case 'ATO':
          return rowData.LogDate === null || rowData.LogTime === null;
        case 'AC':
        case 'ATC':
          return rowData.RestoreDate === null || rowData.RestoreTime === null;
      }
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.destroying = true;
  }
}
