import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrippingModel } from 'src/app/shared/models/tripping.model';
import { ApplicationState } from 'src/app/store/state';
import { Store, select } from '@ngrx/store';
import { DateFormatService } from 'src/app/shared/services/date-format.service';
import { GetCommonMasterDataAction, GetTrippingHistroyAction } from 'src/app/store/actions';
import { MasterData } from 'src/app/shared/models/master-data.model';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-history-tripping',
  templateUrl: './tripping.component.html',
  styleUrls: ['./tripping.component.scss']
})
export class TrippingComponent implements OnInit, OnDestroy {
  rangeDates: Date[];
  masterData: MasterData;
  destroying = false;
  historyTrippingData: TrippingModel[];

  constructor(private store: Store<ApplicationState>,
              private dateFormatService: DateFormatService,
              private messageService: MessageService) {
                this.store.dispatch(new GetCommonMasterDataAction());
                const yesterday = new Date();
                const today = new Date();
                yesterday.setDate(today.getDate() - 1);
                const startDate = moment().startOf('month').toDate();
                const endDate =  moment(yesterday).toDate();
                this.rangeDates = [startDate, endDate];
                const startDateString = this.dateFormatService.getStringDate(this.rangeDates[0]);
                const endDateString = this.dateFormatService.getStringDate(this.rangeDates[1]);
                this.store.dispatch(new GetTrippingHistroyAction({
                  fromDate: startDateString,
                  toDate: endDateString
                }));
              }

  ngOnInit() {
    this.store.pipe(select(fromRoot.selectCommonMasterData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data) {
        this.masterData = data;
      }
    });

    this.store.pipe(select(fromRoot.selectHistoricElemetns),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data && data.TrippingData) {
        this.historyTrippingData = data.TrippingData;
      }
    });
  }

  getReport() {
    if (this.rangeDates && this.rangeDates.length > 1) {
      const startDate = this.dateFormatService.getStringDate(this.rangeDates[0]);
      const endDate = this.dateFormatService.getStringDate(this.rangeDates[1]);
      this.store.dispatch(new GetTrippingHistroyAction({
        fromDate: startDate,
        toDate: endDate
      }));
    } else {
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Tripping Elements Report',
         detail: 'Please choose date range to download report', closable: true }
      );
    }
  }

  ngOnDestroy() {
    this.destroying = true;
  }

}
