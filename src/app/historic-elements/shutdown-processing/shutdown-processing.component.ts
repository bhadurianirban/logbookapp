import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApprovedShutdownRequest } from 'src/app/shared/models/approved-shutdown.model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { DateFormatService } from 'src/app/shared/services/date-format.service';
import { GetShutdownHistroyAction } from 'src/app/store/actions';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shutdown-processing',
  templateUrl: './shutdown-processing.component.html',
  styleUrls: ['./shutdown-processing.component.scss']
})
export class ShutdownProcessingComponent implements OnInit, OnDestroy {
  rangeDates: Date[];
  destroying = false;
  historyShutdownData: ApprovedShutdownRequest[];

  constructor(private store: Store<ApplicationState>,
              private dateFormatService: DateFormatService,
              private messageService: MessageService) {
                const yesterday = new Date();
                const today = new Date();
                yesterday.setDate(today.getDate() - 1);
                const startDate = moment().startOf('month').toDate();
                const endDate =  moment(yesterday).toDate();
                this.rangeDates = [startDate, endDate];
                const startDateString = this.dateFormatService.getStringDate(this.rangeDates[0]);
                const endDateString = this.dateFormatService.getStringDate(this.rangeDates[1]);
                this.store.dispatch(new GetShutdownHistroyAction({
                  fromDate: startDateString,
                  toDate: endDateString
                }));
               }

  ngOnInit() {
    this.store.pipe(select(fromRoot.selectHistoricElemetns),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data && data.ShutdownData) {
        this.historyShutdownData = data.ShutdownData;
      }
    });
  }

  getReport() {
    if (this.rangeDates && this.rangeDates.length > 1) {
      const startDate = this.dateFormatService.getStringDate(this.rangeDates[0]);
      const endDate = this.dateFormatService.getStringDate(this.rangeDates[1]);
      this.store.dispatch(new GetShutdownHistroyAction({
        fromDate: startDate,
        toDate: endDate
      }));
    } else {
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Shutdown Elements Report',
         detail: 'Please choose date range to download report', closable: true }
      );
    }
  }

  ngOnDestroy() {
    this.destroying = true;
  }

}
