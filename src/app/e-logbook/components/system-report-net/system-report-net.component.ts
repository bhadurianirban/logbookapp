import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-system-report-net',
  templateUrl: './system-report-net.component.html',
  styleUrls: ['./system-report-net.component.scss']
})
export class SystemReportNetComponent implements OnInit {
  isdelete = false;
  SystemReportNetForm: FormGroup;
  systemReportNetData: any;
  buttonText = 'Edit System Report Net';


  constructor(private fb: FormBuilder,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.systemReportNetData = this.config.data.systemReportNetData;
    this.isdelete = this.config.data.isdelete;
    this.SystemReportNetForm =
      this.fb.group({
        Id: '',
        LogbookId: '',
        central_sector_bilateral_energy: '',
        NR_CS_power_exchange: '',
        total_demand_met_energy: '',
        total_demand_met_NBPDCL_energy: '',
        total_demand_met_SBPDCL: '',
        ERLDC_Schedule_energy: '',
        energy_ui_energy: '',
        average_frequency: '',
      });
    if (this.systemReportNetData !== null) {
        this.populateEditableData(this.systemReportNetData);
      }
  }
  submitData() {
    if (this.SystemReportNetForm.dirty && this.SystemReportNetForm.valid) {
      const p = Object.assign({}, this.systemReportNetData, this.SystemReportNetForm.value);
      this.ref.close(p);
    }
  }
  populateEditableData(p) {
    this.SystemReportNetForm.get('Id').setValue(p.Id);
    this.SystemReportNetForm.get('LogbookId').setValue(p.LogbookId);
    this.SystemReportNetForm.get('central_sector_bilateral_energy').setValue(p.central_sector_bilateral_energy);
    this.SystemReportNetForm.get('NR_CS_power_exchange').setValue(p.NR_CS_power_exchange);
    this.SystemReportNetForm.get('n').setValue(p.n);
    this.SystemReportNetForm.get('total_demand_met_energy').setValue(p.total_demand_met_energy);
    this.SystemReportNetForm.get('total_demand_met_NBPDCL_energy').setValue(p.total_demand_met_NBPDCL_energy);
    this.SystemReportNetForm.get('total_demand_met_SBPDCL').setValue(p.total_demand_met_SBPDCL);
    this.SystemReportNetForm.get('ERLDC_Schedule_energy').setValue(p.ERLDC_Schedule_energy);
    this.SystemReportNetForm.get('energy_ui_energy').setValue(p.energy_ui_energy);
    this.SystemReportNetForm.get('average_frequency').setValue(p.average_frequency);
  }

}
