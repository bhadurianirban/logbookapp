import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logbook } from 'src/app/shared/models/logbook.model';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-logbook-create',
  templateUrl: './logbook-create.component.html',
  styleUrls: ['./logbook-create.component.scss']
})
export class LogbookCreateComponent implements OnInit, OnDestroy {
  @Output() createNewLogbook: EventEmitter<any> = new EventEmitter();
  @Output() submitLogbookData: EventEmitter<any> = new EventEmitter();
  @Output() updateLogbook: EventEmitter<any> = new EventEmitter();
  createForm: FormGroup;
  currLogbookData: Logbook;
  logbookStatus: string;
  allowLogbookUpdate = false;
  @Input()
  set logbookData(data: Logbook) {
    this.currLogbookData = data;
    this.configureForm();
  }
  dateFormat = 'dd/mm/yy';
  maxDateValue = new Date();
  selectedChecks: any;
  shiftChecks = [
    {
      id: 1,
      name: 'Shift Handover'
    },
    {
      id: 3,
      name: 'E-Mail'
    },
    {
      id: 4,
      name: 'WhatsApp'
    }
  ];
  shifts = [
    {
        id: 1,
        name: 'Morning',
        time: '8AM - 2PM'
    },
    {
        id: 2,
        name: 'Evening',
        time: '2PM - 10PM'
    },
    {
        id: 3,
        name: 'Night',
        time: '10PM - 8AM'
    }
];
  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService) { }

  ngOnInit() {
    this.configureForm();
  }

  configureForm() {
    const logbookDate = this.currLogbookData.LogbookDate ? this.currLogbookData.LogbookDate : new Date();
    this.createForm = this.formBuilder.group({
        LogbookDate: [{ value: logbookDate, disabled: this.currLogbookData && this.currLogbookData.RequestId }, Validators.required],
        Shift: [{
          value: this.currLogbookData.Shift ? this.currLogbookData.Shift : ''
          , disabled: this.currLogbookData && this.currLogbookData.RequestId
        }, Validators.required],
        Checks: ['', Validators.required]
    });
    this.logbookStatus = this.currLogbookData.Status;
    this.allowLogbookUpdate = !this.currLogbookData.IsNextShiftCreated;
  }

  createLogbook() {
    const currLogbook = new Logbook();
    const formValue = this.createForm.getRawValue();
    if (formValue && formValue.Checks.length > 2) {
      currLogbook.LogbookDate = moment(formValue.LogbookDate).format('DD/MM/YYYY');
      currLogbook.Shift = formValue.Shift;
      this.createNewLogbook.emit(currLogbook);
    } else {
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Create Logbook',
         detail: 'Please confirm all checks by selecting each and every checkbox.', closable: true }
      );
    }
  }

  submitLogbook() {
    this.submitLogbookData.emit(this.currLogbookData.RequestId);
  }

  ngOnDestroy(): void {
    this.createForm.reset();
  }
}
