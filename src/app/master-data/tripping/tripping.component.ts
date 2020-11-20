import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrippingValue } from 'src/app/shared/models/tripping-value.model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { ConfirmationService} from 'primeng/api';
// tslint:disable-next-line: max-line-length
import { GetTrippingValuesAction, AddTrippingValueAction, UpdateTrippingValueAction, DeleteTrippingValuesAction } from 'src/app/store/actions';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { TRIPPING_VALUES_HEADERS } from 'src/app/shared/models/table-headers';
import { DialogService } from 'primeng/api';
import { TrippingDialogueComponent } from 'src/app/master-data/tripping-dialogue/tripping-dialogue.component';
@Component({
  selector: 'app-tripping',
  templateUrl: './tripping.component.html',
  styleUrls: ['./tripping.component.scss'],
  providers: [DialogService]
})
export class TrippingComponent implements OnInit {
  TrippingType: TrippingValue[];
  destroying = false;
  selectedColumns: any[] = [];

  constructor(private store: Store<ApplicationState>,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService) { this.store.dispatch(new GetTrippingValuesAction()); }

  ngOnInit() {
    this.selectedColumns = TRIPPING_VALUES_HEADERS;
    this.store.pipe(select(fromRoot.selectTrippingValueData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
        this.TrippingType = data;
    });
  }
  addUpdateTripping(data?: TrippingValue) {
    const currenttripping = data ? data : Object.assign({}) as  TrippingValue;
    const dialogRef = this.dialogService.open(TrippingDialogueComponent, {
      data: {
        currentTrippingData: currenttripping
      },
      header: 'Add Tripping Value',
      width: '980px',
      contentStyle: {border: '1px solid #171616',
                    'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
                    'padding-right': '3px !important', background: '#fff', color: '#000'}
    });
    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const formData = Object.assign({}, currenttripping, item) ;
        if (formData.Id > 0) {
          this.store.dispatch(new UpdateTrippingValueAction(formData));
        } else {
          this.store.dispatch(new AddTrippingValueAction(formData));
        }
      }
    });
  }
  deleteTripping(data: TrippingValue) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the item?',
      accept: () => {
        this.store.dispatch(new DeleteTrippingValuesAction(data));
      }
    });
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.destroying = true;
  }
}
