import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LogbookDashboard } from 'src/app/shared/models/logbook-dashboard.model';
import { LOGBOOK_DASHBOARD_HEADERS } from 'src/app/shared/models/table-headers';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { GetShiftReportAction } from 'src/app/store/actions';

@Component({
  selector: 'app-logbook-dashboard',
  templateUrl: './logbook-dashboard.component.html',
  styleUrls: ['./logbook-dashboard.component.scss']
})
export class LogbookDashboardComponent implements OnInit {
  currDashboardData: LogbookDashboard[];
  @Input()
  set logbookData(data: LogbookDashboard[]) {
    this.currDashboardData = data;
    this.bindData();
  }
  @Output() openSelectedLogbook: EventEmitter<any> = new EventEmitter();
  tableData: LogbookDashboard[];
  selectedColumns: any[] = [];
  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.selectedColumns = LOGBOOK_DASHBOARD_HEADERS;
    this.bindData();
  }

  bindData() {
    this.tableData = this.currDashboardData;
  }

  openSelectedRecord(selectedRecord: LogbookDashboard) {
    this.openSelectedLogbook.emit(selectedRecord);
  }

  downloadReport(requestId: string, type: string) {
    const isExcelReport = type === 'excel';
    this.store.dispatch(new GetShiftReportAction({
      logbookId: requestId,
      isExcel: isExcelReport
    }));
  }

}
