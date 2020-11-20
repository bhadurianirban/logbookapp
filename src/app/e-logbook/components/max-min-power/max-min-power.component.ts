import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-max-min-power',
  templateUrl: './max-min-power.component.html',
  styleUrls: ['./max-min-power.component.scss']
})
export class MaxMinPowerComponent implements OnInit {
  isdelete = false;
  MaxMinPowerForm: FormGroup;
  maxMinPowerData: any;
  buttonText = 'Edit Max Min POwer';

  constructor(private fb: FormBuilder,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.maxMinPowerData = this.config.data.maxMinPowerData;
    this.isdelete = this.config.data.isdelete;
    this.MaxMinPowerForm =
      this.fb.group({
        Id: '',
        LogbookId: '',
        BTPS_gen_max_power: '',
        BTPS_gen_max_time: '',
        BTPS_gen_min_power: '',
        BTPS_gen_min_time: '',
        KBUNL_gen_max_power: '',
        KBUNL_gen_max_time: '',
        KBUNL_gen_min_power: '',
        KBUNL_gen_min_time: '',
        sugar_max_power: '',
        sugar_max_time: '',
        sugar_min_power: '',
        sugar_min_time: '',
        solar_max_power: '',
        solar_max_time: '',
        solar_min_power: '',
        solar_min_time: '',
        net_power_max_power: '',
        net_power_max_time: '',
        net_power_min_power: '',
        net_power_min_time: '',
        demand_max_power: '',
        demand_max_time: '',
        demand_min_power: '',
        demand_min_time: '',
        nepal_max_power: '',
        nepal_max_time: '',
        nepal_min_power: '',
        nepal_min_time: '',
      });
    if (this.maxMinPowerData !== null) {
        this.populateEditableData(this.maxMinPowerData);
      }
  }
  submitData() {
    if (this.MaxMinPowerForm.dirty && this.MaxMinPowerForm.valid) {
      const p = Object.assign({}, this.maxMinPowerData, this.MaxMinPowerForm.value);
      this.ref.close(p);
    }
  }
  populateEditableData(p) {
    this.MaxMinPowerForm.get('Id').setValue(p.Id);
    this.MaxMinPowerForm.get('LogbookId').setValue(p.LogbookId);
    this.MaxMinPowerForm.get('BTPS_gen_max_power').setValue(p.BTPS_gen_max_power);
    this.MaxMinPowerForm.get('BTPS_gen_max_time').setValue(p.BTPS_gen_max_time);
    this.MaxMinPowerForm.get('BTPS_gen_min_power').setValue(p.BTPS_gen_min_power);
    this.MaxMinPowerForm.get('BTPS_gen_min_time').setValue(p.BTPS_gen_min_time);
    this.MaxMinPowerForm.get('KBUNL_gen_max_power').setValue(p.KBUNL_gen_max_power);
    this.MaxMinPowerForm.get('KBUNL_gen_max_time').setValue(p.KBUNL_gen_max_time);
    this.MaxMinPowerForm.get('KBUNL_gen_min_power').setValue(p.KBUNL_gen_min_power);
    this.MaxMinPowerForm.get('KBUNL_gen_min_time').setValue(p.KBUNL_gen_min_time);
    this.MaxMinPowerForm.get('sugar_max_power').setValue(p.sugar_max_power);
    this.MaxMinPowerForm.get('sugar_max_time').setValue(p.sugar_max_time);
    this.MaxMinPowerForm.get('sugar_min_power').setValue(p.sugar_min_power);
    this.MaxMinPowerForm.get('sugar_min_time').setValue(p.sugar_min_time);
    this.MaxMinPowerForm.get('solar_max_power').setValue(p.solar_max_power);
    this.MaxMinPowerForm.get('solar_max_time').setValue(p.solar_max_time);
    this.MaxMinPowerForm.get('solar_min_power').setValue(p.solar_min_power);
    this.MaxMinPowerForm.get('solar_min_time').setValue(p.solar_min_time);
    this.MaxMinPowerForm.get('net_power_max_power').setValue(p.net_power_max_power);
    this.MaxMinPowerForm.get('net_power_max_time').setValue(p.net_power_max_time);
    this.MaxMinPowerForm.get('net_power_min_power').setValue(p.net_power_min_power);
    this.MaxMinPowerForm.get('net_power_min_time').setValue(p.net_power_min_time);
    this.MaxMinPowerForm.get('demand_max_power').setValue(p.demand_max_power);
    this.MaxMinPowerForm.get('demand_max_time').setValue(p.demand_max_time);
    this.MaxMinPowerForm.get('demand_min_power').setValue(p.demand_min_power);
    this.MaxMinPowerForm.get('demand_min_time').setValue(p.demand_min_time);
    this.MaxMinPowerForm.get('nepal_max_power').setValue(p.nepal_max_power);
    this.MaxMinPowerForm.get('nepal_max_time').setValue(p.nepal_max_time);
    this.MaxMinPowerForm.get('nepal_min_power').setValue(p.nepal_min_power);
    this.MaxMinPowerForm.get('nepal_min_time').setValue(p.nepal_min_time);
  }
}
