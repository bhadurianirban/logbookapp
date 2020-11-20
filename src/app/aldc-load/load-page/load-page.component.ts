import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { MessageService, DialogService } from 'primeng/api';
import { GetALDCGridAction, AddLogbookLoadAction, GetALDCGridRestrictionsAction } from 'src/app/store/actions';
import { LoginService } from 'src/app/login/login.service';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { LoadGrid, LoadConstituent, LoadViewModel } from 'src/app/shared/models/load-management.model';
import { MASTER_CONSITTUENT_HEADERS, MASTER_GRIDS_HEADERS } from 'src/app/shared/models/table-headers';
import { AldcRestrictionDialogComponent } from '../aldc-restriction-dialog/aldc-restriction-dialog.component';
import { IConstituents } from 'src/app/shared/models/master-data.model';
import { AldcReleaseDialogComponent } from '../aldc-release-dialog/aldc-release-dialog.component';

@Component({
  selector: 'app-load-page',
  templateUrl: './load-page.component.html',
  styleUrls: ['./load-page.component.scss'],
  providers: [DialogService]
})
export class LoadPageComponent implements OnInit, OnDestroy {
  loggedInUser: any;
  destroying = false;
  selectedColumns: any[] = [];
  selectedReleaseColumns: any[] = [];
  region: string;
  tableData: LoadConstituent[] = [];
  selectedRows: IConstituents[] = [];

  tableGridRestData: LoadConstituent[] = [];
  selectedRestRows: LoadConstituent[] = [];

  constructor(private store: Store<ApplicationState>,
              private messageService: MessageService,
              private loginService: LoginService,
              public dialogService: DialogService) {
                this.loggedInUser = this.loginService.getLoggedInUser();
                if (this.loggedInUser && this.loggedInUser.user) {
                  this.region = this.loggedInUser.user.EmailId === 'SB_ALDC' ? 'S' : 'N';
                  this.store.dispatch(new GetALDCGridAction(this.region));
                  this.store.dispatch(new GetALDCGridRestrictionsAction(this.region))
                }
               }

  ngOnInit() {
    this.selectedColumns = MASTER_CONSITTUENT_HEADERS;
    this.selectedReleaseColumns = MASTER_GRIDS_HEADERS;

    this.store.pipe(select(fromRoot.selectLoadData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data && data.AllGrids) {
        this.tableData = data.AllGrids;
      }
      if (data && data.GridsWithRestriction) {
        this.tableGridRestData = data.GridsWithRestriction;
      }
    });
  }

  onTabChange($event) {
    this.store.dispatch(new GetALDCGridAction(this.region));
    this.store.dispatch(new GetALDCGridRestrictionsAction(this.region));
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
        currElement.AllocatedLoad = element.AllocatedLoad;
        currElement.Restriction = element.Restriction;
        currElement.PresentLoad = element.PresentLoad;
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

  openModal(data: LoadConstituent[]) {
    if (data[0].Type === 'LR') {
      const dialogRef = this.dialogService.open(AldcRestrictionDialogComponent,
        {
          data: {
            constituentArrayData: data,
            loggedInUser: this.loggedInUser,
            isUpdate: false
          },
          header: 'Create Load Restriction Entries',
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
            gridData.Type = loadData[0].Type;
            gridData.Name = item.Name;
            gridData.Designation = item.Designation;
            gridData.ContactNumber = item.ContactNumber;
            gridData.IsALDCAddUpdate = true;
            gridData.LoadShedType = item.LoadShedType;
            gridData.ImposedFromDate = item.ImposedFromDate;
            gridData.ImposedFromTime = item.ImposedFromTime;
            gridData.ImposedToDate = item.ImposedToDate;
            gridData.ImposedToTime = item.ImposedToTime;
            this.store.dispatch(new AddLogbookLoadAction(gridData));
          }
          this.selectedRows = [];
        });
    } else {
      const dialogRef = this.dialogService.open(AldcReleaseDialogComponent,
        {
          data: {
            constituentArrayData: data,
            loggedInUser: this.loggedInUser,
            isUpdate: false
          },
          header: 'Create Load Release Entries',
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
            gridData.Type = loadData[0].Type;
            gridData.Name = item.Name;
            gridData.Designation = item.Designation;
            gridData.ContactNumber = item.ContactNumber;
            gridData.IsALDCAddUpdate = true;
            this.store.dispatch(new AddLogbookLoadAction(gridData));
          }
          this.selectedRows = [];
        });
    }
  }

  ngOnDestroy() {
    this.destroying = true;
  }

}
