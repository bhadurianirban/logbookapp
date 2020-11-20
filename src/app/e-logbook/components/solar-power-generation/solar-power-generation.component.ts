import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-solar-power-generation',
  templateUrl: './solar-power-generation.component.html',
  styleUrls: ['./solar-power-generation.component.scss']
})
export class SolarPowerGenerationComponent implements OnInit {
  isdelete = false;
  SolarPowerGenerationForm: FormGroup;
  solarPowerGenerationData: any;
  buttonText = 'Edit Solar Power Plants';

  constructor(private fb: FormBuilder,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.solarPowerGenerationData = this.config.data.solarPowerGenerationData;
    this.isdelete = this.config.data.isdelete;
    this.SolarPowerGenerationForm =
      this.fb.group({
        Id: '',
        LogbookId: '',
        magadh_spp_time: '',
        magadh_spp_import: '',
        nalanda_spp_time: '',
        nalanda_spp_import: '',
        bahera_spp_time: '',
        bahera_spp_import: '',
        savkala_spp_time: '',
        savkala_spp_import: '',
        sunmark_spp_time: '',
        sunmark_spp_import: '',
        alfa_spp_time: '',
        alfa_spp_import: '',
        response_spp_time: '',
        response_spp_import: '',
        glat_spp_time: '',
        glat_spp_import: '',
        avantika_spp_time: '',
        avantika_spp_import: '',
        murera_spp_time: '',
        murera_spp_import: '',
        total_solar_power_time: '',
        total_solar_power_import: '',
      });
    if (this.solarPowerGenerationData !== null) {
        this.populateEditableData(this.solarPowerGenerationData);
      }
  }
  submitData() {
    if (this.SolarPowerGenerationForm.dirty && this.SolarPowerGenerationForm.valid) {
      const p = Object.assign({}, this.solarPowerGenerationData, this.SolarPowerGenerationForm.value);
      p.total_solar_power_import =  p.magadh_spp_import + p.nalanda_spp_import + p.bahera_spp_import
      + p.savkala_spp_import + p.sunmark_spp_import + p.alfa_spp_import
      + p.response_spp_import + p.glat_spp_import + p.avantika_spp_import +
        p.murera_spp_import;
      this.ref.close(p);
    }
  }
  populateEditableData(p) {
    this.SolarPowerGenerationForm.get('Id').setValue(p.Id);
    this.SolarPowerGenerationForm.get('LogbookId').setValue(p.LogbookId);
    this.SolarPowerGenerationForm.get('magadh_spp_time').setValue(p.magadh_spp_time);
    this.SolarPowerGenerationForm.get('magadh_spp_import').setValue(p.magadh_spp_import);
    this.SolarPowerGenerationForm.get('nalanda_spp_time').setValue(p.nalanda_spp_time);
    this.SolarPowerGenerationForm.get('nalanda_spp_import').setValue(p.nalanda_spp_import);
    this.SolarPowerGenerationForm.get('bahera_spp_time').setValue(p.bahera_spp_time);
    this.SolarPowerGenerationForm.get('bahera_spp_import').setValue(p.bahera_spp_import);
    this.SolarPowerGenerationForm.get('savkala_spp_time').setValue(p.savkala_spp_time);
    this.SolarPowerGenerationForm.get('savkala_spp_import').setValue(p.savkala_spp_import);
    this.SolarPowerGenerationForm.get('sunmark_spp_time').setValue(p.sunmark_spp_time);
    this.SolarPowerGenerationForm.get('sunmark_spp_import').setValue(p.sunmark_spp_import);
    this.SolarPowerGenerationForm.get('alfa_spp_time').setValue(p.alfa_spp_time);
    this.SolarPowerGenerationForm.get('alfa_spp_import').setValue(p.alfa_spp_import);
    this.SolarPowerGenerationForm.get('response_spp_time').setValue(p.response_spp_time);
    this.SolarPowerGenerationForm.get('response_spp_import').setValue(p.response_spp_import);
    this.SolarPowerGenerationForm.get('glat_spp_time').setValue(p.glat_spp_time);
    this.SolarPowerGenerationForm.get('glat_spp_import').setValue(p.glat_spp_import);
    this.SolarPowerGenerationForm.get('avantika_spp_time').setValue(p.avantika_spp_time);
    this.SolarPowerGenerationForm.get('avantika_spp_import').setValue(p.avantika_spp_import);
    this.SolarPowerGenerationForm.get('murera_spp_time').setValue(p.murera_spp_time);
    this.SolarPowerGenerationForm.get('murera_spp_import').setValue(p.murera_spp_import);
    this.SolarPowerGenerationForm.get('total_solar_power_time').setValue(p.total_solar_power_time);
    this.SolarPowerGenerationForm.get('total_solar_power_import').setValue(p.total_solar_power_import);
  }

}
