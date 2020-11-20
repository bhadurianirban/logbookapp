import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-system-report',
  templateUrl: './system-report.component.html',
  styleUrls: ['./system-report.component.scss']
})
export class SystemReportComponent implements OnInit {
  isdelete = false;
  SystemReportForm: FormGroup;
  systemReportData: any;
  buttonText = 'Edit System Report';

  constructor(private fb: FormBuilder,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.systemReportData = this.config.data.systemReportData;
    this.isdelete = this.config.data.isdelete;
    this.SystemReportForm =
      this.fb.group({
        Id: '',
        LogbookId: '',
        BTPS_6: '',
        BTPS_7: '',
        BTPS_8: '',
        BSPGCL_GEN: '',
        KBUNL_1: '',
        KBUNL_2: '',
        KBUNL_STAGE_1: '',
        KBUNL_3: '',
        KBUNL_4: '',
        KBUNL_STAGE_2: '',
        KBUNL_GENERATION: '',
      });
    if (this.systemReportData !== null) {
        this.populateEditableData(this.systemReportData);
      }
  }
  submitData() {
    if (this.SystemReportForm.dirty && this.SystemReportForm.valid) {
      const p = Object.assign({}, this.systemReportData, this.SystemReportForm.value);
      p.BSPGCL_GEN = p.BTPS_6 + p.BTPS_7 + p.BTPS_8;
      p.KBUNL_STAGE_1 = p.KBUNL_1 + p.KBUNL_2;
      p.KBUNL_STAGE_2 = p.KBUNL_3 + p.KBUNL_4;
      p.KBUNL_GENERATION = p.KBUNL_STAGE_1 + p.KBUNL_STAGE_2;
      this.ref.close(p);
    }
  }
  populateEditableData(p) {
    this.SystemReportForm.get('Id').setValue(p.Id);
    this.SystemReportForm.get('LogbookId').setValue(p.LogbookId);
    this.SystemReportForm.get('BTPS_6').setValue(p.BTPS_6);
    this.SystemReportForm.get('BTPS_7').setValue(p.BTPS_7);
    this.SystemReportForm.get('BTPS_8').setValue(p.BTPS_8);
    this.SystemReportForm.get('KBUNL_1').setValue(p.KBUNL_1);
    this.SystemReportForm.get('KBUNL_2').setValue(p.KBUNL_2);
    this.SystemReportForm.get('KBUNL_3').setValue(p.KBUNL_3);
    this.SystemReportForm.get('KBUNL_4').setValue(p.KBUNL_4);
    this.SystemReportForm.get('BSPGCL_GEN').setValue(p.BSPGCL_GEN);
    this.SystemReportForm.get('KBUNL_STAGE_1').setValue(p.KBUNL_STAGE_1);
    this.SystemReportForm.get('KBUNL_STAGE_2').setValue(p.KBUNL_STAGE_2);
    this.SystemReportForm.get('KBUNL_GENERATION').setValue(p.KBUNL_GENERATION);

  }

}



