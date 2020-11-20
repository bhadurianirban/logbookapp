import { Component, OnInit, Input } from '@angular/core';
import { MasterData, IIssueType } from 'src/app/shared/models/master-data.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logbook, Issue } from 'src/app/shared/models/logbook.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UpdateIssueAction, AddIssueAction, DeleteIssueAction } from 'src/app/store/actions';
import { ApplicationState } from 'src/app/store/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  @Input()
  masterData: MasterData;
  currLogbookData: Logbook;
  @Input()
  set logbookData(data: Logbook) {
    this.currLogbookData = data;
    this.bindData();
  }
  masterIssueTypes: IIssueType[] = [];
  logbookIssues: Issue[] = [];
  clonedIssue: { [s: string]: Issue; } = {};
  IssueForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store<ApplicationState>,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.masterIssueTypes = this.masterData.commonMaster.issueTypes;
    this.IssueForm = this.formBuilder.group({
      IssueType: [{
        value: '',
        disabled: false
      }, Validators.required],
      Issue: [{
        value: '',
        disabled: false
      }, Validators.required]
    });
    this.bindData();
  }

  bindData() {
    this.logbookIssues = [];
    if (this.currLogbookData && this.currLogbookData.Issues) {
      this.logbookIssues = this.currLogbookData.Issues.map(data => {
        const issueData = Object.assign({}, data);
        issueData.issueid = data.Id.toString();
        return issueData;
      });
    }
  }

  onRowEditInit(data: Issue) {
    this.clonedIssue[data.issueid] = {...data};
  }

  onRowEditSave(data: Issue, index: number) {
    if (data.Issue && data.Issue !== '') {
      delete this.clonedIssue[data.issueid];
      this.store.dispatch(new UpdateIssueAction(data));
    } else {
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Update Issue',
         detail: 'Issue details is required', closable: true }
      );
      this.onRowEditCancel(data, index);
    }
  }

  onRowEditCancel(data: Issue, index: number) {
    this.logbookIssues[index] = this.clonedIssue[data.issueid];
    delete this.clonedIssue[data.issueid];
  }

  onRowDelete(data: Issue) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the item?',
      accept: () => {
        this.store.dispatch(new DeleteIssueAction(data));
      }
  });
  }

  addIssue() {
    const formData = this.IssueForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    formData.IssueType = formData.IssueType.Issue;
    this.store.dispatch(new AddIssueAction(formData));
    this.IssueForm.reset();
  }

}
