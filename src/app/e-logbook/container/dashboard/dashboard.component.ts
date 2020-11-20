import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogbookDashboard } from 'src/app/shared/models/logbook-dashboard.model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { LoadLogbookDashboardAction, ClearLogbookAction } from 'src/app/store/actions';
import * as fromRoot from '../../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DateFormatService } from 'src/app/shared/services/date-format.service';

@Component({
  selector: 'app-logbook-dashboard-container',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardContainerComponent implements OnInit, OnDestroy {
  dashboardData: LogbookDashboard[];
  destroying = false;
  selectedPeriod: Date = new Date();
  constructor( private store: Store<ApplicationState>,
               private router: Router,
               private dateFormatService: DateFormatService) {
                 const month = this.dateFormatService.getMonthFormat(this.selectedPeriod);
                 this.store.dispatch(new LoadLogbookDashboardAction(month));
  }

  ngOnInit() {
    this.store.pipe(select(fromRoot.selectLogbookDashboard),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      this.dashboardData = data;
    });
  }

  viewEditLogbook(data?: LogbookDashboard) {
    this.store.dispatch(new ClearLogbookAction());
    if (data) {
      this.router.navigate([`/elogbook/logbook/${data.RequestId}`]);
    } else {
      this.router.navigate([`/elogbook/logbook/create`]);
    }
  }

  onMonthSelect() {
    const month = this.dateFormatService.getMonthFormat(this.selectedPeriod);
    this.store.dispatch(new LoadLogbookDashboardAction(month));
  }

  ngOnDestroy() {
    this.destroying = true;
  }

}
