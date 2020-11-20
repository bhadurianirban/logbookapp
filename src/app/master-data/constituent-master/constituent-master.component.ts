import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ConstituentValue } from 'src/app/shared/models/constituent-value.model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { ConfirmationService} from 'primeng/api';
// tslint:disable-next-line: max-line-length
import { GetConstituentValuesAction, AddConstituentValueAction, UpdateConstituentValueAction, DeleteConstituentValuesAction } from 'src/app/store/actions';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { CONSTITUENT_VALUES_HEADERS } from 'src/app/shared/models/table-headers';
import { DialogService } from 'primeng/api';
import { ConstituentDialogueComponent } from 'src/app/master-data/constituent-dialogue/constituent-dialogue.component';
@Component({
  selector: 'app-constituent-master',
  templateUrl: './constituent-master.component.html',
  styleUrls: ['./constituent-master.component.scss'],
  providers: [DialogService]
})
export class ConstituentMasterComponent implements OnInit, OnDestroy {
  ConstituentType: ConstituentValue[];
  destroying = false;
  selectedColumns: any[] = [];
  constructor(private store: Store<ApplicationState>,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService, ) {this.store.dispatch(new GetConstituentValuesAction()); }

              ngOnInit() {this.selectedColumns = CONSTITUENT_VALUES_HEADERS;
                          this.store.pipe(select(fromRoot.selectConstituentValueData),
      takeWhile(() => !this.destroying))
      .subscribe(data => {
          this.ConstituentType = data;
      });
    }
    addUpdateConstituent(data?: ConstituentValue) {
      const currentconstituent = data ? data : Object.assign({}) as  ConstituentValue;
      const dialogRef = this.dialogService.open(ConstituentDialogueComponent, {
        data: {
          currentConstituentData: currentconstituent
        },
        header: 'Add Constituent Value',
        width: '980px',
        contentStyle: {border: '1px solid #171616',
                      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
                      'padding-right': '3px !important', background: '#fff', color: '#000'}
      });
      dialogRef.onClose.pipe(
        takeWhile(() => !this.destroying)
      ).subscribe(item => {
        if (item) {
          const formData = Object.assign({}, currentconstituent, item) ;
          if (formData.Id > 0) {
            this.store.dispatch(new UpdateConstituentValueAction(formData));
          } else {
            this.store.dispatch(new AddConstituentValueAction(formData));
          }
        }
      });
    }
    deleteConstituent(data: ConstituentValue) {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete the item?',
        accept: () => {
          this.store.dispatch(new DeleteConstituentValuesAction(data));
        }
      });
    }
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.destroying = true;
    }
}


