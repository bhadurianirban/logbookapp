import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-sbpdcl-tie-lines-exchange',
  templateUrl: './sbpdcl-tie-lines-exchange.component.html',
  styleUrls: ['./sbpdcl-tie-lines-exchange.component.scss']
})
export class SBPDCLTieLinesExchangeComponent implements OnInit {
  isdelete = false;
  SBPDCLForm: FormGroup;
  SBPDCLTieLinesExchangeData: any;
  buttonText = 'Edit SBPDCL Tie Lines Exchange';
  constructor(private fb: FormBuilder,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.SBPDCLTieLinesExchangeData = this.config.data.SBPDCLTieLinesExchangeData;
    this.isdelete = this.config.data.isdelete;
    this.SBPDCLForm =
      this.fb.group({
        Id: '',
        LogbookId: '',
        bihar_sharif_import: '',
        bihar_sharif_export: '',
        bihar_sharif_exchange: '',
        patna_sipara_import: '',
        patna_sipara_export: '',
        patna_sipara_exchange: '',
        patna_fatuha_import: '',
        patna_fatuha_export: '',
        patna_fatuha_exchange: '',
        patna_khagaul_import: '',
        patna_khagaul_export: '',
        patna_khagual_exchange: '',
        pusauli_nadokhar_import: '',
        pusauli_nadokhar_export: '',
        pusauli_nadokhar_exchange: '',
        pusauli_dehri_import: '',
        pusauli_dehri_export: '',
        pusauli_dehri_exchange: '',
        gaya_dehri_import: '',
        gaya_dehri_export: '',
        gaya_dehri_exchange: '',
        gaya_bodhgaya_import: '',
        gaya_bodhgaya_export: '',
        gaya_bodhgaya_exchange: '',
        gaya_khizasarai_import: '',
        gaya_khizasarai_export: '',
        gaya_khizasarai_exchange: '',
        gaya_sonenagar_import: '',
        gaya_sonenagar_export: '',
        gaya_sonenagar_exchange: '',
        banka_banka_import: '',
        banka_banka_export: '',
        banka_banka_exchange: '',
        banka_sabour_import: '',
        banka_sabour_export: '',
        banka_sabour_exchange: '',
        banka_sultanganj_import: '',
        banka_sultanganj_export: '',
        banka_sultanganj_exchange: '',
        kahalgaon_sabour_import: '',
        kahalgaon_sabour_export: '',
        kahalgaon_sabour_exchange: '',
        kahalgaon_kahalgaon_import: '',
        kahalgaon_kahalgaon_export: '',
        kahalgaon_kahalgaon_exchange: '',
        lakhisarai_lakhisarai_import: '',
        lakhisarai_lakhisarai_export: '',
        lakhisarai_lakhisarai_exchange: '',
        lakhisarai_jamui_import: '',
        lakhisarai_jamui_export: '',
        lakhisarai_jamui_exchange: '',
        tenughat_bihar_sharif_import: '',
        tenughat_bihar_sharif_export: '',
        tenughat_bihar_sharif_exchange: '',
        japla_sonenagar_import: '',
        japla_sonenagar_export: '',
        japla_sonenagar_exchange: '',
        lalmatia_kahalgaon_import: '',
        lalmatia_kahalgaon_export: '',
        lalmatia_kahalgaon_exchange: '',
        sultanganj_deoghar_import: '',
        sultanganj_deoghar_export: '',
        sultanganj_deoghar_exchange: '',
        barhi_rajgir_import: '',
        barhi_rajgir_export: '',
        barhi_rajgir_exchange: '',
        barhi_nalanda_import: '',
        barhi_nalanda_export: '',
        barhi_nalanda_exchange: '',
        bihar_sharif_begusarai_import: '',
        bihar_sharif_begusarai_export: '',
        bihar_sharif_begusarai_exchange: '',
        rehand_sone_nagar_import: '',
        rehand_sone_nagar_export: '',
        rehand_sone_nagar_exchange: '',
        chandauli_karmnasa_import: '',
        chandauli_karmnasa_export: '',
        chandauli_karmnasa_exchange: '',
        net_power_drawal_cs_import: '',
        net_power_drawal_cs_export: '',
        net_power_drawal_cs_exchange: '',
        net_schedule_import: '',
        net_schedule_export: '',
        net_schedule_exchange: '',
        net_power_drawal_bihal_import: '',
        net_power_drawal_bihar_export: '',
        net_power_drawal_bihar_exchange: '',
        schedule_import: '',
        schedule_export: '',
        schedule_exchange: '',
        demand_met_import: '',
        demand_met_export: '',
        demand_met_exchange: '',
      });
    if (this.SBPDCLTieLinesExchangeData !== null) {
        this.populateEditableData(this.SBPDCLTieLinesExchangeData);
      }
  }
  submitData() {
    if (this.SBPDCLForm.dirty && this.SBPDCLForm.valid) {
      const p = Object.assign({}, this.SBPDCLTieLinesExchangeData, this.SBPDCLForm.value);
      this.ref.close(p);
    }
}
populateEditableData(p) {
  this.SBPDCLForm.get('Id').setValue(p.Id);
  this.SBPDCLForm.get('LogbookId').setValue(p.LogbookId);
  this.SBPDCLForm.get('bihar_sharif_import').setValue(p.bihar_sharif_import);
  this.SBPDCLForm.get('bihar_sharif_export').setValue(p.bihar_sharif_export);
  this.SBPDCLForm.get('bihar_sharif_exchange').setValue(p.bihar_sharif_exchange);
  this.SBPDCLForm.get('patna_sipara_import').setValue(p.patna_sipara_import);
  this.SBPDCLForm.get('patna_sipara_export').setValue(p.patna_sipara_export);
  this.SBPDCLForm.get('patna_sipara_exchange').setValue(p.patna_sipara_exchange);
  this.SBPDCLForm.get('patna_fatuha_import').setValue(p.patna_fatuha_import);
  this.SBPDCLForm.get('patna_fatuha_export').setValue(p.patna_fatuha_export);
  this.SBPDCLForm.get('patna_fatuha_exchange').setValue(p.patna_fatuha_exchange);
  this.SBPDCLForm.get('patna_khagaul_import').setValue(p.patna_khagaul_import);
  this.SBPDCLForm.get('patna_khagaul_export').setValue(p.patna_khagaul_export);
  this.SBPDCLForm.get('patna_khagual_exchange').setValue(p.patna_khagual_exchange);
  this.SBPDCLForm.get('pusauli_nadokhar_import').setValue(p.pusauli_nadokhar_import);
  this.SBPDCLForm.get('pusauli_nadokhar_export').setValue(p.pusauli_nadokhar_export);
  this.SBPDCLForm.get('pusauli_nadokhar_exchange').setValue(p.pusauli_nadokhar_exchange);
  this.SBPDCLForm.get('pusauli_dehri_import').setValue(p.pusauli_dehri_import);
  this.SBPDCLForm.get('pusauli_dehri_export').setValue(p.pusauli_dehri_export);
  this.SBPDCLForm.get('pusauli_dehri_exchange').setValue(p.pusauli_dehri_exchange);
  this.SBPDCLForm.get('gaya_dehri_import').setValue(p.gaya_dehri_import);
  this.SBPDCLForm.get('gaya_dehri_export').setValue(p.gaya_dehri_export);
  this.SBPDCLForm.get('gaya_dehri_exchange').setValue(p.gaya_dehri_exchange);
  this.SBPDCLForm.get('gaya_bodhgaya_import').setValue(p.gaya_bodhgaya_import);
  this.SBPDCLForm.get('gaya_bodhgaya_export').setValue(p.gaya_bodhgaya_export);
  this.SBPDCLForm.get('gaya_bodhgaya_exchange').setValue(p.gaya_bodhgaya_exchange);
  this.SBPDCLForm.get('gaya_khizasarai_import').setValue(p.gaya_khizasarai_import);
  this.SBPDCLForm.get('gaya_khizasarai_export').setValue(p.gaya_khizasarai_export);
  this.SBPDCLForm.get('gaya_khizasarai_exchange').setValue(p.gaya_khizasarai_exchange);
  this.SBPDCLForm.get('gaya_sonenagar_import').setValue(p.gaya_sonenagar_import);
  this.SBPDCLForm.get('gaya_sonenagar_export').setValue(p.gaya_sonenagar_export);
  this.SBPDCLForm.get('gaya_sonenagar_exchange').setValue(p.gaya_sonenagar_exchange);
  this.SBPDCLForm.get('banka_banka_import').setValue(p.banka_banka_import);
  this.SBPDCLForm.get('banka_banka_export').setValue(p.banka_banka_export);
  this.SBPDCLForm.get('banka_banka_exchange').setValue(p.banka_banka_exchange);
  this.SBPDCLForm.get('banka_sabour_import').setValue(p.banka_sabour_import);
  this.SBPDCLForm.get('banka_sabour_export').setValue(p.banka_sabour_export);
  this.SBPDCLForm.get('banka_sabour_exchange').setValue(p.banka_sabour_exchange);
  this.SBPDCLForm.get('banka_sultanganj_import').setValue(p.banka_sultanganj_import);
  this.SBPDCLForm.get('banka_sultanganj_export').setValue(p.banka_sultanganj_export);
  this.SBPDCLForm.get('banka_sultanganj_exchange').setValue(p.banka_sultanganj_exchange);
  this.SBPDCLForm.get('kahalgaon_sabour_import').setValue(p.kahalgaon_sabour_import);
  this.SBPDCLForm.get('kahalgaon_sabour_export').setValue(p.kahalgaon_sabour_export);
  this.SBPDCLForm.get('kahalgaon_sabour_exchange').setValue(p.kahalgaon_sabour_exchange);
  this.SBPDCLForm.get('kahalgaon_kahalgaon_import').setValue(p.kahalgaon_kahalgaon_import);
  this.SBPDCLForm.get('kahalgaon_kahalgaon_export').setValue(p.kahalgaon_kahalgaon_export);
  this.SBPDCLForm.get('kahalgaon_kahalgaon_exchange').setValue(p.kahalgaon_kahalgaon_exchange);
  this.SBPDCLForm.get('lakhisarai_lakhisarai_import').setValue(p.lakhisarai_lakhisarai_import);
  this.SBPDCLForm.get('lakhisarai_lakhisarai_export').setValue(p.lakhisarai_lakhisarai_export);
  this.SBPDCLForm.get('lakhisarai_lakhisarai_exchange').setValue(p.lakhisarai_lakhisarai_exchange);
  this.SBPDCLForm.get('lakhisarai_jamui_import').setValue(p.lakhisarai_jamui_import);
  this.SBPDCLForm.get('lakhisarai_jamui_export').setValue(p.lakhisarai_jamui_export);
  this.SBPDCLForm.get('lakhisarai_jamui_exchange').setValue(p.lakhisarai_jamui_exchange);
  this.SBPDCLForm.get('tenughat_bihar_sharif_import').setValue(p.tenughat_bihar_sharif_import);
  this.SBPDCLForm.get('tenughat_bihar_sharif_export').setValue(p.tenughat_bihar_sharif_export);
  this.SBPDCLForm.get('tenughat_bihar_sharif_exchange').setValue(p.tenughat_bihar_sharif_exchange);
  this.SBPDCLForm.get('japla_sonenagar_import').setValue(p.japla_sonenagar_import);
  this.SBPDCLForm.get('japla_sonenagar_export').setValue(p.japla_sonenagar_export);
  this.SBPDCLForm.get('japla_sonenagar_exchange').setValue(p.japla_sonenagar_exchange);
  this.SBPDCLForm.get('lalmatia_kahalgaon_import').setValue(p.lalmatia_kahalgaon_import);
  this.SBPDCLForm.get('lalmatia_kahalgaon_export').setValue(p.lalmatia_kahalgaon_export);
  this.SBPDCLForm.get('lalmatia_kahalgaon_exchange').setValue(p.lalmatia_kahalgaon_exchange);
  this.SBPDCLForm.get('sultanganj_deoghar_import').setValue(p.sultanganj_deoghar_import);
  this.SBPDCLForm.get('sultanganj_deoghar_export').setValue(p.sultanganj_deoghar_export);
  this.SBPDCLForm.get('sultanganj_deoghar_exchange').setValue(p.sultanganj_deoghar_exchange);
  this.SBPDCLForm.get('barhi_rajgir_import').setValue(p.barhi_rajgir_import);
  this.SBPDCLForm.get('barhi_rajgir_export').setValue(p.barhi_rajgir_export);
  this.SBPDCLForm.get('barhi_rajgir_exchange').setValue(p.barhi_rajgir_exchange);
  this.SBPDCLForm.get('barhi_nalanda_import').setValue(p.barhi_nalanda_import);
  this.SBPDCLForm.get('barhi_nalanda_export').setValue(p.barhi_nalanda_export);
  this.SBPDCLForm.get('barhi_nalanda_exchange').setValue(p.barhi_nalanda_exchange);
  this.SBPDCLForm.get('bihar_sharif_begusarai_import').setValue(p.bihar_sharif_begusarai_import);
  this.SBPDCLForm.get('bihar_sharif_begusarai_export').setValue(p.bihar_sharif_begusarai_export);
  this.SBPDCLForm.get('bihar_sharif_begusarai_exchange').setValue(p.bihar_sharif_begusarai_exchange);
  this.SBPDCLForm.get('rehand_sone_nagar_import').setValue(p.rehand_sone_nagar_import);
  this.SBPDCLForm.get('rehand_sone_nagar_export').setValue(p.rehand_sone_nagar_export);
  this.SBPDCLForm.get('rehand_sone_nagar_exchange').setValue(p.rehand_sone_nagar_exchange);
  this.SBPDCLForm.get('chandauli_karmnasa_import').setValue(p.chandauli_karmnasa_import);
  this.SBPDCLForm.get('chandauli_karmnasa_export').setValue(p.chandauli_karmnasa_export);
  this.SBPDCLForm.get('chandauli_karmnasa_exchange').setValue(p.chandauli_karmnasa_exchange);
  this.SBPDCLForm.get('net_power_drawal_cs_import').setValue(p.net_power_drawal_cs_import);
  this.SBPDCLForm.get('net_power_drawal_cs_export').setValue(p.net_power_drawal_cs_export);
  this.SBPDCLForm.get('net_power_drawal_cs_exchange').setValue(p.net_power_drawal_cs_exchange);
  this.SBPDCLForm.get('net_schedule_import').setValue(p.net_schedule_import);
  this.SBPDCLForm.get('net_schedule_export').setValue(p.net_schedule_export);
  this.SBPDCLForm.get('net_schedule_exchange').setValue(p.net_schedule_exchange);
  this.SBPDCLForm.get('net_power_drawal_bihal_import').setValue(p.net_power_drawal_bihal_import);
  this.SBPDCLForm.get('net_power_drawal_bihar_export').setValue(p.net_power_drawal_bihar_export);
  this.SBPDCLForm.get('net_power_drawal_bihar_exchange').setValue(p.net_power_drawal_bihar_exchange);
  this.SBPDCLForm.get('schedule_import').setValue(p.schedule_import);
  this.SBPDCLForm.get('schedule_export').setValue(p.schedule_export);
  this.SBPDCLForm.get('schedule_exchange').setValue(p.schedule_exchange);
  this.SBPDCLForm.get('demand_met_import').setValue(p.demand_met_import);
  this.SBPDCLForm.get('demand_met_export').setValue(p.demand_met_export);
  this.SBPDCLForm.get('demand_met_exchange').setValue(p.demand_met_exchange);
}
}
