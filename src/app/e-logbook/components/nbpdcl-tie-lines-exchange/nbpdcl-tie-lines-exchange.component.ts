import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-nbpdcl-tie-lines-exchange',
  templateUrl: './nbpdcl-tie-lines-exchange.component.html',
  styleUrls: ['./nbpdcl-tie-lines-exchange.component.scss']
})
export class NBPDCLTieLinesExchangeComponent implements OnInit {
  isdelete = false;
  NBPDCLForm: FormGroup;
  NBPDCLTieLinesExchangeData: any;
  buttonText = 'Edit NBPDCL Tie Lines Exchange';

  constructor(private fb: FormBuilder,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.NBPDCLTieLinesExchangeData = this.config.data.NBPDCLTieLinesExchangeData;
    this.isdelete = this.config.data.isdelete;
    this.NBPDCLForm =
      this.fb.group({
        Id: '',
        LogbookId: '',
        muzaffarpur_KBUNL_import: '',
        muzaffarpur_KBUNL_export: '',
        muzaffarpur_KBUNL_exchange: '',
        KBUNL_ISGS_import: '',
        KBUNL_ISGS_export: '',
        KBUNL_ISGS_exchange: '',
        muzaffarpur_hazipur_import: '',
        muzaffarpur_hazipur_export: '',
        muzaffarpur_hazipur_exchange: '',
        purnia_madhepura_import: '',
        purnia_madhepura_export: '',
        purnia_madhepura_exchange: '',
        purnea_purnea_import: '',
        purnea_purnea_export: '',
        purnea_purnea_exchange: '',
        purnia_kisanganj_import: '',
        purnia_kisanganj_export: '',
        purnia_kisanganj_exchange: '',
        purnea_begusarai_import: '',
        purnea_begusarai_export: '',
        purnea_begusarai_exchange: '',
        kishanganj_kishanganj_import: '',
        kishanganj_kishanganj_export: '',
        kishanganj_kishanganj_exchange: '',
        dalkola_baisi_import: '',
        dalkola_baisi_export: '',
        dalkola_baisi_exchange: '',
        darbhanga_samastipur_import: '',
        darbhanga_samastipur_export: '',
        darbhanga_samastipur_exchange: '',
        darbhanga_motipur_import: '',
        darbhanga_motipur_export: '',
        darbhanga_motipur_exchange: '',
        darbhanga_laukahi_import: '',
        darbhanga_laukahi_export: '',
        darbhanga_laukahi_exchange: '',
        darbhanga_darbhanga_import: '',
        darbhanga_darbhanga_export: '',
        darbhanga_darbhanga_exchange: '',
        motihari_motihari_import: '',
        motihari_motihari_export: '',
        motihari_motihari_exchange: '',
        motihari_bettiah_import: '',
        motihari_bettiah_export: '',
        motihari_bettiah_exchange: '',
        motihari_raxaul_import: '',
        motihari_raxaul_export: '',
        motihari_raxaul_exchange: '',
        bihar_sharif_begusarai_import: '',
        bihar_sharif_begusarai_export: '',
        bihar_sharif_begusarai_exchange: '',
        net_power_import: '',
        net_power_export: '',
        net_power_exchange: '',
        drawal_import: '',
        drawal_export: '',
        drawal_exchange: '',
      });
    if (this.NBPDCLTieLinesExchangeData !== null) {
        this.populateEditableData(this.NBPDCLTieLinesExchangeData);
      }
  }
  submitData() {
    if (this.NBPDCLForm.dirty && this.NBPDCLForm.valid) {
      const p = Object.assign({}, this.NBPDCLTieLinesExchangeData, this.NBPDCLForm.value);
      this.ref.close(p);
    }
}
populateEditableData(p) {
  this.NBPDCLForm.get('Id').setValue(p.Id);
  this.NBPDCLForm.get('LogbookId').setValue(p.LogbookId);
  this.NBPDCLForm.get('muzaffarpur_KBUNL_import').setValue(p.muzaffarpur_KBUNL_import);
  this.NBPDCLForm.get('muzaffarpur_KBUNL_export').setValue(p.muzaffarpur_KBUNL_export);
  this.NBPDCLForm.get('muzaffarpur_KBUNL_exchange').setValue(p.muzaffarpur_KBUNL_exchange);
  this.NBPDCLForm.get('KBUNL_ISGS_import').setValue(p.KBUNL_ISGS_import);
  this.NBPDCLForm.get('KBUNL_ISGS_export').setValue(p.KBUNL_ISGS_export);
  this.NBPDCLForm.get('KBUNL_ISGS_exchange').setValue(p.KBUNL_ISGS_exchange);
  this.NBPDCLForm.get('muzaffarpur_hazipur_import').setValue(p.muzaffarpur_hazipur_import);
  this.NBPDCLForm.get('muzaffarpur_hazipur_export').setValue(p.muzaffarpur_hazipur_export);
  this.NBPDCLForm.get('muzaffarpur_hazipur_exchange').setValue(p.muzaffarpur_hazipur_exchange);
  this.NBPDCLForm.get('purnia_madhepura_import').setValue(p.purnia_madhepura_import);
  this.NBPDCLForm.get('purnia_madhepura_export').setValue(p.purnia_madhepura_export);
  this.NBPDCLForm.get('purnia_madhepura_exchange').setValue(p.purnia_madhepura_exchange);
  this.NBPDCLForm.get('purnea_purnea_import').setValue(p.purnea_purnea_import);
  this.NBPDCLForm.get('purnea_purnea_export').setValue(p.purnea_purnea_export);
  this.NBPDCLForm.get('purnea_purnea_exchange').setValue(p.purnea_purnea_exchange);
  this.NBPDCLForm.get('purnia_kisanganj_import').setValue(p.purnia_kisanganj_import);
  this.NBPDCLForm.get('purnia_kisanganj_export').setValue(p.purnia_kisanganj_export);
  this.NBPDCLForm.get('purnia_kisanganj_exchange').setValue(p.purnia_kisanganj_exchange);
  this.NBPDCLForm.get('purnea_begusarai_import').setValue(p.purnea_begusarai_import);
  this.NBPDCLForm.get('purnea_begusarai_export').setValue(p.purnea_begusarai_export);
  this.NBPDCLForm.get('purnea_begusarai_exchange').setValue(p.purnea_begusarai_exchange);
  this.NBPDCLForm.get('kishanganj_kishanganj_import').setValue(p.kishanganj_kishanganj_import);
  this.NBPDCLForm.get('kishanganj_kishanganj_export').setValue(p.kishanganj_kishanganj_export);
  this.NBPDCLForm.get('kishanganj_kishanganj_exchange').setValue(p.kishanganj_kishanganj_exchange);
  this.NBPDCLForm.get('dalkola_baisi_import').setValue(p.dalkola_baisi_import);
  this.NBPDCLForm.get('dalkola_baisi_export').setValue(p.dalkola_baisi_export);
  this.NBPDCLForm.get('dalkola_baisi_exchange').setValue(p.dalkola_baisi_exchange);
  this.NBPDCLForm.get('darbhanga_samastipur_import').setValue(p.darbhanga_samastipur_import);
  this.NBPDCLForm.get('darbhanga_samastipur_export').setValue(p.darbhanga_samastipur_export);
  this.NBPDCLForm.get('darbhanga_samastipur_exchange').setValue(p.darbhanga_samastipur_exchange);
  this.NBPDCLForm.get('darbhanga_motipur_import').setValue(p.darbhanga_motipur_import);
  this.NBPDCLForm.get('darbhanga_motipur_export').setValue(p.darbhanga_motipur_export);
  this.NBPDCLForm.get('darbhanga_motipur_exchange').setValue(p.darbhanga_motipur_exchange);
  this.NBPDCLForm.get('darbhanga_laukahi_import').setValue(p.darbhanga_laukahi_import);
  this.NBPDCLForm.get('darbhanga_laukahi_export').setValue(p.darbhanga_laukahi_export);
  this.NBPDCLForm.get('darbhanga_laukahi_exchange').setValue(p.darbhanga_laukahi_exchange);
  this.NBPDCLForm.get('darbhanga_darbhanga_import').setValue(p.darbhanga_darbhanga_import);
  this.NBPDCLForm.get('darbhanga_darbhanga_export').setValue(p.darbhanga_darbhanga_export);
  this.NBPDCLForm.get('darbhanga_darbhanga_exchange').setValue(p.darbhanga_darbhanga_exchange);
  this.NBPDCLForm.get('motihari_motihari_import').setValue(p.motihari_motihari_import);
  this.NBPDCLForm.get('motihari_motihari_export').setValue(p.motihari_motihari_export);
  this.NBPDCLForm.get('motihari_motihari_exchange').setValue(p.motihari_motihari_exchange);
  this.NBPDCLForm.get('motihari_bettiah_import').setValue(p.motihari_bettiah_import);
  this.NBPDCLForm.get('motihari_bettiah_export').setValue(p.motihari_bettiah_export);
  this.NBPDCLForm.get('motihari_bettiah_exchange').setValue(p.motihari_bettiah_exchange);
  this.NBPDCLForm.get('motihari_raxaul_import').setValue(p.motihari_raxaul_import);
  this.NBPDCLForm.get('motihari_raxaul_export').setValue(p.motihari_raxaul_export);
  this.NBPDCLForm.get('motihari_raxaul_exchange').setValue(p.motihari_raxaul_exchange);
  this.NBPDCLForm.get('bihar_sharif_begusarai_import').setValue(p.bihar_sharif_begusarai_import);
  this.NBPDCLForm.get('bihar_sharif_begusarai_export').setValue(p.bihar_sharif_begusarai_export);
  this.NBPDCLForm.get('bihar_sharif_begusarai_exchange').setValue(p.bihar_sharif_begusarai_exchange);
  this.NBPDCLForm.get('net_power_import').setValue(p.net_power_import);
  this.NBPDCLForm.get('net_power_export').setValue(p.net_power_export);
  this.NBPDCLForm.get('net_power_exchange').setValue(p.net_power_exchange);
  this.NBPDCLForm.get('drawal_import').setValue(p.drawal_import);
  this.NBPDCLForm.get('drawal_export').setValue(p.drawal_export);
  this.NBPDCLForm.get('drawal_exchange').setValue(p.drawal_exchange);
}
}
