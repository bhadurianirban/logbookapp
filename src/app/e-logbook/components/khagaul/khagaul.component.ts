import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-khagaul',
  templateUrl: './khagaul.component.html',
  styleUrls: ['./khagaul.component.scss']
})
export class KhagaulComponent implements OnInit {
  isdelete = false;
  KhagaulForm: FormGroup;
  khagaulData: any;
  buttonText = 'Edit Khagaul';


  constructor(private fb: FormBuilder,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.khagaulData = this.config.data.khagaulData;
    this.isdelete = this.config.data.isdelete;
    this.KhagaulForm =
      this.fb.group({
        Id: '',
        LogbookId: '',
        BSPTCL_1: '',
        BGCL_2: '',
        BGCL_3: '',
        Total: '',
      });
    if (this.khagaulData !== null) {
        this.populateEditableData(this.khagaulData);
      }
  }
  submitData() {
    if (this.KhagaulForm.dirty && this.KhagaulForm.valid) {
      const p = Object.assign({}, this.khagaulData, this.KhagaulForm.value);
      p.Total = p.BSPTCL_1 + p.BGCL_2 + p.BGCL_3;
      this.ref.close(p);
    }
  }
  populateEditableData(p) {
    this.KhagaulForm.get('Id').setValue(p.Id);
    this.KhagaulForm.get('LogbookId').setValue(p.LogbookId);
    this.KhagaulForm.get('BSPTCL_1').setValue(p.BSPTCL_1);
    this.KhagaulForm.get('BGCL_2').setValue(p.BGCL_2);
    this.KhagaulForm.get('BGCL_3').setValue(p.BGCL_3);
    this.KhagaulForm.get('Total').setValue(p.Total);
  }
}
