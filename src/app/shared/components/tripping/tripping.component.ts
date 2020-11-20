import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { DialogService, ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { MasterData, ITrippingNature, MasterElementsData } from '../../models/master-data.model';
import { MasterElement } from '../../models/element.model';
import { TrippingModel } from '../../models/tripping.model';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { DateFormatService } from '../../services/date-format.service';
import { MASTER_ELEMENTS_HEADERS, TRIPPING_HEADERS } from '../../models/table-headers';
import { MasterDataTypes } from '../../models/master-data-types';
import { CodeBase } from '../../models/code-base.model';
import { TrippingFormDialogComponent } from '../tripping-form-dialog/tripping-form-dialog.component';
import { takeWhile } from 'rxjs/operators';
import { AddTrippingAction, UpdateTrippingAction, DeleteTrippingAction } from 'src/app/store/actions';

@Component({
  selector: 'app-tripping',
  templateUrl: './tripping.component.html',
  styleUrls: ['./tripping.component.scss'],
  providers: [DialogService]
})
export class TrippingComponent implements OnInit, OnDestroy {
  @Output() createNewCode: EventEmitter<any> = new EventEmitter();
  @Output() cancelCurrentCode: EventEmitter<any> = new EventEmitter();
  @Input()
  masterData: MasterData;
  @Input()
  elementsData: MasterElementsData;
  currTrippingData: TrippingModel[];
  @Input()
  set trippingData(data: TrippingModel[]) {
    this.currTrippingData = data;
    this.setTrippingData();
  }
  @Input()
  IsHistoryView: boolean;
  @Input()
  showSearchPanel: boolean;
  @Input()
  isDashboardUpdate: boolean;
  @Input()
  logbookId: string;
  tableData: MasterElement[];
  selectedRows: MasterElement[];
  selectedColumns: any[] = [];
  trippingColumns: any[] = [];
  trippingNatures: ITrippingNature[] = [];
  expand = false;
  lineReactorTrippingData: TrippingModel[] = [];
  busReactorTrippingData: TrippingModel[] = [];
  lineTrippingData: TrippingModel[] = [];
  unitTrippingData: TrippingModel[] = [];
  hvdcTrippingData: TrippingModel[] = [];
  ictTrippingData: TrippingModel[] = [];
  bayTrippingData: TrippingModel[] = [];
  busTrippingData: TrippingModel[] = [];
  fscTcscTrippingData: TrippingModel[] = [];
  statcomTrippingData: TrippingModel[] = [];
  subStationData: TrippingModel[] = [];
  destroying = false;

  constructor(public dialogService: DialogService,
              private store: Store<ApplicationState>,
              private confirmationService: ConfirmationService,
              private dateFormatService: DateFormatService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.bindData();
  }

  TogglePanel(): void {
    this.expand = !this.expand;
  }

  bindData(): void {
    // get master data and filter based on tab
    this.selectedColumns = MASTER_ELEMENTS_HEADERS;
    this.trippingColumns = TRIPPING_HEADERS;
    this.getData(MasterDataTypes.LINE);
    this.trippingNatures = this.masterData && this.masterData.commonMaster ?
     this.masterData.commonMaster.trippingNatures : [];
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

  setTrippingData() {
    if (this.currTrippingData) {
      this.lineReactorTrippingData = this.currTrippingData
      .filter(x => x.Type === MasterDataTypes.LINEREACTOR)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.lineReactorTrippingData = this.lineReactorTrippingData.sort((l1, l2) => {
        const l1Date = l1.TripDate ? l1.TripDate.split('/').reverse().join() : '';
        const l2Date = l2.TripDate ? l2.TripDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.subStationData = this.currTrippingData
      .filter(x => x.Type === MasterDataTypes.SUBSTATION)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.subStationData = this.subStationData.sort((l1, l2) => {
        const l1Date = l1.TripDate ? l1.TripDate.split('/').reverse().join() : '';
        const l2Date = l2.TripDate ? l2.TripDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.lineTrippingData = this.currTrippingData
      .filter(x => x.Type === MasterDataTypes.LINE)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.lineTrippingData = this.lineTrippingData.sort((l1, l2) => {
        const l1Date = l1.TripDate ? l1.TripDate.split('/').reverse().join() : '';
        const l2Date = l2.TripDate ? l2.TripDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.unitTrippingData = this.currTrippingData
      .filter(x => x.Type === MasterDataTypes.GENERATINGUNIT)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.unitTrippingData = this.unitTrippingData.sort((l1, l2) => {
        const l1Date = l1.TripDate ? l1.TripDate.split('/').reverse().join() : '';
        const l2Date = l2.TripDate ? l2.TripDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.hvdcTrippingData = this.currTrippingData
      .filter(x => x.Type === MasterDataTypes.HVDC)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.hvdcTrippingData = this.hvdcTrippingData.sort((l1, l2) => {
        const l1Date = l1.TripDate ? l1.TripDate.split('/').reverse().join() : '';
        const l2Date = l2.TripDate ? l2.TripDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.ictTrippingData = this.currTrippingData
      .filter(x => x.Type === MasterDataTypes.TRANSFORMER)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.ictTrippingData = this.ictTrippingData.sort((l1, l2) => {
        const l1Date = l1.TripDate ? l1.TripDate.split('/').reverse().join() : '';
        const l2Date = l2.TripDate ? l2.TripDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.busReactorTrippingData = this.currTrippingData
      .filter(x => x.Type === MasterDataTypes.BUSREACTOR)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.busReactorTrippingData = this.busReactorTrippingData.sort((l1, l2) => {
        const l1Date = l1.TripDate ? l1.TripDate.split('/').reverse().join() : '';
        const l2Date = l2.TripDate ? l2.TripDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.busTrippingData = this.currTrippingData
      .filter(x => x.Type === MasterDataTypes.BUS)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.busTrippingData = this.busTrippingData.sort((l1, l2) => {
        const l1Date = l1.TripDate ? l1.TripDate.split('/').reverse().join() : '';
        const l2Date = l2.TripDate ? l2.TripDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.bayTrippingData = this.currTrippingData
      .filter(x => x.Type === MasterDataTypes.BAY)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.bayTrippingData = this.bayTrippingData.sort((l1, l2) => {
        const l1Date = l1.TripDate ? l1.TripDate.split('/').reverse().join() : '';
        const l2Date = l2.TripDate ? l2.TripDate.split('/').reverse().join() : '';
        return l1Date > l2Date ? -1 : (l1Date < l2Date ? 1 : 0);
      });
      this.fscTcscTrippingData = this.currTrippingData
      .filter(x => x.Type === MasterDataTypes.FSC || x.Type === MasterDataTypes.TCSC)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
      this.statcomTrippingData = this.currTrippingData
      .filter(x => x.Type === MasterDataTypes.STATCOM)
      .map(data => {
        const currData = this.prepareActions(data);
        return currData;
      });
    }
  }

  add() {
    if (this.selectedRows && this.selectedRows.length > 0) {
      const data: TrippingModel[] = [];
      this.selectedRows.forEach(element => {
        const currData = new TrippingModel();
        currData.EntityId = element.Id;
        currData.Name = element.Name;
        currData.Description = element.Description;
        currData.Type = element.EntityId;
        currData.LogbookId = this.logbookId;
        data.push(currData);
      });
      this.openModal(data);
    } else {
      // show select data message
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Add Tripping',
         detail: 'Please select at least one row to add tripping data.', closable: true }
      );
    }
  }

  openModal(data: TrippingModel[]) {
    const initialTrippingdata = Object.assign({}) as TrippingModel;
    const dialogRef = this.dialogService.open(TrippingFormDialogComponent,
      {
        data: {
          trippingArrayData: data,
          trippingData: initialTrippingdata,
          natureArray: this.trippingNatures,
          isUpdate: false
        },
        header: 'Add Tripping',
        width: '980px',
      contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });

    dialogRef.onClose.pipe(
        takeWhile(() => !this.destroying)
      ).subscribe(item => {
        if (item) {
          const trippingItems: TrippingModel[] = [];
          const nature = item.Nature as any;
          this.selectedRows.forEach(row => {
            const formData = Object.assign({}, item) as TrippingModel;
            formData.Name = row.Name;
            formData.Description = row.Description;
            formData.EntityId = row.Id;
            formData.IsDashboardUpdate = this.isDashboardUpdate;
            formData.IsHistoryUpdate = this.IsHistoryView;
            formData.LogbookId = this.logbookId;
            formData.Type = row.EntityId;
            formData.TripDate = this.dateFormatService.getStringDate(formData.TripDate);
            formData.TripTime = formData.TripTime;
            formData.ExpectedDate = this.dateFormatService.getStringDate(formData.ExpectedDate);
            formData.RevivalDate = this.dateFormatService.getStringDate(formData.RevivalDate);
            formData.RevivalTime = formData.RevivalTime;
            formData.Nature = nature.Name;
            trippingItems.push(formData);
          });
          if (trippingItems && trippingItems.length > 0) {
            this.store.dispatch(new AddTrippingAction(trippingItems));
          }
        }
      });
  }

  openSelectedRecord(data: TrippingModel) {
    const currTrippingData = [data];
    if (data.Nature) {
      const natureData = this.trippingNatures.find(x => x.Name === data.Nature) as any;
      data.Nature = natureData;
    }
    const dialogRef = this.dialogService.open(TrippingFormDialogComponent,
      {
        data: {
          trippingArrayData: currTrippingData,
          trippingData: data,
          natureArray: this.trippingNatures,
          isUpdate: true
        },
        header: 'Update Tripping',
        width: '980px',
      contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });

    dialogRef.onClose.pipe(
        takeWhile(() => !this.destroying)
      ).subscribe(item => {
        if (item) {
          const nature = item.Nature as any;
          const formData = Object.assign({}, data, item) as TrippingModel;
          formData.IsDashboardUpdate = this.isDashboardUpdate;
          formData.IsHistoryUpdate = this.IsHistoryView;
          formData.TripDate = this.dateFormatService.getStringDate(formData.TripDate);
          formData.TripTime = formData.TripTime;
          formData.ExpectedDate = this.dateFormatService.getStringDate(formData.ExpectedDate);
          formData.RevivalDate = this.dateFormatService.getStringDate(formData.RevivalDate);
          formData.RevivalTime = formData.RevivalTime;
          formData.Nature = nature.Name;
          formData.ClearanceComment = formData.ClearanceComment;
          this.store.dispatch(new UpdateTrippingAction(formData));
        }
      });
  }

  prepareActions(data: TrippingModel): TrippingModel {
    const currData = Object.assign({}, data);
    const menuItems: MenuItem[] = [];
    if (currData.TripDate && currData.ClearanceComment && !currData.RevivalDate && !this.IsHistoryView) {
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
    if (currData.TripDate && !currData.RevivalDate && !this.IsHistoryView) {
      if ((!currData.ClosingCode || (currData.ClosingCode && currData.ClosingCode.filter(x => !x.IsCancelled).length === 0)) &&
        (!currData.PatrolingCode || (currData.PatrolingCode && currData.PatrolingCode.filter(x => !x.IsCancelled).length === 0))) {
        menuItems.push(
        {label: 'Create Patroling Code', icon: 'pi pi-sign-in', command: () => {
          this.createCode(currData, 'P');
        }});
      }
    }
    // if no code created, add delete buttom
    if (!currData.ClosingCode || (currData.ClosingCode && currData.ClosingCode.filter(x => !x.IsCancelled).length === 0)) {
      menuItems.push(
        {label: 'Delete', icon: 'pi pi-trash', command: () => {
          this.deleteTrippingItem(currData);
        }});
    }
    currData.menuItems = menuItems;
    currData.trippingrequestid = currData.Id.toString();
    return currData;
  }

  createCode(data: TrippingModel, type: string) {
    const codeData = {
      itemData: data,
      codeType: type
    };
    this.createNewCode.emit(codeData);
  }

  cancelCode(codeData: CodeBase) {
    this.cancelCurrentCode.emit(codeData);
  }

  deleteTrippingItem(data: TrippingModel) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the item?',
        accept: () => {
          data.IsHistoryUpdate = this.IsHistoryView;
          this.store.dispatch(new DeleteTrippingAction(data));
        }
    });
  }

  isCancelCodeEnabled(rowData: TrippingModel, codeType: string): boolean {
    if (rowData) {
      switch (codeType) {
        case 'C':
        case 'P':
        case 'TC':
          return rowData.RevivalDate === null || rowData.RevivalTime === null;
      }
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.destroying = true;
  }

}
