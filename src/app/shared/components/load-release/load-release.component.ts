import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DialogService, MessageService } from 'primeng/api';
import { IConstituents } from '../../models/master-data.model';
import { LoadViewModel, LoadConstituent, LoadGrid } from '../../models/load-management.model';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { MASTER_GRIDS_HEADERS, LOAD_DATA_GRIDS_HEADERS } from '../../models/table-headers';
import { LoadReleaseDialogComponent } from '../load-release-dialog/load-release-dialog.component';
import { takeWhile } from 'rxjs/operators';
import { AddLogbookLoadAction, UpdateLogbookLoadAction, CreateLoadCodeAction } from 'src/app/store/actions';

@Component({
  selector: 'app-load-release',
  templateUrl: './load-release.component.html',
  styleUrls: ['./load-release.component.scss'],
  providers: [DialogService]
})
export class LoadReleaseComponent implements OnInit, OnDestroy {
  destroying = false;
  @Input()
  gridData: IConstituents[];
  selectedColumns: any[] = [];
  tableData: IConstituents[] = [];
  selectedRows: IConstituents[] = [];
  currLoadData: LoadViewModel[];
  @Input()
  logbookId: string;
  @Input()
  set loadReleaseData(data: LoadViewModel[]) {
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
    this.selectedColumns = MASTER_GRIDS_HEADERS;
    this.loadDataColumns = LOAD_DATA_GRIDS_HEADERS;
    if (this.gridData) {
      this.tableData = this.gridData;
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
        currElement.AllocatedLoad = element.AllocatedLoad;
        currElement.PresentLoad = element.PresentLoad;
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
          return data.GridName + ' - ' + data.Release;
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
    const dialogRef = this.dialogService.open(LoadReleaseDialogComponent,
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
            grid.Restriction = x.Restriction;
            grid.Release = x.Release;
            return grid;
          });
          const gridData = Object.assign({}) as LoadViewModel;
          gridData.LoadGrids = loadData;
          gridData.Remarks = item.Remarks;
          gridData.Type = loadData[0].Type;
          gridData.LogbookId = this.logbookId;
          gridData.CreatedOnTime = item.CreatedOnTime;
          gridData.CreatedOnDate = item.CreatedOnDate;
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
      thisLoad.Release = x.Release;
      thisLoad.Name = x.GridName;
      thisLoad.Id = x.GridId;
      thisLoad.Type = x.Type;
      return thisLoad;
    });
    const dialogRef = this.dialogService.open(LoadReleaseDialogComponent,
      {
        data: {
          constituentArrayData: currLoadData,
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
            grid.Release = x.Release;
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
