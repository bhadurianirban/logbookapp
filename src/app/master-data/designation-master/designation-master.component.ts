import { Component, OnInit, OnDestroy } from '@angular/core';
import {DesignationValue} from 'src/app/shared/models/designation-value.model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { ConfirmationService} from 'primeng/api';
// tslint:disable-next-line: max-line-length
import { GetDesignationValuesAction, AddDesignationValueAction, UpdateDesignationValueAction, DeleteDesignationValuesAction, SaveDesignationValueAction } from 'src/app/store/actions';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { DESIGNATION_VALUES_HEADERS } from 'src/app/shared/models/table-headers';
import { DialogService } from 'primeng/api';
import { DesignationDialogueComponent } from 'src/app/master-data/designation-dialogue/designation-dialogue.component';

@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.scss'],
  providers: [DialogService]
})
export class DesignationMasterComponent implements OnInit {
  DesignationType: DesignationValue[];
  destroying = false;
  selectedColumns: any[] = [];

  constructor(private store: Store<ApplicationState>,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService) {this.store.dispatch(new GetDesignationValuesAction()); }

  ngOnInit() {
    this.selectedColumns = DESIGNATION_VALUES_HEADERS;
    this.store.pipe(select(fromRoot.selectDesignationValueData),
      takeWhile(() => !this.destroying))
      .subscribe(data => {
          this.DesignationType = data.slice();
      });
  }
  addUpdateDesignation(data?: DesignationValue) {
    const currentdesignation = data ? data : Object.assign({}) as  DesignationValue;
    const dialogRef = this.dialogService.open(DesignationDialogueComponent, {
      data: {
        currentDesignationData: currentdesignation, designationdata: this.DesignationType
      },
      header: 'Add Designation Value',
      width: '980px',
      contentStyle: {border: '1px solid #171616',
                    'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
                    'padding-right': '3px !important', background: '#fff', color: '#000'}
    });
    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const formData = Object.assign({}, currentdesignation, item) ;
        if (!formData.Id || formData.Id === 0) {
          this.store.dispatch(new AddDesignationValueAction(formData));
        }
      }
    });
  }
  saveDesignation() {
    this.store.dispatch(new SaveDesignationValueAction(this.DesignationType));
        }
  deleteDesignation(data: DesignationValue) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the item?',
      accept: () => {
        this.store.dispatch(new DeleteDesignationValuesAction(data));
      }
    });
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.destroying = true;
  }
}
