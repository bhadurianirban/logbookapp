import { Component, OnInit, OnDestroy } from '@angular/core';
import { IssueValue } from 'src/app/shared/models/issue-value.model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { ConfirmationService} from 'primeng/api';
// tslint:disable-next-line: max-line-length
import { GetIssueValuesAction, AddIssueValueAction, UpdateIssueValueAction, DeleteIssueValuesAction } from 'src/app/store/actions';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { ISSUE_VALUES_HEADERS } from 'src/app/shared/models/table-headers';
import { DialogService } from 'primeng/api';
import { IssueDialogueComponent } from 'src/app/master-data/issue-dialogue/issue-dialogue.component';
@Component({
  selector: 'app-issue-master',
  templateUrl: './issue-master.component.html',
  styleUrls: ['./issue-master.component.scss'],
  providers: [DialogService]
})
export class IssueMasterComponent implements OnInit, OnDestroy {
  IssueType: IssueValue[];
  destroying = false;
  selectedColumns: any[] = [];
  constructor(private store: Store<ApplicationState>,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService, ) {this.store.dispatch(new GetIssueValuesAction()); }

  ngOnInit() {
    this.selectedColumns = ISSUE_VALUES_HEADERS;
    this.store.pipe(select(fromRoot.selectIssueValueData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
        this.IssueType = data;
    });
  }
  addUpdateIssue(data?: IssueValue) {
    const currentissue = data ? data : Object.assign({}) as  IssueValue;
    const dialogRef = this.dialogService.open(IssueDialogueComponent, {
      data: {
        currentIssueData: currentissue
      },
      header: 'Add Issue',
      width: '980px',
      contentStyle: {border: '1px solid #171616',
                    'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
                    'padding-right': '3px !important', background: '#fff', color: '#000'}
    });
    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const formData = Object.assign({}, currentissue, item) ;
        if (formData.Id > 0) {
          this.store.dispatch(new UpdateIssueValueAction(formData));
        } else {
          this.store.dispatch(new AddIssueValueAction(formData));
        }
      }
    });
  }

  deleteIssue(data: IssueValue) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the item?',
      accept: () => {
        this.store.dispatch(new DeleteIssueValuesAction(data));
      }
    });
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.destroying = true;
  }
}
