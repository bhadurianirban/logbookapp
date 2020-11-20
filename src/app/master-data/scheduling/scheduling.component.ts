import { Component, OnInit, OnDestroy } from '@angular/core';
import { SchedulingValue } from 'src/app/shared/models/scheduling-value.model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { ConfirmationService} from 'primeng/api';
// tslint:disable-next-line: max-line-length
import { GetSchedulingValuesAction, AddSchedulingValueAction, UpdateSchedulingValueAction, DeleteSchedulingValuesAction } from 'src/app/store/actions';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { SCHEDULING_VALUES_HEADERS } from 'src/app/shared/models/table-headers';
import { DialogService } from 'primeng/api';
import { SchedulingDialogComponent } from 'src/app/master-data/scheduling-dialog/scheduling-dialog.component';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss'],
  providers: [DialogService]
})
export class SchedulingComponent implements OnInit, OnDestroy  {
  SchedulingType: SchedulingValue[];
  destroying = false;
  selectedColumns: any[] = [];
  constructor(private store: Store<ApplicationState>,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService ) { this.store.dispatch(new GetSchedulingValuesAction()); }
  ngOnInit() {
    this.selectedColumns = SCHEDULING_VALUES_HEADERS;
    this.store.pipe(select(fromRoot.selectSchedulingValueData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
        this.SchedulingType = data;
    });
  }
  addUpdateScheduling(data?: SchedulingValue) {
    const currentscheduling = data ? data : Object.assign({}) as  SchedulingValue;
    const dialogRef = this.dialogService.open(SchedulingDialogComponent, {
      data: {
        currentSchedulingData: currentscheduling
      },
      header: 'Add Scheduling Value',
      width: '980px',
      contentStyle: {border: '1px solid #171616',
                    'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
                    'padding-right': '3px !important', background: '#fff', color: '#000'}
    });
    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const formData = Object.assign({}, currentscheduling, item) ;
        if (formData.Id > 0) {
          this.store.dispatch(new UpdateSchedulingValueAction(formData));
        } else {
          this.store.dispatch(new AddSchedulingValueAction(formData));
        }
      }
    });
  }

  deleteScheduling(data: SchedulingValue) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the item?',
      accept: () => {
        this.store.dispatch(new DeleteSchedulingValuesAction(data));
      }
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.destroying = true;
  }
}
