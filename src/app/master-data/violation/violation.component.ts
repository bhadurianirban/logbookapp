import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViolationValue } from 'src/app/shared/models/violation-value.model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { ConfirmationService} from 'primeng/api';
// tslint:disable-next-line: max-line-length
import { GetViolationValuesAction, AddViolationValueAction, UpdateViolationValueAction, DeleteViolationValuesAction } from 'src/app/store/actions';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { VIOLATION_VALUES_HEADERS } from 'src/app/shared/models/table-headers';
import { DialogService } from 'primeng/api';
import { ViolationDialogComponent } from 'src/app/master-data/violation-dialog/violation-dialog.component';


@Component({
  selector: 'app-violation',
  templateUrl: './violation.component.html',
  styleUrls: ['./violation.component.scss'],
  providers: [DialogService]
})
export class ViolationComponent implements OnInit, OnDestroy  {
  ViolationType: ViolationValue[];
  destroying = false;
  selectedColumns: any[] = [];
  constructor(private store: Store<ApplicationState>,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService, ) {
    this.store.dispatch(new GetViolationValuesAction());
  }


  ngOnInit() {this.selectedColumns = VIOLATION_VALUES_HEADERS;
              this.store.pipe(select(fromRoot.selectViolationValueData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
        this.ViolationType = data;
    });
  }
  addUpdateViolation(data?: ViolationValue) {
    const currentviolation = data ? data : Object.assign({}) as  ViolationValue;
    const dialogRef = this.dialogService.open(ViolationDialogComponent, {
      data: {
        currentViolationData: currentviolation
      },
      header: 'Add Violation Value',
      width: '980px',
      contentStyle: {border: '1px solid #171616',
                    'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
                    'padding-right': '3px !important', background: '#fff', color: '#000'}
    });
    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const formData = Object.assign({}, currentviolation, item) ;
        if (formData.Id > 0) {
          this.store.dispatch(new UpdateViolationValueAction(formData));
        } else {
          this.store.dispatch(new AddViolationValueAction(formData));
        }
      }
    });
  }

  deleteViolation(data: ViolationValue) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the item?',
      accept: () => {
        this.store.dispatch(new DeleteViolationValuesAction(data));
      }
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.destroying = true;
  }
}
