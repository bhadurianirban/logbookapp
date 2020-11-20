import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { CaptureTieLineAction, UpdateTieLineAction } from 'src/app/store/actions';
import { DayWiseTieLine } from '../../models/load-management.model';
import { DialogService, ConfirmationService, MessageService, MenuItem } from 'primeng/api';
import { TIE_LINES_HEADERS } from '../../models/table-headers';

import * as moment from 'moment';

@Component({
  selector: 'app-tie-lines',
  templateUrl: './tie-lines.component.html',
  styleUrls: ['./tie-lines.component.scss']
})
export class TieLinesComponent implements OnInit {
  currTieLineData: DayWiseTieLine[] = [];
  tieLineColumns: any[] = [];
  @Input()
  set lineData(data: DayWiseTieLine[]) {
    this.currTieLineData = data;
    this.bindData();
  }
  @Input()
  showSearchPanel: boolean;
  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
  }

  captureData() {
    const currTime = moment().format('HH:mm:ss');
    this.store.dispatch(new CaptureTieLineAction(currTime));
  }

  updateData() {
    this.store.dispatch(new UpdateTieLineAction(this.currTieLineData));
  }

  bindData() {
    this.tieLineColumns = TIE_LINES_HEADERS;
  }

}
