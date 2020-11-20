import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Logbook } from '../../models/logbook.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { PowerChangeOver } from '../../models/power-change-over.model';
import { AddPCOCodeAction, CancelPCOCodeAction, UpdatePCODataAction } from 'src/app/store/actions';
import * as moment from 'moment';
import { MessageService, MenuItem, DialogService } from 'primeng/api';
import { CancelCodeDialogComponent } from '../cancel-code-dialog/cancel-code-dialog.component';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-power-change-over',
  templateUrl: './power-change-over.component.html',
  styleUrls: ['./power-change-over.component.scss']
})
export class PowerChangeOverComponent implements OnInit, OnDestroy {
  destroying = false;
  currLogbookData: Logbook;
  pcoData: PowerChangeOver[] = [];
  PCOForm: FormGroup;
  isFormEdit: boolean;
  currSelectedData: PowerChangeOver;
  dateFormat = 'dd/mm/yy';
  @Input()
  set logbookData(data: Logbook) {
    this.currLogbookData = data;
    this.bindData();
  }
  constructor(private formBuilder: FormBuilder,
              private store: Store<ApplicationState>,
              private dialogService: DialogService) { }

  ngOnInit() {
    this.initiateForm();
    this.bindData();
  }

  initiateForm(formData: PowerChangeOver = null) {
    this.PCOForm = this.formBuilder.group({
      Remarks: [{
        value: formData && formData.Remarks ? formData.Remarks : null,
        disabled: false
      }, Validators.required],
      ChangeOverDate: [{
        value: formData && formData.ChangeOverDate ? moment(formData.ChangeOverDate, 'DD/MM/YYYY').format('DD/MM/YYYY')
         : moment().format('DD/MM/YYYY'),
        disabled: formData && formData.Remarks
      }, Validators.required],
      ChangeOverTime: [{
        value: formData && formData.ChangeOverTime ? moment(formData.ChangeOverTime, 'HH:mm').format('HH:mm')
         : moment().format('HH:mm'),
        disabled: formData && formData.Remarks
      }, Validators.required],
      ActualDate: [{
        value: formData && formData.ActualDate ? moment(formData.ActualDate, 'DD/MM/YYYY').format('DD/MM/YYYY') : null,
        disabled: false
      }],
      ActualTime: [{
        value: formData && formData.ActualTime ? moment(formData.ActualTime, 'HH:mm').format('HH:mm') : null,
        disabled: false
      }]
    });
  }

  bindData() {
    this.pcoData = [];
    if (this.currLogbookData && this.currLogbookData.PowerChangeOverData) {
      this.pcoData = this.currLogbookData.PowerChangeOverData.map(x => {
        const currData = this.prepareActions(x);
        return currData;
      });
    }
  }

  createCode() {
    const formData = this.PCOForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    formData.ChangeOverTime = moment(formData.ChangeOverTime, 'HH:mm').format('HH:mm');
    formData.ChangeOverDate = moment(formData.ChangeOverDate, 'DD/MM/YYYY').format('DD/MM/YYYY');
    formData.ActualTime = formData.ActualTime ? moment(formData.ActualTime, 'HH:mm').format('HH:mm') : '';
    formData.ActualDate = formData.ActualDate ? moment(formData.ActualDate, 'DD/MM/YYYY').format('DD/MM/YYYY') : '';
    this.store.dispatch(new AddPCOCodeAction(formData));
    this.PCOForm.reset();
  }

  onRowEdit(data: PowerChangeOver) {
    this.currSelectedData = data;
    this.isFormEdit = true;
    this.PCOForm.reset();
    this.initiateForm(data);
  }

  updateData() {
    const formData = Object.assign({}, this.PCOForm.getRawValue()) as PowerChangeOver;
    formData.LogbookId = this.currSelectedData.LogbookId;
    formData.RequestId = this.currSelectedData.RequestId;
    formData.ActualTime = formData.ActualTime ? moment(formData.ActualTime, 'HH:mm').format('HH:mm') : '';
    formData.ActualDate = formData.ActualDate ? moment(formData.ActualDate, 'DD/MM/YYYY').format('DD/MM/YYYY') : '';
    this.store.dispatch(new UpdatePCODataAction(formData));
    this.isFormEdit = false;
    this.PCOForm.reset();
    this.initiateForm();
  }

  cancel() {
    this.PCOForm.reset();
    this.isFormEdit = false;
    this.initiateForm();
  }

  prepareActions(data: PowerChangeOver): PowerChangeOver {
    const currData = Object.assign({}, data);
    currData.pcoid = data.RequestId;
    const menuItems: MenuItem[] = [];
    if (!data.IsCancelled) {
      menuItems.push( {label: 'Cancel Code', icon: 'pi pi-sign-out', command: () => {
        this.cancelCode(currData);
      }});
    }
    currData.menuItems = menuItems;
    return currData;
  }

  cancelCode(data: PowerChangeOver) {
    const dialogRef = this.dialogService.open(CancelCodeDialogComponent, {
      header: 'Cancel Code',
      width: '480px',
      contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
    });
    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(thisData => {
      if (thisData) {
        const currCodeData = Object.assign({}, data);
        currCodeData.CancelRemarks = thisData;
        currCodeData.IsCancelled = true;
        this.store.dispatch(new CancelPCOCodeAction(currCodeData));
      }
    });
  }

  ngOnDestroy() {
    this.destroying = true;
  }
}
