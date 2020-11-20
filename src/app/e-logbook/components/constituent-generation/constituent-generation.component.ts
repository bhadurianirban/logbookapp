import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-constituent-generation',
  templateUrl: './constituent-generation.component.html',
  styleUrls: ['./constituent-generation.component.scss']
})
export class ConstituentGenerationComponent implements OnInit {
  isdelete = false;
  ConstituentsGenerationForm: FormGroup;
  constituentGenerationData: any;
  buttonText = 'Edit Constituent Generation';

  constructor(private fb: FormBuilder,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.constituentGenerationData = this.config.data.constituentGenerationData;
    this.isdelete = this.config.data.isdelete;
    this.ConstituentsGenerationForm =
      this.fb.group({
        Id: '',
        LogbookId: '',
        farakka_load: '',
        talchar_load: '',
        kahalgaon_load: '',
        barh_load: '',
        chukha_load: '',
        rangit_load: '',
        tala_load: '',
        teesta_load: '',
        WBSEGCL_load: '',
        GRIDCO_load: '',
        BSPGCL_load: '',
        KBUNL_load: '',
        DVC_load: '',
        CESC_load: '',
        JSEB_load: '',
        kurichu_load: '',
      });
    if (this.constituentGenerationData !== null) {
        this.populateEditableData(this.constituentGenerationData);
      }
  }
  submitData() {
    if (this.ConstituentsGenerationForm.dirty && this.ConstituentsGenerationForm.valid) {
      const p = Object.assign({}, this.constituentGenerationData, this.ConstituentsGenerationForm.value);
      this.ref.close(p);
    }
  }
  populateEditableData(p) {
    this.ConstituentsGenerationForm.get('Id').setValue(p.Id);
    this.ConstituentsGenerationForm.get('LogbookId').setValue(p.LogbookId);
    this.ConstituentsGenerationForm.get('farakka_load').setValue(p.farakka_load);
    this.ConstituentsGenerationForm.get('talchar_load').setValue(p.talchar_load);
    this.ConstituentsGenerationForm.get('kahalgaon_load').setValue(p.kahalgaon_load);
    this.ConstituentsGenerationForm.get('barh_load').setValue(p.barh_load);
    this.ConstituentsGenerationForm.get('chukha_load').setValue(p.chukha_load);
    this.ConstituentsGenerationForm.get('rangit_load').setValue(p.rangit_load);
    this.ConstituentsGenerationForm.get('tala_load').setValue(p.tala_load);
    this.ConstituentsGenerationForm.get('teesta_load').setValue(p.teesta_load);
    this.ConstituentsGenerationForm.get('WBSEGCL_load').setValue(p.WBSEGCL_load);
    this.ConstituentsGenerationForm.get('GRIDCO_load').setValue(p.GRIDCO_load);
    this.ConstituentsGenerationForm.get('BSPGCL_load').setValue(p.BSPGCL_load);
    this.ConstituentsGenerationForm.get('KBUNL_load').setValue(p.KBUNL_load);
    this.ConstituentsGenerationForm.get('DVC_load').setValue(p.DVC_load);
    this.ConstituentsGenerationForm.get('CESC_load').setValue(p.CESC_load);
    this.ConstituentsGenerationForm.get('JSEB_load').setValue(p.JSEB_load);
    this.ConstituentsGenerationForm.get('kurichu_load').setValue(p.kurichu_load);
  }

}
