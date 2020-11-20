import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirstTimeChargeLine } from 'src/app/shared/models/first-time-charge-lines.model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { GetLineValuesAction, AddLineValueAction, UpdateLineValueAction } from 'src/app/store/actions';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { FIRST_TIME_CHARGE_LINE_HEADERS } from 'src/app/shared/models/table-headers';
import { DialogService } from 'primeng/api';
import { FirstTimeChargeLineDialogueComponent } from '../first-time-charge-line-dialogue/first-time-charge-line-dialogue.component';


@Component({
  selector: 'app-first-time-charge-line',
  templateUrl: './first-time-charge-line.component.html',
  styleUrls: ['./first-time-charge-line.component.scss'],
  providers: [DialogService]
})
export class FirstTimeChargeLineComponent implements OnInit, OnDestroy {
  firstTimeChargeLines: FirstTimeChargeLine[];
  destroying = false;
  selectedColumns: any[] = [];

  constructor(private store: Store<ApplicationState>,
    private dialogService: DialogService) {
    this.store.dispatch(new GetLineValuesAction());
  }

  ngOnInit() {
    this.selectedColumns = FIRST_TIME_CHARGE_LINE_HEADERS;
    this.store.pipe(select(fromRoot.selectFirstTimeChargeLineData),
      takeWhile(() => !this.destroying))
      .subscribe(data => {
        this.firstTimeChargeLines = data;
      });
  }
  addUpdateFirstTimeChargeLine(data?: FirstTimeChargeLine) {
    const currentLine = data ? data : Object.assign({}) as FirstTimeChargeLine;
    const dialogRef = this.dialogService.open(FirstTimeChargeLineDialogueComponent, {
      data: {
        currentLineData: currentLine
      },
      header: 'Add Line Value',
      width: '980px',
      contentStyle: {
        border: '1px solid #171616',
        'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
        'padding-right': '3px !important', background: '#fff', color: '#000'
      }
    });
    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const formData = Object.assign({}, currentLine, item);
        if (formData.Id > 0 && formData.LineName) {
          this.store.dispatch(new UpdateLineValueAction(formData));
        } else {
          this.store.dispatch(new AddLineValueAction(formData));
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.destroying = true;
  }
}
