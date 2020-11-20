import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationState } from 'src/app/store/state';
import { Store, select } from '@ngrx/store';
import { DateFormatService } from 'src/app/shared/services/date-format.service';
import { GetEmployeeSummaryAction } from 'src/app/store/actions';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { EmployeeSummaryModel } from 'src/app/shared/models/employee-summary.model';

@Component({
  selector: 'app-employee-shift-summary-report',
  templateUrl: './employee-shift-summary-report.component.html',
  styleUrls: ['./employee-shift-summary-report.component.scss']
})
export class EmployeeShiftSummaryReportComponent implements OnInit, OnDestroy {
  selectedPeriod: Date = new Date();
  destroying = false;
  employeeSummaryData: EmployeeSummaryModel;
  summaryCols: any[] = [];
  summaryColData: any[] = [];
  summaryData: any[] = [];
  constructor(private store: Store<ApplicationState>,
              private dateFormatService: DateFormatService) {
                const month = this.dateFormatService.getMonthFormat(this.selectedPeriod);
                this.store.dispatch(new GetEmployeeSummaryAction(month));
              }
  ngOnInit() {
    this.store.pipe(select(fromRoot.selectEmployeeSummaryRepository),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data && data.summary) {
        this.employeeSummaryData = data.summary;
        this.bindData();
      }
    });
  }

  bindData() {
    this.summaryCols = [];
    this.summaryColData = [];
    this.summaryData = [];
    this.populateHeaders();
    this.populateSummaryRows();
  }

  populateHeaders() {
    if (this.employeeSummaryData.Config && this.employeeSummaryData.Config.length > 0) {
      this.summaryCols = this.employeeSummaryData.Config[0];
      const cols = parseInt(this.employeeSummaryData.DutyReported.split(',')[0], 10);
      for (let i = 0; i < cols; i++) {
        if (i === cols - 1) {
          this.summaryColData.push({
            field: 'Count', header: 'Total Shift Count'
          });
        } else {
          this.summaryColData.push({
            field: this.employeeSummaryData.Config[0][i], header: this.employeeSummaryData.Config[0][i]
          });
        }
      }
    }
  }

  populateSummaryRows() {
    if (this.employeeSummaryData.Config && this.employeeSummaryData.Config.length > 0) {
      const cols = parseInt(this.employeeSummaryData.DutyReported.split(',')[0], 10);
      for (let i = 1; i < this.employeeSummaryData.Config.length; i++) {
        const summaryObject: any = {};
        summaryObject.Employee = this.employeeSummaryData.Config[i][0];
        for (let j = 1; j < cols; j++) {
          if (j === cols - 1) {
            summaryObject.Count = this.employeeSummaryData.Config[i][j];
          } else {
            summaryObject[j] = this.employeeSummaryData.Config[i][j];
          }
        }
        this.summaryData.push(summaryObject);
      }
    }
  }

  onMonthSelect() {
    const month = this.dateFormatService.getMonthFormat(this.selectedPeriod);
    this.store.dispatch(new GetEmployeeSummaryAction(month));
  }

  ngOnDestroy() {
    this.destroying = true;
  }

}
