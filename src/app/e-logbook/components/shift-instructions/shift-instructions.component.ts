import { Component, OnInit, Input } from '@angular/core';
import { Logbook, LogbookInstruction } from 'src/app/shared/models/logbook.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { AddInstructionAction } from 'src/app/store/actions';
import * as moment from 'moment';

@Component({
  selector: 'app-shift-instructions',
  templateUrl: './shift-instructions.component.html',
  styleUrls: ['./shift-instructions.component.scss']
})
export class ShiftInstructionsComponent implements OnInit {
  currLogbookData: Logbook;
  instructions: LogbookInstruction[] = [];
  instructionForm: FormGroup;
  dateFormat = 'dd/mm/yy';
  minDateValue = new Date();
  @Input()
  set logbookData(data: Logbook) {
    this.currLogbookData = data;
    this.bindData();
  }
  constructor(private formBuilder: FormBuilder,
              private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.instructionForm = this.formBuilder.group({
      Instruction: [{
        value: '',
        disabled: false
      }, Validators.required],
      EndDate: [{
        value: '',
        disabled: false
      }, Validators.required]
    });
    this.bindData();
  }

  bindData() {
    if (this.currLogbookData && this.currLogbookData.Instructions) {
      this.instructions = this.currLogbookData.Instructions;
    }
  }

  addInstruction() {
    const formData = this.instructionForm.getRawValue() as LogbookInstruction;
    formData.LogbookId = this.currLogbookData.RequestId;
    formData.Instruction = formData.Instruction;
    formData.EndDate = moment(formData.EndDate).format('DD/MM/YYYY');
    this.store.dispatch(new AddInstructionAction(formData));
    this.instructionForm.reset();
  }
}
