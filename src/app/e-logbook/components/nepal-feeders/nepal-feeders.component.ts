import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-nepal-feeders',
  templateUrl: './nepal-feeders.component.html',
  styleUrls: ['./nepal-feeders.component.scss']
})
export class NepalFeedersComponent implements OnInit {
  isdelete = false;
  NepalFeedersForm: FormGroup;
  nepalFeedersData: any;
  buttonText = 'Edit Nepal Feeders';

  constructor(private fb: FormBuilder,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.nepalFeedersData = this.config.data.nepalFeedersData;
    this.isdelete = this.config.data.isdelete;
    this.NepalFeedersForm =
      this.fb.group({
        Id: '',
        LogbookId: '',
        kushaha_1_max_load: '',
        kushaha_1_time: '',
        kushaha_1_energy: '',
        kushaha_2_max_load: '',
        kushaha_2_time: '',
        kushaha_2_energy: '',
        raj_biraj_max_load: '',
        raj_biraj_time: '',
        raj_biraj_energy: '',
        surajpura_max_load: '',
        surajpura_time: '',
        surajpura_energy: '',
        jaleshwar_sitamarhi_max_load: '',
        jaleshwar_sitamarhi_time: '',
        jaleshwar_sitamarhi_energy: '',
        jaleshwar_sursand_max_load: '',
        jaleshwar_sursand_time: '',
        jaleshwar_sursand_energy: '',
        birganj_max_load: '',
        birganj_time: '',
        birganj_energy: '',
        parwanipur_max_load: '',
        parwanipur_time: '',
        parwanipur_energy: '',
        sirha_max_load: '',
        sirha_time: '',
        sirha_energy: '',
        nepal_energy: '',
      });
    if (this.nepalFeedersData !== null) {
        this.populateEditableData(this.nepalFeedersData);
      }
  }
  submitData() {
    if (this.NepalFeedersForm.dirty && this.NepalFeedersForm.valid) {
      const p = Object.assign({}, this.nepalFeedersData, this.NepalFeedersForm.value);
      p.nepal_energy =  p.kushaha_1_energy + p.kushaha_2_energy + p.raj_biraj_energy
      + p.surajpura_energy + p.jaleshwar_sitamarhi_energy + p.jaleshwar_sursand_energy
      + p.birganj_energy + p.parwanipur_energy + p.sirha_energy;
      this.ref.close(p);
    }
  }
  populateEditableData(p) {
    this.NepalFeedersForm.get('Id').setValue(p.Id);
    this.NepalFeedersForm.get('LogbookId').setValue(p.LogbookId);
    this.NepalFeedersForm.get('kushaha_1_max_load').setValue(p.kushaha_1_max_load);
    this.NepalFeedersForm.get('kushaha_1_time').setValue(p.kushaha_1_time);
    this.NepalFeedersForm.get('kushaha_1_energy').setValue(p.kushaha_1_energy);
    this.NepalFeedersForm.get('kushaha_2_max_load').setValue(p.kushaha_2_max_load);
    this.NepalFeedersForm.get('kushaha_2_time').setValue(p.kushaha_2_time);
    this.NepalFeedersForm.get('kushaha_2_energy').setValue(p.kushaha_2_energy);
    this.NepalFeedersForm.get('raj_biraj_max_load').setValue(p.raj_biraj_max_load);
    this.NepalFeedersForm.get('raj_biraj_time').setValue(p.raj_biraj_time);
    this.NepalFeedersForm.get('raj_biraj_energy').setValue(p.raj_biraj_energy);
    this.NepalFeedersForm.get('surajpura_max_load').setValue(p.surajpura_max_load);
    this.NepalFeedersForm.get('surajpura_time').setValue(p.surajpura_time);
    this.NepalFeedersForm.get('surajpura_energy').setValue(p.surajpura_energy);
    this.NepalFeedersForm.get('jaleshwar_sitamarhi_max_load').setValue(p.jaleshwar_sitamarhi_max_load);
    this.NepalFeedersForm.get('jaleshwar_sitamarhi_time').setValue(p.jaleshwar_sitamarhi_time);
    this.NepalFeedersForm.get('jaleshwar_sitamarhi_energy').setValue(p.jaleshwar_sitamarhi_energy);
    this.NepalFeedersForm.get('jaleshwar_sursand_max_load').setValue(p.jaleshwar_sursand_max_load);
    this.NepalFeedersForm.get('jaleshwar_sursand_time').setValue(p.jaleshwar_sursand_time);
    this.NepalFeedersForm.get('jaleshwar_sursand_energy').setValue(p.jaleshwar_sursand_energy);
    this.NepalFeedersForm.get('birganj_max_load').setValue(p.birganj_max_load);
    this.NepalFeedersForm.get('birganj_time').setValue(p.birganj_time);
    this.NepalFeedersForm.get('birganj_energy').setValue(p.birganj_energy);
    this.NepalFeedersForm.get('parwanipur_max_load').setValue(p.parwanipur_max_load);
    this.NepalFeedersForm.get('parwanipur_time').setValue(p.parwanipur_time);
    this.NepalFeedersForm.get('parwanipur_energy').setValue(p.parwanipur_energy);
    this.NepalFeedersForm.get('sirha_max_load').setValue(p.sirha_max_load);
    this.NepalFeedersForm.get('sirha_time').setValue(p.sirha_time);
    this.NepalFeedersForm.get('sirha_energy').setValue(p.sirha_energy);
    this.NepalFeedersForm.get('nepal_energy').setValue(p.nepal_energy);
  }

}
