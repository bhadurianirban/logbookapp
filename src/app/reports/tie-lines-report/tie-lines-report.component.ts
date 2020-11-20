import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DayWiseTieLine } from 'src/app/shared/models/load-management.model';
import { TIE_LINES_HEADERS } from 'src/app/shared/models/table-headers';
import { ITieLinesReport } from '../reports.model';
import { ApplicationState } from 'src/app/store/state';
import { Store, select } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DateFormatService } from 'src/app/shared/services/date-format.service';
import { takeWhile } from 'rxjs/operators';
import * as fromRoot from '../../store/selectors';
import { GetTieLinesReportTry } from 'src/app/store/actions';
import * as moment from 'moment';

@Component({
  selector: 'app-tie-lines-report',
  templateUrl: './tie-lines-report.component.html',
  styleUrls: ['./tie-lines-report.component.scss']
})
export class TieLinesReportComponent implements OnInit, OnDestroy {
  defaultDate: Date = new Date();
  tieLinesReportingData: ITieLinesReport[] = [];
  destroying = false;
  selectedColumns: any[] = [];
  constructor(private store: Store<ApplicationState>,
              private messageService: MessageService,
              private dateFormatService: DateFormatService) {
                this.defaultDate.setDate(this.defaultDate.getDate() - 1);
                const date = this.dateFormatService.getStringDate(this.defaultDate);
                const newDate = moment(date, 'DD/MM/YYYY').format('DD-MMM-YYYY');
                this.store.dispatch(new GetTieLinesReportTry(newDate));
              }

  ngOnInit() {
    this.selectedColumns = TIE_LINES_HEADERS;
    this.store.pipe(select(fromRoot.selectReportData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data && data.TieLinesReportData) {
        this.tieLinesReportingData = data.TieLinesReportData;
      }
    });
  }
  getReport() {
    const date = this.dateFormatService.getStringDate(this.defaultDate);
    const newDate = moment(date, 'DD/MM/YYYY').format('DD-MMM-YYYY');
    this.store.dispatch(new GetTieLinesReportTry(newDate));
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    this.destroying = true;
  }

}
