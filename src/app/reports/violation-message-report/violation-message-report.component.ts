import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DateFormatService } from 'src/app/shared/services/date-format.service';
import * as moment from 'moment';
import { ApplicationState } from 'src/app/store/state';
import { Store, select } from '@ngrx/store';
import { GetViolationMessagesTry } from 'src/app/store/actions';
import { IViolationMessageReport } from '../reports.model';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { VIOLATION_REPORT_HEADER } from 'src/app/shared/models/table-headers';

@Component({
  selector: 'app-violation-message-report',
  templateUrl: './violation-message-report.component.html',
  styleUrls: ['./violation-message-report.component.scss']
})
export class ViolationMessageReportComponent implements OnInit, OnDestroy {
  rangeDates: Date[];
  violationMessageReportingData: IViolationMessageReport[] = [];
  destroying = false;
  selectedColumns: any[] = [];
  constructor(private store: Store<ApplicationState>,
              private messageService: MessageService,
              private dateFormatService: DateFormatService) {
                const startDate = moment().startOf('month').toDate();
                const endDate =  moment().endOf('month').toDate();
                this.rangeDates = [startDate, endDate];
                const startDateString = this.dateFormatService.getStringDate(this.rangeDates[0]);
                const endDateString = this.dateFormatService.getStringDate(this.rangeDates[1]);
                this.store.dispatch(new GetViolationMessagesTry({
                  fromDate: startDateString,
                  toDate: endDateString
                }));
               }

  ngOnInit() {
    this.selectedColumns = VIOLATION_REPORT_HEADER;
    this.store.pipe(select(fromRoot.selectReportData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data && data.ViolationReportData) {
        this.violationMessageReportingData = data.ViolationReportData;
      }
    });
  }

  getReport() {
    if (this.rangeDates && this.rangeDates.length > 1) {
      const startDate = this.dateFormatService.getStringDate(this.rangeDates[0]);
      const endDate = this.dateFormatService.getStringDate(this.rangeDates[1]);
      this.store.dispatch(new GetViolationMessagesTry({
        fromDate: startDate,
        toDate: endDate
      }));
    } else {
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Violation Message Report',
         detail: 'Please choose date range to download report', closable: true }
      );
    }
  }

  ngOnDestroy() {
    this.destroying = true;
  }
}
