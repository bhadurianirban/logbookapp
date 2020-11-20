import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { IConstituents, MasterData } from 'src/app/shared/models/master-data.model';
import { MASTER_CONSITTUENT_HEADERS, LOAD_DATA_HEADERS } from 'src/app/shared/models/table-headers';
import { MessageService, DialogService, MenuItem } from 'primeng/api';
import { LoadConstituent, LoadViewModel, LoadGrid } from 'src/app/shared/models/load-management.model';
import { LoadManagementDialogComponent } from '../load-management-dialog/load-management-dialog.component';
import { takeWhile } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { AddLogbookLoadAction, UpdateLogbookLoadAction, CreateLoadCodeAction } from 'src/app/store/actions';

@Component({
  selector: 'app-load-management',
  templateUrl: './load-management.component.html',
  styleUrls: ['./load-management.component.scss'],
  providers: [DialogService]
})
export class LoadManagementComponent implements OnInit, OnDestroy {
  destroying = false;
  @Input()
  masterData: MasterData;
  selectedColumns: any[] = [];
  tableData: IConstituents[] = [];
  selectedRows: IConstituents[] = [];
  currLoadData: LoadViewModel[];
  @Input()
  logbookId: string;
  @Input()
  set loadData(data: LoadViewModel[]) {
    this.currLoadData = data;
    this.setLoadData();
  }
  loadDataColumns: any[] = [];
  constructor(private messageService: MessageService,
              public dialogService: DialogService,
              private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.selectedColumns = MASTER_CONSITTUENT_HEADERS;
    this.loadDataColumns = LOAD_DATA_HEADERS;
    if (this.masterData && this.masterData.commonMaster) {
      this.tableData = this.masterData.commonMaster.constituents;
    }
  }

  add(type: string) {
    if (this.selectedRows && this.selectedRows.length > 0) {
      const selectedConstituents: LoadConstituent[] = [];
      this.selectedRows.forEach(element => {
        const currElement = Object.assign({}) as LoadConstituent;
        currElement.Name = element.Name;
        currElement.Id = element.Id;
        currElement.Type = type;
        currElement.MaxPeakLoad = element.MaxPeak;
        currElement.MaxOffPeakLoad = element.MaxOffPeak;
        currElement.Region = element.Region;
        selectedConstituents.push(currElement);
      });
      this.openModal(selectedConstituents);
    } else {
      // show select data message
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Add Grid',
         detail: 'Please select at least one row to add grids.', closable: true }
      );
    }
  }

  setLoadData() {
    if (this.currLoadData) {
      this.currLoadData = this.currLoadData.map(x => {
        const thisData = Object.assign({}, x) as LoadViewModel;
        thisData.loadrequestid = x.RequestId;
        thisData.CreatedOn = x.CreatedOnDate + ' ' + x.CreatedOnTime;
        thisData.Grids = x.LoadGrids.map(data => {
          return data.GridName + ' - ' + data.Restriction;
        }).join('; ');
        switch (x.Type) {
          case 'LR':
            thisData.DisplayType = 'Load Restriction Code';
            break;
          case 'LS':
            thisData.DisplayType = 'Load Shading Code';
            break;
          default:
            thisData.DisplayType = 'Load Release Code';
        }
        return thisData;
      });
    }
  }

  openModal(data: LoadConstituent[]) {
    const dialogRef = this.dialogService.open(LoadManagementDialogComponent,
      {
        data: {
          constituentArrayData: data,
          isUpdate: false
        },
        header: 'Create Load Code',
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
          const selectedList = item.LoadGrids as LoadConstituent[];
          const loadData = selectedList.map(x => {
            const grid = Object.assign({}) as LoadGrid;
            grid.GridName = x.Name;
            grid.PresentLoad = x.PresentLoad;
            grid.GridId = x.Id;
            grid.Type = x.Type;
            grid.Region = x.Region;
            grid.MaxPeakLoad = x.MaxPeakLoad;
            grid.AllocatedLoad = x.AllocatedLoad;
            return grid;
          });
          const gridData = Object.assign({}) as LoadViewModel;
          gridData.LoadGrids = loadData;
          gridData.Remarks = item.Remarks;
          gridData.Type = loadData[0].Type;
          gridData.LogbookId = this.logbookId;
          gridData.CreatedOnTime = item.CreatedOnTime;
          gridData.CreatedOnDate = item.CreatedOnDate;
          gridData.LoadShedType = item.LoadShedType;
          gridData.ImposedFromDate = item.ImposedFromDate;
          gridData.ImposedFromTime = item.ImposedFromTime;
          gridData.ImposedToDate = item.ImposedToDate;
          gridData.ImposedToTime = item.ImposedToTime;
          this.store.dispatch(new AddLogbookLoadAction(gridData));
        }
        this.selectedRows = [];
      });
  }

  openSelectedRecord(data: LoadViewModel) {
    const currLoadData = data.LoadGrids.map(x => {
      const thisLoad = Object.assign({}) as LoadConstituent;
      thisLoad.MaxPeakLoad = x.MaxPeakLoad;
      thisLoad.PresentLoad = x.PresentLoad;
      thisLoad.AllocatedLoad = x.AllocatedLoad;
      thisLoad.Restriction = x.Restriction;
      thisLoad.Name = x.GridName;
      thisLoad.Id = x.GridId;
      thisLoad.Type = x.Type;
      thisLoad.MaxOffPeakLoad = x.MaxOffPeakLoad;
      return thisLoad;
    });
    const dialogRef = this.dialogService.open(LoadManagementDialogComponent,
      {
        data: {
          constituentArrayData: currLoadData,
          aldcData: data,
          Remarks: data.Remarks,
          CreatedOnTime: data.CreatedOnTime,
          isUpdate: true,
          Code: data.Code
        },
        header: 'Update Load Code Details',
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
          const selectedList = item.LoadGrids as LoadConstituent[];
          const loadData = selectedList.map(x => {
              const grid = Object.assign({}) as LoadGrid;
              grid.GridName = x.Name;
              grid.MaxPeakLoad = x.MaxPeakLoad;
              grid.PresentLoad = x.PresentLoad;
              grid.AllocatedLoad = x.AllocatedLoad;
              grid.Restriction = x.Restriction;
              grid.MaxOffPeakLoad = x.MaxOffPeakLoad;
              grid.GridId = x.Id;
              grid.Type = x.Type;
              return grid;
            });
          const gridData = Object.assign({}) as LoadViewModel;
          gridData.LoadGrids = loadData;
          gridData.Remarks = item.Remarks;
          gridData.CreatedOnTime = item.CreatedOnTime;
          gridData.CreatedOnDate = item.CreatedOnDate;
          gridData.Type = loadData[0].Type;
          gridData.LogbookId = this.logbookId;
          gridData.RequestId = data.RequestId;
          gridData.ImposedFromDate = item.ImposedFromDate;
          gridData.ImposedFromTime = item.ImposedFromTime;
          gridData.ImposedToDate = item.ImposedToDate;
          gridData.ImposedToTime = item.ImposedToTime;
          gridData.LoadShedType = item.LoadShedType;
          if (item.CreateCode) {
            this.store.dispatch(new CreateLoadCodeAction(gridData));
          } else {
            this.store.dispatch(new UpdateLogbookLoadAction(gridData));
          }
        }
        this.selectedRows = [];
      });
  }

  ngOnDestroy(): void {
    this.destroying = true;
  }

}
