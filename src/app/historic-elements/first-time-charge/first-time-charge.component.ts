import { Component, OnInit, OnDestroy } from '@angular/core';
import { MasterData, IOutageSelectOptions } from 'src/app/shared/models/master-data.model';
import { FirstTimeChargeModel } from 'src/app/shared/models/first-time-charge.model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { DateFormatService } from 'src/app/shared/services/date-format.service';
import { GetCommonMasterDataAction, GetReasonRemarksOptionsAction, GetFirstTimeChargeHistroyAction } from 'src/app/store/actions';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-historic-first-time-charge',
  templateUrl: './first-time-charge.component.html',
  styleUrls: ['./first-time-charge.component.scss']
})
export class FirstTimeChargeComponent implements OnInit, OnDestroy {
  rangeDates: Date[];
  masterData: MasterData;
  ouatgeSelectOptions: IOutageSelectOptions;
  destroying = false;
  historyFirstTimeChargeData: FirstTimeChargeModel[];

  constructor(private store: Store<ApplicationState>,
              private dateFormatService: DateFormatService,
              private messageService: MessageService) {
                this.store.dispatch(new GetCommonMasterDataAction());
                this.store.dispatch(new GetReasonRemarksOptionsAction());
                const yesterday = new Date();
                const today = new Date();
                yesterday.setDate(today.getDate() - 1);
                const startDate = moment().startOf('month').toDate();
                const endDate =  moment(yesterday).toDate();
                this.rangeDates = [startDate, endDate];
                const startDateString = this.dateFormatService.getStringDate(this.rangeDates[0]);
                const endDateString = this.dateFormatService.getStringDate(this.rangeDates[1]);
                this.store.dispatch(new GetFirstTimeChargeHistroyAction({
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
    this.store.pipe(select(fromRoot.selectOutageMasterData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data && data.selectOptions) {
        this.ouatgeSelectOptions = data.selectOptions;
      }
    });

    this.store.pipe(select(fromRoot.selectHistoricElemetns),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data && data.FirstTimeChargeData) {
        this.historyFirstTimeChargeData = data.FirstTimeChargeData;
      }
    });
  }

  getReport() {
    if (this.rangeDates && this.rangeDates.length > 1) {
      const startDate = this.dateFormatService.getStringDate(this.rangeDates[0]);
      const endDate = this.dateFormatService.getStringDate(this.rangeDates[1]);
      this.store.dispatch(new GetFirstTimeChargeHistroyAction({
        fromDate: startDate,
        toDate: endDate
      }));
    } else {
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'First Time Charge Report',
         detail: 'Please choose date range to download report', closable: true }
      );
    }
  }
  ngOnDestroy() {
    this.destroying = true;
  }

}

