import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-sugar-mills-generation',
  templateUrl: './sugar-mills-generation.component.html',
  styleUrls: ['./sugar-mills-generation.component.scss']
})
export class SugarMillsGenerationComponent implements OnInit {
  isdelete = false;
  SugarMillsGenerationForm: FormGroup;
  sugarMillsGenerationData: any;
  buttonText = 'Edit Sugar Mills Generation';

  constructor(private fb: FormBuilder,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.sugarMillsGenerationData = this.config.data.sugarMillsGenerationData;
    this.isdelete = this.config.data.isdelete;
    this.SugarMillsGenerationForm =
      this.fb.group({
        Id: '',
        LogbookId: '',
        bharat_sm_8_time: '',
        bharat_sm_8_import: '',
        hari_nagar_sm_14_time: '',
        hari_nagar_sm_14_import: '',
        swadeshi_sm_10_time: '',
        swadeshi_sm_10_import: '',
        HPCL_biofuels_lauria_20_time: '',
        HPCL_biofuels_lauria_20_import: '',
        hasanpur_sm_15_time: '',
        hasanpur_sm_15_import: '',
        HPCL_biofuels_sugauli_20_time: '',
        HPCL_biofuels_sugauli_20_import: '',
        sugar_mill_gen_97_time: '',
        sugar_mill_gen_97_import: '',
      });
    if (this.sugarMillsGenerationData !== null) {
        this.populateEditableData(this.sugarMillsGenerationData);
      }
  }
  submitData() {
    if (this.SugarMillsGenerationForm.dirty && this.SugarMillsGenerationForm.valid) {
      const p = Object.assign({}, this.sugarMillsGenerationData, this.SugarMillsGenerationForm.value);
      p.sugar_mill_gen_97_import =  p.bharat_sm_8_import + p.hari_nagar_sm_14_import + p.swadeshi_sm_10_import
      + p.HPCL_biofuels_lauria_20_import + p.hasanpur_sm_15_import +
      p.HPCL_biofuels_sugauli_20_import;
      this.ref.close(p);
    }
  }
  populateEditableData(p) {
    this.SugarMillsGenerationForm.get('Id').setValue(p.Id);
    this.SugarMillsGenerationForm.get('LogbookId').setValue(p.LogbookId);
    this.SugarMillsGenerationForm.get('bharat_sm_8_time').setValue(p.bharat_sm_8_time);
    this.SugarMillsGenerationForm.get('bharat_sm_8_import').setValue(p.bharat_sm_8_import);
    this.SugarMillsGenerationForm.get('hari_nagar_sm_14_time').setValue(p.hari_nagar_sm_14_time);
    this.SugarMillsGenerationForm.get('hari_nagar_sm_14_import').setValue(p.hari_nagar_sm_14_import);
    this.SugarMillsGenerationForm.get('swadeshi_sm_10_time').setValue(p.swadeshi_sm_10_time);
    this.SugarMillsGenerationForm.get('swadeshi_sm_10_import').setValue(p.swadeshi_sm_10_import);
    this.SugarMillsGenerationForm.get('HPCL_biofuels_lauria_20_time').setValue(p.HPCL_biofuels_lauria_20_time);
    this.SugarMillsGenerationForm.get('HPCL_biofuels_lauria_20_import').setValue(p.HPCL_biofuels_lauria_20_import);
    this.SugarMillsGenerationForm.get('hasanpur_sm_15_time').setValue(p.hasanpur_sm_15_time);
    this.SugarMillsGenerationForm.get('hasanpur_sm_15_import').setValue(p.hasanpur_sm_15_import);
    this.SugarMillsGenerationForm.get('HPCL_biofuels_sugauli_20_time').setValue(p.HPCL_biofuels_sugauli_20_time);
    this.SugarMillsGenerationForm.get('HPCL_biofuels_sugauli_20_import').setValue(p.HPCL_biofuels_sugauli_20_import);
    this.SugarMillsGenerationForm.get('sugar_mill_gen_97_time').setValue(p.sugar_mill_gen_97_time);
    this.SugarMillsGenerationForm.get('sugar_mill_gen_97_import').setValue(p.sugar_mill_gen_97_import);
  }

}
