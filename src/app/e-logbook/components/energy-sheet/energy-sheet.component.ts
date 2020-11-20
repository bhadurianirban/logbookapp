import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Logbook } from 'src/app/shared/models/logbook.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApplicationState } from 'src/app/store/state';
import { MessageService, ConfirmationService, DialogService, } from 'primeng/api';
import { Store, select } from '@ngrx/store';
import { AddConstituentsGenerationAction, AddNepalFeedersAction, AddSugarMillsGenerationAction,
         AddSolarPowerPlantsAction, AddSystemReportAction, AddNBPDCLTieLinesExchangeAction,
         UpdateConstituentsGenerationAction, AddSBPDCLTieLinesExchangeAction, AddMaxMinPowerAction,
         AddSystemReportNetAction, UpdateNepalFeedersAction, UpdateSugarMillsGenerationAction,
         UpdateSolarPowerPlantsAction, UpdateMaxMinPowerAction, UpdateNBPDCLTieLinesExchangeAction,
         UpdateSBPDCLTieLinesExchangeAction, UpdateSystemReportAction,
         UpdateSystemReportNetAction, GetConstituentsGenerationAction, GetMaxMinPowerAction,
         GetSugarMillsGenerationAction, GetSolarPowerPlantsAction, GetSystemReportAction,
         GetSystemReportNetAction, GetNBPDCLTieLinesExchangeAction, GetSBPDCLTieLinesExchangeAction,
         GetNepalFeedersAction, GetKhagaulAction, AddKhagaulAction, UpdateKhagaulAction,
         GetMiscAction, AddMiscAction  } from 'src/app/store/actions';
import { takeWhile } from 'rxjs/operators';
import * as fromRoot from 'src/app/store/selectors';
import { LogbookConstituentsGeneration } from '../../models/ConstituentsGeneration.model';
import { IConstituentGenerationData, INepalFeedersData, ISugarMillsGenerationData,
         ISolarPowerGenerationData, IMaxMinPowerData, ISystemReportData, ISystemReportNetData,
         INBPDCLTieLinesExchangeData, ISBPDCLTieLinesExchangeData, IKhagaulData } from './energy-sheet';
import { ConstituentGenerationComponent } from '../constituent-generation/constituent-generation.component';
import { LogbookNepalFeeder } from '../../models/NepalFeeder.model';
import { LogbookSugarMills } from '../../models/SugarMills.model';
import { LogbookMaxMinPowerDetails } from '../../models/MaxMinPowerDetails.model';
import { LogbookSolarPower } from '../../models/SolarPower.model';
import { LogbookSystemReport } from '../../models/SystemReport.model';
import { LogbookSystemReportNet } from '../../models/SystemReportNet.model';
import { LogbookNBPDCLTieLineExchange } from '../../models/NBPDCLTieLineExchange.model';
import { LogbookSBPDCLTieLineExchange } from '../../models/SBPDCLTieLineExchange.model';
import { NepalFeedersComponent } from '../nepal-feeders/nepal-feeders.component';
import { SugarMillsGenerationComponent } from '../sugar-mills-generation/sugar-mills-generation.component';
import { SolarPowerGenerationComponent } from '../solar-power-generation/solar-power-generation.component';
import { MaxMinPowerComponent } from '../max-min-power/max-min-power.component';
import { NBPDCLTieLinesExchangeComponent } from '../nbpdcl-tie-lines-exchange/nbpdcl-tie-lines-exchange.component';

import {TabViewModule} from 'primeng/tabview';
import { SBPDCLTieLinesExchangeComponent } from '../sbpdcl-tie-lines-exchange/sbpdcl-tie-lines-exchange.component';
import { SystemReportComponent } from '../system-report/system-report.component';
import { SystemReportNetComponent } from '../system-report-net/system-report-net.component';
import { LogbookKhagaul } from '../../models/Khagaul.model';
import { KhagaulComponent } from '../khagaul/khagaul.component';
import { LogbookMisc } from '../../models/Misc.model';

@Component({
  selector: 'app-energy-sheet',
  templateUrl: './energy-sheet.component.html',
  styleUrls: ['./energy-sheet.component.scss']
})
  export class EnergySheetComponent implements OnInit, OnDestroy {
  @Input()
  currLogbookData: Logbook;
  @Input()
  set logbookData(data: Logbook) {
    this.currLogbookData = data;
  }
  destroying = false;
  ConstituentsGenerationForm: FormGroup;
  NepalFeedersForm: FormGroup;
  SugarMillsGenerationForm: FormGroup;
  SolarPowerGenerationForm: FormGroup;
  SystemReportForm: FormGroup;
  MaxMinPowerForm: FormGroup;
  NBPDCLForm: FormGroup;
  SBPDCLForm: FormGroup;
  SystemReportNetForm: FormGroup;
  KhagaulForm: FormGroup;
  MiscellaneousForm: FormGroup;
  constituentGeneration: LogbookConstituentsGeneration;
  nepalFeeders: LogbookNepalFeeder;
  sugarMillsGeneration: LogbookSugarMills;
  solarPowerGeneration: LogbookSolarPower;
  misc: LogbookMisc;
  maxMinPower: LogbookMaxMinPowerDetails;
  systemReport: LogbookSystemReport;
  systemReportNet: LogbookSystemReportNet;
  NBPDCLTieLinesExchange: LogbookNBPDCLTieLineExchange;
  SBPDCLTieLinesExchange: LogbookSBPDCLTieLineExchange;
  khagaul: LogbookKhagaul;
  dialogConstituentGenerationData: IConstituentGenerationData = { constituentGenerationData: null, isdelete: false };
  dialogNepalFeedersData: INepalFeedersData = { nepalFeedersData: null, isdelete: false };
  dialogSugarMillsGenerationData: ISugarMillsGenerationData = { sugarMillsGenerationData: null, isdelete: false };
  dialogSolarPowerGenerationData: ISolarPowerGenerationData = { solarPowerGenerationData: null, isdelete: false };
  dialogMaxMinPowerData: IMaxMinPowerData = { maxMinPowerData: null, isdelete: false };
  dialogSystemReportData: ISystemReportData = { systemReportData: null, isdelete: false };
  dialogSystemReportNetData: ISystemReportNetData = { systemReportNetData: null, isdelete: false };
  dialogNBPDCLTieLinesExchangeData: INBPDCLTieLinesExchangeData = { NBPDCLTieLinesExchangeData: null, isdelete: false };
  dialogSBPDCLTieLinesExchangeData: ISBPDCLTieLinesExchangeData = { SBPDCLTieLinesExchangeData: null, isdelete: false };
  dialogKhagaulData: IKhagaulData = { khagaulData: null, isdelete: false };
  constructor(private formBuilder: FormBuilder,
              private store: Store<ApplicationState>,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private dialogService: DialogService) {
                this.bindConstituentGenerationData();
                this.bindNepalFeedersData();
                this.bindSolarPowerGenerationData();
                this.bindSugarMillsGenerationData();
                this.bindMaxMinPowerData();
                this.bindSystemReportData();
                this.bindNBPDCLTieLinesExchangeData();
                this.bindSBPDCLTieLinesExchangeData();
                this.bindSystemReportNetData();
                this.bindKhagaulData();
                this.bindMisc();
              }

  ngOnInit() {
    const data = this.currLogbookData.RequestId;
    this.store.dispatch(new GetConstituentsGenerationAction(data));
    this.store.dispatch(new GetNepalFeedersAction(data));
    this.store.dispatch(new GetSugarMillsGenerationAction(data));
    this.store.dispatch(new GetSolarPowerPlantsAction(data));
    this.store.dispatch(new GetMaxMinPowerAction(data));
    this.store.dispatch(new GetSystemReportAction(data));
    this.store.dispatch(new GetSystemReportNetAction(data));
    this.store.dispatch(new GetNBPDCLTieLinesExchangeAction(data));
    this.store.dispatch(new GetSBPDCLTieLinesExchangeAction(data));
    this.store.dispatch(new GetKhagaulAction(data));
    this.store.dispatch(new GetMiscAction(data));
    this.store.pipe(select(fromRoot.selectConstituentsGenerationData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data) {
        this.constituentGeneration = data;
        this.bindConstituentGenerationData();
      }
    });
    this.store.pipe(select(fromRoot.selectNepalFeedersData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data) {
        this.nepalFeeders = data;
        this.bindNepalFeedersData();
        this.calculateNepalFeeders();
      }
    });
    this.store.pipe(select(fromRoot.selectSolarPowerPlantsData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data) {
        this.solarPowerGeneration = data;
        this.bindSolarPowerGenerationData();
        this.calculateSolarPower();
      }
    });
    this.store.pipe(select(fromRoot.selectSugarMillsGenerationData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data) {
        this.sugarMillsGeneration = data;
        this.bindSugarMillsGenerationData();
        this.calculateSugarMills();
      }
    });
    this.store.pipe(select(fromRoot.selectMaxMinPowerData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data) {
        this.maxMinPower = data;
        this.bindMaxMinPowerData();
      }
    });
    this.store.pipe(select(fromRoot.selectSystemReportData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data) {
        this.systemReport = data;
        this.bindSystemReportData();
        this.calculateSystemReport();
      }
    });
    this.store.pipe(select(fromRoot.selectNBPDCLTieLinesExchangeData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data) {
        this.NBPDCLTieLinesExchange = data;
        this.bindNBPDCLTieLinesExchangeData();
        this.calculateNBPDCLTieLinesExchange();
      }
    });
    this.store.pipe(select(fromRoot.selectSBPDCLTieLinesExchangeData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data) {
        this.SBPDCLTieLinesExchange = data;
        this.bindSBPDCLTieLinesExchangeData();
        this.calculateSBPDCLTieLinesExchange();
      }
    });
    this.store.pipe(select(fromRoot.selectKhagaulData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data) {
        this.khagaul = data;
        this.bindKhagaulData();
        this.calculateKhagaul();
      }
    });
    this.store.pipe(select(fromRoot.selectSystemReportNetData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data) {
        this.systemReportNet = data;
        this.bindSystemReportNetData();
        this.calculateSystemReportNet();
      }
    });
    this.store.pipe(select(fromRoot.selectMiscData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data) {
        this.misc = data;
        this.bindMisc();
        this.calculateMisc();
      }
    });
    // this.onChanges();
  }
  bindConstituentGenerationData() {
    this.ConstituentsGenerationForm = this.formBuilder.group({
      farakka_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.farakka_load : null,
        disabled: false
      }, ],
      talchar_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.talchar_load : null,
        disabled: false
      }, ],
      kahalgaon_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.kahalgaon_load : null,
        disabled: false
      }, ],
      barh_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.barh_load : null,
        disabled: false
      }, ],
      chukha_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.chukha_load : null,
        disabled: false
      }, ],
      rangit_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.rangit_load : null,
        disabled: false
      }, ],
      tala_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.tala_load : null,
        disabled: false
      }, ],
      teesta_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.teesta_load : null,
        disabled: false
      }, ],
      WBSEGCL_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.WBSEGCL_load : null,
        disabled: false
      }, ],
      GRIDCO_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.GRIDCO_load : null,
        disabled: false
      }, ],
      BSPGCL_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.BSPGCL_load : null,
        disabled: false
      }, ],
      KBUNL_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.KBUNL_load : null,
        disabled: false
      }, ],
      DVC_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.DVC_load : null,
        disabled: false
      }, ],
      CESC_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.CESC_load : null,
        disabled: false
      }, ],
      JSEB_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.JSEB_load : null,
        disabled: false
      }, ],
      kurichu_load: [{
        value: this.constituentGeneration ? this.constituentGeneration.kurichu_load : null,
        disabled: false
      }, ],
    });
  }
  onChangesNepalFeeders() {
    if (this.NepalFeedersForm){
    this.NepalFeedersForm.get('kushaha_1_energy').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNepalFeeders();
      });
    this.NepalFeedersForm.get('kushaha_2_energy').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNepalFeeders();
      });
    this.NepalFeedersForm.get('raj_biraj_energy').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNepalFeeders();
      });
    this.NepalFeedersForm.get('surajpura_energy').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNepalFeeders();
      });
    this.NepalFeedersForm.get('jaleshwar_sitamarhi_energy').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNepalFeeders();
      });
    this.NepalFeedersForm.get('jaleshwar_sursand_energy').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNepalFeeders();
      });
    this.NepalFeedersForm.get('birganj_energy').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNepalFeeders();
      });
    this.NepalFeedersForm.get('parwanipur_energy').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNepalFeeders();
      });
    this.NepalFeedersForm.get('sirha_energy').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNepalFeeders();
      });
    }
  }
  calculateNepalFeeders() {
    let total = 0;
    const kushaha_1_energy = this.NepalFeedersForm.get('kushaha_1_energy').value;
    const kushaha_2_energy = this.NepalFeedersForm.get('kushaha_2_energy').value;
    const raj_biraj_energy = this.NepalFeedersForm.get('raj_biraj_energy').value;
    const surajpura_energy = this.NepalFeedersForm.get('surajpura_energy').value;
    const jaleshwar_sitamarhi_energy = this.NepalFeedersForm.get('jaleshwar_sitamarhi_energy').value;
    const jaleshwar_sursand_energy = this.NepalFeedersForm.get('jaleshwar_sursand_energy').value;
    const birganj_energy = this.NepalFeedersForm.get('birganj_energy').value;
    const parwanipur_energy = this.NepalFeedersForm.get('parwanipur_energy').value;
    const sirha_energy = this.NepalFeedersForm.get('sirha_energy').value;
    total = kushaha_1_energy + kushaha_2_energy + raj_biraj_energy + surajpura_energy + jaleshwar_sitamarhi_energy
    + jaleshwar_sursand_energy + birganj_energy + parwanipur_energy + sirha_energy;
    const nepal_energy = this.NepalFeedersForm.get('nepal_energy');
    nepal_energy.setValue(parseFloat(total.toFixed(2)));
    const nepal_total = this.MiscellaneousForm.get('nepal_total');
    nepal_total.setValue(total);
  }
  bindNepalFeedersData() {
    this.NepalFeedersForm = this.formBuilder.group({
      kushaha_1_max_load: [{
        value: this.nepalFeeders ? this.nepalFeeders.kushaha_1_max_load : null,
        disabled: false
      }, ],
      kushaha_1_time: [{
        value: this.nepalFeeders ? this.nepalFeeders.kushaha_1_time : null,
        disabled: false
      }, ],
      kushaha_1_energy: [{
        value: this.nepalFeeders ? this.nepalFeeders.kushaha_1_energy : null,
        disabled: false
      }, ],
      kushaha_2_max_load: [{
        value: this.nepalFeeders ? this.nepalFeeders.kushaha_2_max_load : null,
        disabled: false
      }, ],
      kushaha_2_time: [{
        value: this.nepalFeeders ? this.nepalFeeders.kushaha_2_time : null,
        disabled: false
      }, ],
      kushaha_2_energy: [{
        value: this.nepalFeeders ? this.nepalFeeders.kushaha_2_energy : null,
        disabled: false
      }, ],
      raj_biraj_max_load: [{
        value: this.nepalFeeders ? this.nepalFeeders.raj_biraj_max_load : null,
        disabled: false
      }, ],
      raj_biraj_time: [{
        value: this.nepalFeeders ? this.nepalFeeders.raj_biraj_time : null,
        disabled: false
      }, ],
      raj_biraj_energy: [{
        value: this.nepalFeeders ? this.nepalFeeders.raj_biraj_energy : null,
        disabled: false
      }, ],
      surajpura_max_load: [{
        value: this.nepalFeeders ? this.nepalFeeders.surajpura_max_load : null,
        disabled: false
      }, ],
      surajpura_time: [{
        value: this.nepalFeeders ? this.nepalFeeders.surajpura_time : null,
        disabled: false
      }, ],
      surajpura_energy: [{
        value: this.nepalFeeders ? this.nepalFeeders.surajpura_energy : null,
        disabled: false
      }, ],
      jaleshwar_sitamarhi_max_load: [{
        value: this.nepalFeeders ? this.nepalFeeders.jaleshwar_sitamarhi_max_load : null,
        disabled: false
      }, ],
      jaleshwar_sitamarhi_time: [{
        value: this.nepalFeeders ? this.nepalFeeders.jaleshwar_sitamarhi_time : null,
        disabled: false
      }, ],
      jaleshwar_sitamarhi_energy: [{
        value: this.nepalFeeders ? this.nepalFeeders.jaleshwar_sitamarhi_energy : null,
        disabled: false
      }, ],
      jaleshwar_sursand_max_load: [{
        value: this.nepalFeeders ? this.nepalFeeders.jaleshwar_sursand_max_load : null,
        disabled: false
      }, ],
      jaleshwar_sursand_time: [{
        value: this.nepalFeeders ? this.nepalFeeders.jaleshwar_sursand_time : null,
        disabled: false
      }, ],
      jaleshwar_sursand_energy: [{
        value: this.nepalFeeders ? this.nepalFeeders.jaleshwar_sursand_energy : null,
        disabled: false
      }, ],
      birganj_max_load: [{
        value: this.nepalFeeders ? this.nepalFeeders.birganj_max_load : null,
        disabled: false
      }, ],
      birganj_time: [{
        value: this.nepalFeeders ? this.nepalFeeders.birganj_time : null,
        disabled: false
      }, ],
      birganj_energy: [{
        value: this.nepalFeeders ? this.nepalFeeders.birganj_energy : null,
        disabled: false
      }, ],
      parwanipur_max_load: [{
        value: this.nepalFeeders ? this.nepalFeeders.parwanipur_max_load : null,
        disabled: false
      }, ],
      parwanipur_time: [{
        value: this.nepalFeeders ? this.nepalFeeders.parwanipur_time : null,
        disabled: false
      }, ],
      parwanipur_energy: [{
        value: this.nepalFeeders ? this.nepalFeeders.parwanipur_energy : null,
        disabled: false
      }, ],
      sirha_max_load: [{
        value: this.nepalFeeders ? this.nepalFeeders.sirha_max_load : null,
        disabled: false
      }, ],
      sirha_time: [{
        value: this.nepalFeeders ? this.nepalFeeders.sirha_time : null,
        disabled: false
      }, ],
      sirha_energy: [{
        value: this.nepalFeeders ? this.nepalFeeders.sirha_energy : null,
        disabled: false
      }, ],
      nepal_energy: [{
        value: this.nepalFeeders ? this.nepalFeeders.nepal_energy : null,
        disabled: true
      }, ],
    });
    this.onChangesNepalFeeders();
  }
  onChangesSolarPower() {
    if (this.SolarPowerGenerationForm) {
    this.SolarPowerGenerationForm.get('magadh_spp_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSolarPower();
    });
    this.SolarPowerGenerationForm.get('nalanda_spp_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSolarPower();
    });
    this.SolarPowerGenerationForm.get('bahera_spp_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSolarPower();
    });
    this.SolarPowerGenerationForm.get('savkala_spp_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSolarPower();
    });
    this.SolarPowerGenerationForm.get('sunmark_spp_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSolarPower();
    });
    this.SolarPowerGenerationForm.get('alfa_spp_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSolarPower();
    });
    this.SolarPowerGenerationForm.get('response_spp_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSolarPower();
    });
    this.SolarPowerGenerationForm.get('glat_spp_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSolarPower();
    });
    this.SolarPowerGenerationForm.get('avantika_spp_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSolarPower();
    });
    this.SolarPowerGenerationForm.get('murera_spp_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSolarPower();
    });
  }
  }
  calculateSolarPower() {
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    let total4 = 0;
    let total5 = 0;
    const magadh_spp_import = this.SolarPowerGenerationForm.get('magadh_spp_import').value;
    const nalanda_spp_import = this.SolarPowerGenerationForm.get('nalanda_spp_import').value;
    const bahera_spp_import = this.SolarPowerGenerationForm.get('bahera_spp_import').value;
    const savkala_spp_import = this.SolarPowerGenerationForm.get('savkala_spp_import').value;
    const sunmark_spp_import = this.SolarPowerGenerationForm.get('sunmark_spp_import').value;
    const alfa_spp_import = this.SolarPowerGenerationForm.get('alfa_spp_import').value;
    const response_spp_import = this.SolarPowerGenerationForm.get('response_spp_import').value;
    const glat_spp_import = this.SolarPowerGenerationForm.get('glat_spp_import').value;
    const avantika_spp_import = this.SolarPowerGenerationForm.get('avantika_spp_import').value;
    const murera_spp_import = this.SolarPowerGenerationForm.get('murera_spp_import').value;
    // end
    total1 = magadh_spp_import + nalanda_spp_import + bahera_spp_import + savkala_spp_import
    + sunmark_spp_import + alfa_spp_import + response_spp_import + glat_spp_import + avantika_spp_import + murera_spp_import;
    const total_solar_power_import = this.SolarPowerGenerationForm.get('total_solar_power_import');
    total_solar_power_import.setValue(parseFloat(total1.toFixed(2)));
    // end
    const Sugar_Mills_Total = this.SugarMillsGenerationForm.get('sugar_mill_gen_97_import').value;
    const ERLDC_Schedule_energy = this.SystemReportNetForm.get('ERLDC_Schedule_energy').value;
    const Total_Solar_Power_Import = this.SolarPowerGenerationForm.get('total_solar_power_import').value;
    const bspgcl_gen = this.SystemReportForm.get('BSPGCL_GEN').value;
    const kbunl_generation = this.SystemReportForm.get('KBUNL_GENERATION').value;
    const kbunl_stage_2 = this.SystemReportForm.get('KBUNL_STAGE_2').value;
    total2 = (ERLDC_Schedule_energy + bspgcl_gen + kbunl_generation + Sugar_Mills_Total
              + Total_Solar_Power_Import - kbunl_stage_2) * 0.46;
    const drawal_exchange = this.NBPDCLForm.get('drawal_exchange');
    drawal_exchange.setValue(parseFloat(total2.toFixed(2)));
    // end
    total3 = (ERLDC_Schedule_energy + bspgcl_gen + kbunl_generation + Sugar_Mills_Total
      + Total_Solar_Power_Import - kbunl_stage_2) * 0.54;
    const net_schedule_exchange = this.SBPDCLForm.get('net_schedule_exchange');
    net_schedule_exchange.setValue(parseFloat(total3.toFixed(2)));
    // end
    const kbunl_stage_1 = this.SystemReportForm.get('KBUNL_STAGE_1').value;
    const central_sector_bilateral_power = this.SystemReportNetForm.get('central_sector_bilateral_power').value;
    total4 = ( bspgcl_gen + Sugar_Mills_Total
      + Total_Solar_Power_Import + kbunl_stage_1 + central_sector_bilateral_power);
    const total_demand_met_energy = this.SystemReportNetForm.get('total_demand_met_energy');
    total_demand_met_energy.setValue(parseFloat(total4.toFixed(2)));
    // end
    const net_power_exchange = this.NBPDCLForm.get('net_power_exchange').value;
    total5 = bspgcl_gen + kbunl_stage_1 + Sugar_Mills_Total + avantika_spp_import + murera_spp_import + net_power_exchange;
    const total_demand_met_NBPDCL_energy = this.SystemReportNetForm.get('total_demand_met_NBPDCL_energy');
    total_demand_met_NBPDCL_energy.setValue(parseFloat(total5.toFixed(2)));
  }
  bindSolarPowerGenerationData() {
    this.SolarPowerGenerationForm = this.formBuilder.group({
      magadh_spp_max_load: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.magadh_spp_max_load : null,
        disabled: false
      }, ],
      magadh_spp_time: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.magadh_spp_time : null,
        disabled: false
      }, ],
      magadh_spp_import: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.magadh_spp_import : null,
        disabled: false
      }, ],
      nalanda_spp_max_load: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.nalanda_spp_max_load : null,
        disabled: false
      }, ],
      nalanda_spp_time: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.nalanda_spp_time : null,
        disabled: false
      }, ],
      nalanda_spp_import: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.nalanda_spp_import : null,
        disabled: false
      }, ],
      bahera_spp_max_load: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.bahera_spp_max_load : null,
        disabled: false
      }, ],
      bahera_spp_time: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.bahera_spp_time : null,
        disabled: false
      }, ],
      bahera_spp_import: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.bahera_spp_import : null,
        disabled: false
      }, ],
      savkala_spp_max_load: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.savkala_spp_max_load : null,
        disabled: false
      }, ],
      savkala_spp_time: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.savkala_spp_time : null,
        disabled: false
      }, ],
      savkala_spp_import: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.savkala_spp_import : null,
        disabled: false
      }, ],
      sunmark_spp_max_load: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.sunmark_spp_max_load : null,
        disabled: false
      }, ],
      sunmark_spp_time: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.sunmark_spp_time : null,
        disabled: false
      }, ],
      sunmark_spp_import: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.sunmark_spp_import : null,
        disabled: false
      }, ],
      alfa_spp_max_load: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.alfa_spp_max_load : null,
        disabled: false
      }, ],
      alfa_spp_time: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.alfa_spp_time : null,
        disabled: false
      }, ],
      alfa_spp_import: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.alfa_spp_import : null,
        disabled: false
      }, ],
      response_spp_max_load: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.response_spp_max_load : null,
        disabled: false
      }, ],
      response_spp_time: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.response_spp_time : null,
        disabled: false
      }, ],
      response_spp_import: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.response_spp_import : null,
        disabled: false
      }, ],
      glat_spp_max_load: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.glat_spp_max_load : null,
        disabled: false
      }, ],
      glat_spp_time: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.glat_spp_time : null,
        disabled: false
      }, ],
      glat_spp_import: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.glat_spp_import : null,
        disabled: false
      }, ],
      avantika_spp_max_load: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.avantika_spp_max_load : null,
        disabled: false
      }, ],
      avantika_spp_time: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.avantika_spp_time : null,
        disabled: false
      }, ],
      avantika_spp_import: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.avantika_spp_import : null,
        disabled: false
      }, ],
      murera_spp_max_load: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.murera_spp_max_load : null,
        disabled: false
      }, ],
      murera_spp_time: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.murera_spp_time : null,
        disabled: false
      }, ],
      murera_spp_import: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.murera_spp_import : null,
        disabled: false
      }, ],
      total_solar_power_max_load: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.total_solar_power_max_load : null,
        disabled: false
      }, ],
      total_solar_power_time: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.total_solar_power_time : null,
        disabled: false
      }, ],
      total_solar_power_import: [{
        value: this.solarPowerGeneration ? this.solarPowerGeneration.total_solar_power_import : null,
        disabled: true
      }, ],
    });
    this.onChangesSolarPower();
  }
  onChangesSugarMills() {
    if (this.SugarMillsGenerationForm){
    this.SugarMillsGenerationForm.get('bharat_sm_8_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSugarMills();
    });
    this.SugarMillsGenerationForm.get('hari_nagar_sm_14_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSugarMills();
    });
    this.SugarMillsGenerationForm.get('swadeshi_sm_10_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSugarMills();
    });
    this.SugarMillsGenerationForm.get('HPCL_biofuels_lauria_20_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSugarMills();
    });
    this.SugarMillsGenerationForm.get('hasanpur_sm_15_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSugarMills();
    });
    this.SugarMillsGenerationForm.get('HPCL_biofuels_sugauli_20_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSugarMills();
    });
    this.SugarMillsGenerationForm.get('HPCL_biofuels_sugauli_20_import').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSugarMills();
    });
  }
  }
  calculateSugarMills() {
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    let total4 = 0;
    let total5 = 0;
    const bharat_sm_8_import = this.SugarMillsGenerationForm.get('bharat_sm_8_import').value;
    const hari_nagar_sm_14_import = this.SugarMillsGenerationForm.get('hari_nagar_sm_14_import').value;
    const swadeshi_sm_10_import = this.SugarMillsGenerationForm.get('swadeshi_sm_10_import').value;
    const HPCL_biofuels_lauria_20_import = this.SugarMillsGenerationForm.get('HPCL_biofuels_lauria_20_import').value;
    const hasanpur_sm_15_import = this.SugarMillsGenerationForm.get('hasanpur_sm_15_import').value;
    const HPCL_biofuels_sugauli_20_import = this.SugarMillsGenerationForm.get('HPCL_biofuels_sugauli_20_import').value;
    // end
    total1 = bharat_sm_8_import + hari_nagar_sm_14_import + swadeshi_sm_10_import + HPCL_biofuels_lauria_20_import +
    hasanpur_sm_15_import + HPCL_biofuels_sugauli_20_import;
    const sugar_mill_gen_97_import = this.SugarMillsGenerationForm.get('sugar_mill_gen_97_import');
    sugar_mill_gen_97_import.setValue(parseFloat(total1.toFixed(2)));
    // end
    const Sugar_Mills_Total = this.SugarMillsGenerationForm.get('sugar_mill_gen_97_import').value;
    const ERLDC_Schedule_energy = this.SystemReportNetForm.get('ERLDC_Schedule_energy').value;
    const total_solar_power_import = this.SolarPowerGenerationForm.get('total_solar_power_import').value;
    const bspgcl_gen = this.SystemReportForm.get('BSPGCL_GEN').value;
    const kbunl_generation = this.SystemReportForm.get('KBUNL_GENERATION').value;
    const kbunl_stage_2 = this.SystemReportForm.get('KBUNL_STAGE_2').value;
    total2 = (ERLDC_Schedule_energy + bspgcl_gen + kbunl_generation + Sugar_Mills_Total
              + total_solar_power_import - kbunl_stage_2) * 0.46;
    // end
    const drawal_exchange = this.NBPDCLForm.get('drawal_exchange');
    drawal_exchange.setValue(parseFloat(total2.toFixed(2)));
    total3 = (ERLDC_Schedule_energy + bspgcl_gen + kbunl_generation + Sugar_Mills_Total
      + total_solar_power_import - kbunl_stage_2) * 0.54;
    const net_schedule_exchange = this.SBPDCLForm.get('net_schedule_exchange');
    net_schedule_exchange.setValue(parseFloat(total3.toFixed(2)));
    // end
    const kbunl_stage_1 = this.SystemReportForm.get('KBUNL_STAGE_1').value;
    const central_sector_bilateral_power = this.SystemReportNetForm.get('central_sector_bilateral_power').value;
    total4 = ( bspgcl_gen + Sugar_Mills_Total
      + total_solar_power_import + kbunl_stage_1 + central_sector_bilateral_power);
    const total_demand_met_energy = this.SystemReportNetForm.get('total_demand_met_energy');
    total_demand_met_energy.setValue(parseFloat(total4.toFixed(2)));
    const demand_met_exchange = this.SBPDCLForm.get('demand_met_exchange');
    demand_met_exchange.setValue(parseFloat(total4.toFixed(2)));
    // end
    const avantika_spp_import = this.SolarPowerGenerationForm.get('avantika_spp_import').value;
    const murera_spp_import = this.SolarPowerGenerationForm.get('murera_spp_import').value;
    const net_power_exchange = this.NBPDCLForm.get('net_power_exchange').value;
    total5 = bspgcl_gen + kbunl_stage_1 + Sugar_Mills_Total + avantika_spp_import + murera_spp_import + net_power_exchange;
    const total_demand_met_NBPDCL_energy = this.SystemReportNetForm.get('total_demand_met_NBPDCL_energy');
    total_demand_met_NBPDCL_energy.setValue(parseFloat(total5.toFixed(2)));
    // end
  }
  bindSugarMillsGenerationData() {
    this.SugarMillsGenerationForm = this.formBuilder.group({
      bharat_sm_8_max_load: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.bharat_sm_8_max_load : null,
        disabled: false
      }, ],
      bharat_sm_8_time: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.bharat_sm_8_time : null,
        disabled: false
      }, ],
      bharat_sm_8_import: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.bharat_sm_8_import : null,
        disabled: false
      }, ],
      hari_nagar_sm_14_max_load: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.hari_nagar_sm_14_max_load : null,
        disabled: false
      }, ],
      hari_nagar_sm_14_time: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.hari_nagar_sm_14_time : null,
        disabled: false
      }, ],
      hari_nagar_sm_14_import: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.hari_nagar_sm_14_import : null,
        disabled: false
      }, ],
      swadeshi_sm_10_max_load: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.swadeshi_sm_10_max_load : null,
        disabled: false
      }, ],
      swadeshi_sm_10_time: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.swadeshi_sm_10_time : null,
        disabled: false
      }, ],
      swadeshi_sm_10_import: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.swadeshi_sm_10_import : null,
        disabled: false
      }, ],
      HPCL_biofuels_lauria_20_max_load: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.HPCL_biofuels_lauria_20_max_load : null,
        disabled: false
      }, ],
      HPCL_biofuels_lauria_20_time: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.HPCL_biofuels_lauria_20_time : null,
        disabled: false
      }, ],
      HPCL_biofuels_lauria_20_import: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.HPCL_biofuels_lauria_20_import : null,
        disabled: false
      }, ],
      hasanpur_sm_15_max_load: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.hasanpur_sm_15_max_load : null,
        disabled: false
      }, ],
      hasanpur_sm_15_time: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.hasanpur_sm_15_time : null,
        disabled: false
      }, ],
      hasanpur_sm_15_import: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.hasanpur_sm_15_import : null,
        disabled: false
      }, ],
      HPCL_biofuels_sugauli_20_max_load: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.HPCL_biofuels_sugauli_20_max_load : null,
        disabled: false
      }, ],
      HPCL_biofuels_sugauli_20_time: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.HPCL_biofuels_sugauli_20_time : null,
        disabled: false
      }, ],
      HPCL_biofuels_sugauli_20_import: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.HPCL_biofuels_sugauli_20_import : null,
        disabled: false
      }, ],
      sugar_mill_gen_97_max_load: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.sugar_mill_gen_97_max_load : null,
        disabled: false
      }, ],
      sugar_mill_gen_97_time: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.sugar_mill_gen_97_time : null,
        disabled: false
      }, ],
      sugar_mill_gen_97_import: [{
        value: this.sugarMillsGeneration ? this.sugarMillsGeneration.sugar_mill_gen_97_import : null,
        disabled: true
      }, ]
    });
    this.onChangesSugarMills();
  }
  bindMaxMinPowerData() {
    this.MaxMinPowerForm = this.formBuilder.group({
      BTPS_gen_max_power: [{
        value: this.maxMinPower ? this.maxMinPower.BTPS_gen_max_power : null,
        disabled: false
      }, ],
      BTPS_gen_max_time: [{
        value: this.maxMinPower ? this.maxMinPower.BTPS_gen_max_time : null,
        disabled: false
      }, ],
      BTPS_gen_min_power: [{
        value: this.maxMinPower ? this.maxMinPower.BTPS_gen_min_power : null,
        disabled: false
      }, ],
      BTPS_gen_min_time: [{
        value: this.maxMinPower ? this.maxMinPower.BTPS_gen_min_time : null,
        disabled: false
      }, ],
      KBUNL_gen_max_power: [{
        value: this.maxMinPower ? this.maxMinPower.KBUNL_gen_max_power : null,
        disabled: false
      }, ],
      KBUNL_gen_max_time: [{
        value: this.maxMinPower ? this.maxMinPower.KBUNL_gen_max_time : null,
        disabled: false
      }, ],
      KBUNL_gen_min_power: [{
        value: this.maxMinPower ? this.maxMinPower.KBUNL_gen_min_power : null,
        disabled: false
      }, ],
      KBUNL_gen_min_time: [{
        value: this.maxMinPower ? this.maxMinPower.KBUNL_gen_min_time : null,
        disabled: false
      }, ],
      sugar_max_power: [{
        value: this.maxMinPower ? this.maxMinPower.sugar_max_power : null,
        disabled: false
      }, ],
      sugar_max_time: [{
        value: this.maxMinPower ? this.maxMinPower.sugar_max_time : null,
        disabled: false
      }, ],
      sugar_min_power: [{
        value: this.maxMinPower ? this.maxMinPower.sugar_min_power : null,
        disabled: false
      }, ],
      sugar_min_time: [{
        value: this.maxMinPower ? this.maxMinPower.sugar_min_time : null,
        disabled: false
      }, ],
      solar_max_power: [{
        value: this.maxMinPower ? this.maxMinPower.solar_max_power : null,
        disabled: false
      }, ],
      solar_max_time: [{
        value: this.maxMinPower ? this.maxMinPower.solar_max_time : null,
        disabled: false
      }, ],
      solar_min_power: [{
        value: this.maxMinPower ? this.maxMinPower.solar_min_power : null,
        disabled: false
      }, ],
      solar_min_time: [{
        value: this.maxMinPower ? this.maxMinPower.solar_min_time : null,
        disabled: false
      }, ],
      net_power_max_power: [{
        value: this.maxMinPower ? this.maxMinPower.net_power_max_power : null,
        disabled: false
      }, ],
      net_power_max_time: [{
        value: this.maxMinPower ? this.maxMinPower.net_power_max_time : null,
        disabled: false
      }, ],
      net_power_min_power: [{
        value: this.maxMinPower ? this.maxMinPower.net_power_min_power : null,
        disabled: false
      }, ],
      net_power_min_time: [{
        value: this.maxMinPower ? this.maxMinPower.net_power_min_time : null,
        disabled: false
      }, ],
      demand_max_power: [{
        value: this.maxMinPower ? this.maxMinPower.demand_max_power : null,
        disabled: false
      }, ],
      demand_max_time: [{
        value: this.maxMinPower ? this.maxMinPower.demand_max_time : null,
        disabled: false
      }, ],
      demand_min_power: [{
        value: this.maxMinPower ? this.maxMinPower.demand_min_power : null,
        disabled: false
      }, ],
      demand_min_time: [{
        value: this.maxMinPower ? this.maxMinPower.demand_min_time : null,
        disabled: false
      }, ],
      nepal_max_power: [{
        value: this.maxMinPower ? this.maxMinPower.nepal_max_power : null,
        disabled: false
      }, ],
      nepal_max_time: [{
        value: this.maxMinPower ? this.maxMinPower.nepal_max_time : null,
        disabled: false
      }, ],
      nepal_min_power: [{
        value: this.maxMinPower ? this.maxMinPower.nepal_min_power : null,
        disabled: false
      }, ],
      nepal_min_time: [{
        value: this.maxMinPower ? this.maxMinPower.nepal_min_time : null,
        disabled: false
      }, ]
    });
  }
  onChangesSystemReport() {
    if (this.SystemReportForm){
    this.SystemReportForm.get('BTPS_6').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSystemReport();
    });
    this.SystemReportForm.get('BTPS_7').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSystemReport();
    });
    this.SystemReportForm.get('BTPS_8').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSystemReport();
    });
    this.SystemReportForm.get('KBUNL_1').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSystemReport();
    });
    this.SystemReportForm.get('KBUNL_2').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSystemReport();
    });
    this.SystemReportForm.get('KBUNL_3').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSystemReport();
    });
    this.SystemReportForm.get('KBUNL_4').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSystemReport();
    });
  }
  }
  calculateSystemReport() {
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    let total4 = 0;
    let total5 = 0;
    let total6 = 0;
    let total7 = 0;
    let total8 = 0;
    const BTPS_6 = this.SystemReportForm.get('BTPS_6').value;
    const BTPS_7 = this.SystemReportForm.get('BTPS_7').value;
    const BTPS_8 = this.SystemReportForm.get('BTPS_8').value;
    const KBUNL_1 = this.SystemReportForm.get('KBUNL_1').value;
    const KBUNL_2 = this.SystemReportForm.get('KBUNL_2').value;
    const KBUNL_3 = this.SystemReportForm.get('KBUNL_3').value;
    const KBUNL_4 = this.SystemReportForm.get('KBUNL_4').value;
    // end
    total1 = BTPS_6 + BTPS_7 + BTPS_8;
    const BSPGCL_GEN = this.SystemReportForm.get('BSPGCL_GEN');
    BSPGCL_GEN.setValue(parseFloat(total1.toFixed(2)));
    // end
    total2 = KBUNL_1 + KBUNL_2;
    const KBUNL_STAGE_1 = this.SystemReportForm.get('KBUNL_STAGE_1');
    KBUNL_STAGE_1.setValue(parseFloat(total2.toFixed(2)));
    // end
    total3 = KBUNL_3 + KBUNL_4;
    const KBUNL_STAGE_2 = this.SystemReportForm.get('KBUNL_STAGE_2');
    KBUNL_STAGE_2.setValue(parseFloat(total3.toFixed(2)));
    // end
    const KBUNL_ISGS_exchange = this.NBPDCLForm.get('KBUNL_ISGS_exchange');
    KBUNL_ISGS_exchange.setValue(parseFloat(total3.toFixed(2)));
    //end
    total4 = total2 + total3;
    const KBUNL_GENERATION = this.SystemReportForm.get('KBUNL_GENERATION');
    KBUNL_GENERATION.setValue(parseFloat(total4.toFixed(2)));
    // end
    const schedule_exchange = this.SBPDCLForm.get('schedule_exchange').value;
    const sugar_mill_gen_97_import = this.SugarMillsGenerationForm.get('sugar_mill_gen_97_import').value;
    const total_solar_power_import = this.SolarPowerGenerationForm.get('total_solar_power_import').value;
    total5 = (schedule_exchange + total1 + total4 + sugar_mill_gen_97_import
             + total_solar_power_import - total3) * 0.46;
    const drawal_exchange = this.NBPDCLForm.get('drawal_exchange');
    drawal_exchange.setValue(parseFloat(total5.toFixed(2)));
    //end
    total6 = (schedule_exchange + total1 + total4 + sugar_mill_gen_97_import
             + total_solar_power_import - total3) * 0.54;
    const net_schedule_exchange = this.SBPDCLForm.get('net_schedule_exchange');
    net_schedule_exchange.setValue(parseFloat(total6.toFixed(2)));
    // end
    const central_sector_bilateral_power = this.SystemReportNetForm.get('central_sector_bilateral_power').value;
    total7 = ( total1 + sugar_mill_gen_97_import
      + total_solar_power_import + total2 + central_sector_bilateral_power);
    const total_demand_met_energy = this.SystemReportNetForm.get('total_demand_met_energy');
    total_demand_met_energy.setValue(parseFloat(total7.toFixed(2)));
    const demand_met_exchange = this.SBPDCLForm.get('demand_met_exchange');
    demand_met_exchange.setValue(parseFloat(total7.toFixed(2)));
    // end
    const net_power_exchange = this.NBPDCLForm.get('net_power_exchange').value;
    const avantika_spp_import = this.SolarPowerGenerationForm.get('avantika_spp_import').value;
    const murera_spp_import = this.SolarPowerGenerationForm.get('murera_spp_import').value;
    total8 = net_power_exchange + avantika_spp_import + murera_spp_import + sugar_mill_gen_97_import + total1
    + total2;
    const total_demand_met_NBPDCL_energy = this.SystemReportNetForm.get('total_demand_met_NBPDCL_energy');
    total_demand_met_NBPDCL_energy.setValue(parseFloat(total8.toFixed(2)));
    // end
  }
  bindSystemReportData() {
    this.SystemReportForm = this.formBuilder.group({
      BTPS_6: [{
        value: this.systemReport ? this.systemReport.BTPS_6 : null,
        disabled: false
      }, ],
      BTPS_7: [{
        value: this.systemReport ? this.systemReport.BTPS_7 : null,
        disabled: false
      }, ],
      BTPS_8: [{
        value: this.systemReport ? this.systemReport.BTPS_8 : null,
        disabled: false
      }, ],
      BSPGCL_GEN: [{
        value: this.systemReport ? this.systemReport.BSPGCL_GEN : null,
        disabled: true
      }, ],
      KBUNL_1: [{
        value: this.systemReport ? this.systemReport.KBUNL_1 : null,
        disabled: false
      }, ],
      KBUNL_2: [{
        value: this.systemReport ? this.systemReport.KBUNL_2 : null,
        disabled: false
      }, ],
      KBUNL_STAGE_1: [{
        value: this.systemReport ? this.systemReport.KBUNL_STAGE_1 : null,
        disabled: true
      }, ],
      KBUNL_3: [{
        value: this.systemReport ? this.systemReport.KBUNL_3 : null,
        disabled: false
      }, ],
      KBUNL_4: [{
        value: this.systemReport ? this.systemReport.KBUNL_4 : null,
        disabled: false
      }, ],
      KBUNL_STAGE_2: [{
        value: this.systemReport ? this.systemReport.KBUNL_STAGE_2 : null,
        disabled: true
      }, ],
      KBUNL_GENERATION: [{
        value: this.systemReport ? this.systemReport.KBUNL_GENERATION : null,
        disabled: true
      }, ],
    });
    this.onChangesSystemReport();
  }
  onChangesSystemReportNet() {
    if (this.SystemReportForm){
    this.SBPDCLForm.get('net_power_drawal_bihar_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSystemReportNet();
    });
    this.SystemReportNetForm.get('NR_CS_power_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSystemReportNet();
    });
    this.SBPDCLForm.get('rehand_sone_nagar_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSystemReportNet();
    });
    this.SBPDCLForm.get('chandauli_karmnasa_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSystemReportNet();
    });
    this.SBPDCLForm.get('sahupuri_karmnasa_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSystemReportNet();
      this.SystemReportNetForm.get('central_sector_bilateral_power').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSystemReportNet();
    });
    });
    this.SystemReportForm.get('BSPGCL_GEN').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSystemReportNet();
      });
    this.SystemReportForm.get('KBUNL_STAGE_1').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSystemReportNet();
      });
    this.SugarMillsGenerationForm.get('sugar_mill_gen_97_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSystemReportNet();
      });
    this.SolarPowerGenerationForm.get('total_solar_power_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSystemReportNet();
      });
    this.SolarPowerGenerationForm.get('avantika_spp_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSystemReportNet();
      });
    this.SolarPowerGenerationForm.get('murera_spp_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSystemReportNet();
      });
    this.NBPDCLForm.get('net_power_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSystemReportNet();
      });
    this.SBPDCLForm.get('net_power_drawal_cs_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSystemReportNet();
      });
    this.SolarPowerGenerationForm.get('glat_spp_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSystemReportNet();
      });
    this.SolarPowerGenerationForm.get('response_spp_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSystemReportNet();
      });
    this.SBPDCLForm.get('net_power_drawal_bihar_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSystemReportNet();
      });
    this.SBPDCLForm.get('schedule_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSystemReportNet();
      });
    }
  }
  calculateSystemReportNet() {
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    let total4 = 0;
    let total5 = 0;
    let total6 = 0;
    let total7 = 0;
    // end
    const Sugar_Mills_Total = this.SugarMillsGenerationForm.get('sugar_mill_gen_97_import').value;
    const schedule_exchange = this.SBPDCLForm.get('schedule_exchange').value;
    const Total_Solar_Power_Import = this.SolarPowerGenerationForm.get('total_solar_power_import').value;
    const bspgcl_gen = this.SystemReportForm.get('BSPGCL_GEN').value;
    const kbunl_generation = this.SystemReportForm.get('KBUNL_GENERATION').value;
    const kbunl_stage_2 = this.SystemReportForm.get('KBUNL_STAGE_2').value;
    total2 = (schedule_exchange + bspgcl_gen + kbunl_generation + Sugar_Mills_Total
              + Total_Solar_Power_Import - kbunl_stage_2) * 0.46;
    const drawal_exchange = this.NBPDCLForm.get('drawal_exchange');
    drawal_exchange.setValue(parseFloat(total2.toFixed(2)));
    // end
    total3 = (schedule_exchange + bspgcl_gen + kbunl_generation + Sugar_Mills_Total
      + Total_Solar_Power_Import - kbunl_stage_2) * 0.54;
    const net_schedule_exchange = this.SBPDCLForm.get('net_schedule_exchange');
    net_schedule_exchange.setValue(parseFloat(total3.toFixed(2)));
    // end
  }
  bindSystemReportNetData() {
    this.SystemReportNetForm = this.formBuilder.group({
      central_sector_bilateral_energy: [{
        value: this.systemReportNet ? this.systemReportNet.central_sector_bilateral_energy : null,
        disabled: true
      }, ],
      NR_CS_power_exchange: [{
        value: this.systemReportNet ? this.systemReportNet.NR_CS_power_exchange : null,
        disabled: true
      }, ],
      central_sector_bilateral_power: [{
        value: this.systemReportNet ? this.systemReportNet.central_sector_bilateral_power : null,
        disabled: true
      }, ],
      total_demand_met_energy: [{
        value: this.systemReportNet ? this.systemReportNet.total_demand_met_energy : null,
        disabled: true
      }, ],
      total_demand_met_NBPDCL_energy: [{
        value: this.systemReportNet ? this.systemReportNet.total_demand_met_NBPDCL_energy : null,
        disabled: true
      }, ],
      total_demand_met_SBPDCL: [{
        value: this.systemReportNet ? this.systemReportNet.total_demand_met_SBPDCL : null,
        disabled: true
      }, ],
      ERLDC_Schedule_energy: [{
        value: this.systemReportNet ? this.systemReportNet.ERLDC_Schedule_energy : null,
        disabled: true
      }, ],
      energy_ui_energy: [{
        value: this.systemReportNet ? this.systemReportNet.energy_ui_energy : null,
        disabled: true
      }, ],
      average_frequency: [{
        value: this.systemReportNet ? this.systemReportNet.average_frequency : null,
        disabled: false
      }, ],
    });
    this.onChangesSystemReportNet();
  }
  onChangesNBPDCLTieLinesExchanges() {
    if (this.NBPDCLForm) {
    this.NBPDCLForm.get('muzaffarpur_KBUNL_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateNBPDCLTieLinesExchange();
    });
    this.NBPDCLForm.get('KBUNL_ISGS_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateNBPDCLTieLinesExchange();
    });
    this.NBPDCLForm.get('muzaffarpur_hazipur_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateNBPDCLTieLinesExchange();
    });
    this.NBPDCLForm.get('purnia_madhepura_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateNBPDCLTieLinesExchange();
    });
    this.NBPDCLForm.get('purnea_purnea_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateNBPDCLTieLinesExchange();
    });
    this.NBPDCLForm.get('purnia_kisanganj_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateNBPDCLTieLinesExchange();
    });
    this.NBPDCLForm.get('purnea_begusarai_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateNBPDCLTieLinesExchange();
    });
    this.NBPDCLForm.get('kishanganj_kishanganj_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateNBPDCLTieLinesExchange();
    });
    this.NBPDCLForm.get('dalkola_baisi_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateNBPDCLTieLinesExchange();
    });
    this.NBPDCLForm.get('darbhanga_samastipur_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNBPDCLTieLinesExchange();
      });
    this.NBPDCLForm.get('darbhanga_motipur_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNBPDCLTieLinesExchange();
      });
    this.NBPDCLForm.get('darbhanga_laukahi_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNBPDCLTieLinesExchange();
      });
    this.NBPDCLForm.get('darbhanga_darbhanga_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNBPDCLTieLinesExchange();
      });
    this.NBPDCLForm.get('motihari_motihari_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNBPDCLTieLinesExchange();
      });
    this.NBPDCLForm.get('motihari_bettiah_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNBPDCLTieLinesExchange();
      });
    this.NBPDCLForm.get('motihari_raxaul_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNBPDCLTieLinesExchange();
      });
    this.NBPDCLForm.get('bihar_sharif_begusarai_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateNBPDCLTieLinesExchange();
      });
    }
  }
  calculateNBPDCLTieLinesExchange() {
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    const muzaffarpur_KBUNL_exchange = this.NBPDCLForm.get('muzaffarpur_KBUNL_exchange').value;
    const KBUNL_ISGS_exchange = this.NBPDCLForm.get('KBUNL_ISGS_exchange').value;
    const muzaffarpur_hazipur_exchange = this.NBPDCLForm.get('muzaffarpur_hazipur_exchange').value;
    const purnia_madhepura_exchange = this.NBPDCLForm.get('purnia_madhepura_exchange').value;
    const purnea_purnea_exchange = this.NBPDCLForm.get('purnea_purnea_exchange').value;
    const purnia_kisanganj_exchange = this.NBPDCLForm.get('purnia_kisanganj_exchange').value;
    const purnea_begusarai_exchange = this.NBPDCLForm.get('purnea_begusarai_exchange').value;
    const kishanganj_kishanganj_exchange = this.NBPDCLForm.get('kishanganj_kishanganj_exchange').value;
    const dalkola_baisi_exchange = this.NBPDCLForm.get('dalkola_baisi_exchange').value;
    const darbhanga_samastipur_exchange = this.NBPDCLForm.get('darbhanga_samastipur_exchange').value;
    const darbhanga_motipur_exchange = this.NBPDCLForm.get('darbhanga_motipur_exchange').value;
    const darbhanga_laukahi_exchange = this.NBPDCLForm.get('darbhanga_laukahi_exchange').value;
    const darbhanga_darbhanga_exchange = this.NBPDCLForm.get('darbhanga_darbhanga_exchange').value;
    const motihari_motihari_exchange = this.NBPDCLForm.get('motihari_motihari_exchange').value;
    const motihari_bettiah_exchange = this.NBPDCLForm.get('motihari_bettiah_exchange').value;
    const bihar_sharif_begusarai_exchange = this.NBPDCLForm.get('bihar_sharif_begusarai_exchange').value;
    const motihari_raxaul_exchange = this.NBPDCLForm.get('motihari_raxaul_exchange').value;
    // end
    total1 = muzaffarpur_KBUNL_exchange + KBUNL_ISGS_exchange + muzaffarpur_hazipur_exchange + purnia_madhepura_exchange +
    purnea_purnea_exchange + purnia_kisanganj_exchange + purnea_begusarai_exchange + kishanganj_kishanganj_exchange + dalkola_baisi_exchange
    + darbhanga_samastipur_exchange + darbhanga_motipur_exchange + darbhanga_laukahi_exchange +
    darbhanga_darbhanga_exchange + motihari_motihari_exchange + motihari_bettiah_exchange + 
    motihari_raxaul_exchange + bihar_sharif_begusarai_exchange;
    const net_power_exchange = this.NBPDCLForm.get('net_power_exchange');
    net_power_exchange.setValue(parseFloat(total1.toFixed(2)));
    // end
    const Net_Power_Drawal_CS_Exchange = this.SBPDCLForm.get('net_power_drawal_cs_exchange').value;
    total2 = Net_Power_Drawal_CS_Exchange + total1;
    const net_power_drawal_bihar_exchange = this.SBPDCLForm.get('net_power_drawal_bihar_exchange');
    net_power_drawal_bihar_exchange.setValue(parseFloat(total2.toFixed(2)));
    // end
    const bspgcl_gen = this.SystemReportForm.get('BSPGCL_GEN').value;
    const kbunl_stage_1 = this.SystemReportForm.get('KBUNL_STAGE_1').value;
    const Sugar_Mills_Total = this.SugarMillsGenerationForm.get('sugar_mill_gen_97_import').value;
    const avantika_spp_import = this.SolarPowerGenerationForm.get('avantika_spp_import').value;
    const murera_spp_import = this.SolarPowerGenerationForm.get('murera_spp_import').value;
    total3 = bspgcl_gen + kbunl_stage_1 + Sugar_Mills_Total + avantika_spp_import + murera_spp_import + total1;
    const total_demand_met_NBPDCL_energy = this.SystemReportNetForm.get('total_demand_met_NBPDCL_energy');
    total_demand_met_NBPDCL_energy.setValue(parseFloat(total3.toFixed(2)));
    // end
    const Bihar_Sharif_Begusarai_Exchange = this.SBPDCLForm.get('bihar_sharif_begusarai_exchange');
    Bihar_Sharif_Begusarai_Exchange.setValue(-bihar_sharif_begusarai_exchange);
  }
  bindNBPDCLTieLinesExchangeData() {
    this.NBPDCLForm = this.formBuilder.group({
      muzaffarpur_KBUNL_import: [{
        value:  this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.muzaffarpur_KBUNL_import : null,
        disabled: false
      }, ],
      muzaffarpur_KBUNL_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.muzaffarpur_KBUNL_export : null,
        disabled: false
      }, ],
      muzaffarpur_KBUNL_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.muzaffarpur_KBUNL_exchange : null,
        disabled: true
      }, ],
      KBUNL_ISGS_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.KBUNL_ISGS_import : null,
        disabled: false
      }, ],
      KBUNL_ISGS_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.KBUNL_ISGS_export : null,
        disabled: false
      }, ],
      KBUNL_ISGS_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.KBUNL_ISGS_exchange : null,
        disabled: true
      }, ],
      muzaffarpur_hazipur_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.muzaffarpur_hazipur_import : null,
        disabled: false
      }, ],
      muzaffarpur_hazipur_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.muzaffarpur_hazipur_export : null,
        disabled: false
      }, ],
      muzaffarpur_hazipur_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.muzaffarpur_hazipur_exchange : null,
        disabled: false
      }, ],
      purnia_madhepura_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.purnia_madhepura_import : null,
        disabled: false
      }, ],
      purnia_madhepura_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.purnia_madhepura_export : null,
        disabled: false
      }, ],
      purnia_madhepura_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.purnia_madhepura_exchange : null,
        disabled: false
      }, ],
      purnea_purnea_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.purnea_purnea_import : null,
        disabled: false
      }, ],
      purnea_purnea_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.purnea_purnea_export : null,
        disabled: false
      }, ],
      purnea_purnea_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.purnea_purnea_exchange : null,
        disabled: false
      }, ],
      purnia_kisanganj_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.purnia_kisanganj_import : null,
        disabled: false
      }, ],
      purnia_kisanganj_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.purnia_kisanganj_export : null,
        disabled: false
      }, ],
      purnia_kisanganj_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.purnia_kisanganj_exchange : null,
        disabled: false
      }, ],
      purnea_begusarai_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.purnea_begusarai_import : null,
        disabled: false
      }, ],
      purnea_begusarai_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.purnea_begusarai_export : null,
        disabled: false
      }, ],
      purnea_begusarai_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.purnea_begusarai_exchange : null,
        disabled: true
      },  ],
      kishanganj_kishanganj_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.kishanganj_kishanganj_import : null,
        disabled: false
      }, ],
      kishanganj_kishanganj_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.kishanganj_kishanganj_export : null,
        disabled: false
      }, ],
      kishanganj_kishanganj_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.kishanganj_kishanganj_exchange : null,
        disabled: false
      }, ],
      dalkola_baisi_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.dalkola_baisi_import : null,
        disabled: false
      }, ],
      dalkola_baisi_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.dalkola_baisi_export : null,
        disabled: false
      }, ],
      dalkola_baisi_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.dalkola_baisi_exchange : null,
        disabled: false
      }, ],
      darbhanga_samastipur_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.darbhanga_samastipur_import : null,
        disabled: false
      }, ],
      darbhanga_samastipur_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.darbhanga_samastipur_export : null,
        disabled: false
      }, ],
      darbhanga_samastipur_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.darbhanga_samastipur_exchange : null,
        disabled: false
      }, ],
      darbhanga_motipur_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.darbhanga_motipur_import : null,
        disabled: false
      }, ],
      darbhanga_motipur_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.darbhanga_motipur_export : null,
        disabled: false
      }, ],
      darbhanga_motipur_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.darbhanga_motipur_exchange : null,
        disabled: false
      }, ],
      darbhanga_laukahi_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.darbhanga_laukahi_import : null,
        disabled: false
      }, ],
      darbhanga_laukahi_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.darbhanga_laukahi_export : null,
        disabled: false
      }, ],
      darbhanga_laukahi_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.darbhanga_laukahi_exchange : null,
        disabled: false
      }, ],
      darbhanga_darbhanga_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.darbhanga_darbhanga_import : null,
        disabled: false
      }, ],
      darbhanga_darbhanga_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.darbhanga_darbhanga_export : null,
        disabled: false
      }, ],
      darbhanga_darbhanga_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.darbhanga_darbhanga_exchange : null,
        disabled: false
      }, ],
      motihari_motihari_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.motihari_motihari_import : null,
        disabled: false
      }, ],
      motihari_motihari_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.motihari_motihari_export : null,
        disabled: false
      }, ],
      motihari_motihari_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.motihari_motihari_exchange : null,
        disabled: false
      }, ],
      motihari_bettiah_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.motihari_bettiah_import : null,
        disabled: false
      },  ],
      motihari_bettiah_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.motihari_bettiah_export : null,
        disabled: false
      },  ],
      motihari_bettiah_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.motihari_bettiah_exchange : null,
        disabled: false
      },  ],
      motihari_raxaul_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.motihari_raxaul_import : null,
        disabled: false
      },  ],
      motihari_raxaul_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.motihari_raxaul_export : null,
        disabled: false
      },  ],
      motihari_raxaul_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.motihari_raxaul_exchange : null,
        disabled: false
      },  ],
      bihar_sharif_begusarai_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.bihar_sharif_begusarai_import : null,
        disabled: false
      },  ],
      bihar_sharif_begusarai_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.bihar_sharif_begusarai_export : null,
        disabled: false
      },  ],
      bihar_sharif_begusarai_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.bihar_sharif_begusarai_exchange : null,
        disabled: false
      },  ],
      net_power_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.net_power_import : null,
        disabled: false
      },  ],
      net_power_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.net_power_export : null,
        disabled: false
      },  ],
      net_power_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.net_power_exchange : null,
        disabled: false
      },  ],
      drawal_import: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.drawal_import : null,
        disabled: false
      },  ],
      drawal_export: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.drawal_export : null,
        disabled: false
      },  ],
      drawal_exchange: [{
        value: this.NBPDCLTieLinesExchange ? this.NBPDCLTieLinesExchange.drawal_exchange : null,
        disabled: false
      },  ],
    });
    this.onChangesNBPDCLTieLinesExchanges();
  }
  onChangesSBPDCLTieLinesExchange() {
    if (this.SBPDCLForm) {
    this.SBPDCLForm.get('bihar_sharif_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSBPDCLTieLinesExchange();
    });
    this.SBPDCLForm.get('patna_sipara_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSBPDCLTieLinesExchange();
    });
    this.SBPDCLForm.get('patna_fatuha_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSBPDCLTieLinesExchange();
    });
    this.SBPDCLForm.get('patna_khagual_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSBPDCLTieLinesExchange();
    });
    this.SBPDCLForm.get('pusauli_nadokhar_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSBPDCLTieLinesExchange();
    });
    this.SBPDCLForm.get('pusauli_dehri_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSBPDCLTieLinesExchange();
    });
    this.SBPDCLForm.get('gaya_dehri_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSBPDCLTieLinesExchange();
    });
    this.SBPDCLForm.get('gaya_bodhgaya_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSBPDCLTieLinesExchange();
    });
    this.SBPDCLForm.get('gaya_khizasarai_exchange').valueChanges.
    pipe(takeWhile(() => !this.destroying)).
    subscribe(data => {
      this.calculateSBPDCLTieLinesExchange();
    });
    this.SBPDCLForm.get('gaya_sonenagar_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('banka_banka_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('banka_sabour_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('banka_sultanganj_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('kahalgaon_sabour_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('kahalgaon_kahalgaon_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('lakhisarai_lakhisarai_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('lakhisarai_jamui_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('tenughat_bihar_sharif_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('japla_sonenagar_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('lalmatia_kahalgaon_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('sultanganj_deoghar_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('barhi_rajgir_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('barhi_nalanda_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('bihar_sharif_begusarai_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('rehand_sone_nagar_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('chandauli_karmnasa_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('sahupuri_karmnasa_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    this.SBPDCLForm.get('schedule_exchange').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateSBPDCLTieLinesExchange();
      });
    }
  }
  calculateSBPDCLTieLinesExchange() {
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    let total4 = 0;
    let total5 = 0;
    let total6 = 0;
    let total7 = 0;
    let total8 = 0;
    let total9 = 0;
    let total10 = 0;
    const bihar_sharif_exchange = this.SBPDCLForm.get('bihar_sharif_exchange').value;
    const patna_sipara_exchange = this.SBPDCLForm.get('patna_sipara_exchange').value;
    const patna_fatuha_exchange = this.SBPDCLForm.get('patna_fatuha_exchange').value;
    const patna_khagual_exchange = this.SBPDCLForm.get('patna_khagual_exchange').value;
    const pusauli_nadokhar_exchange = this.SBPDCLForm.get('pusauli_nadokhar_exchange').value;
    const pusauli_dehri_exchange = this.SBPDCLForm.get('pusauli_dehri_exchange').value;
    const gaya_bodhgaya_exchange = this.SBPDCLForm.get('gaya_bodhgaya_exchange').value;
    const gaya_khizasarai_exchange = this.SBPDCLForm.get('gaya_khizasarai_exchange').value;
    const gaya_sonenagar_exchange = this.SBPDCLForm.get('gaya_sonenagar_exchange').value;
    const banka_banka_exchange = this.SBPDCLForm.get('banka_banka_exchange').value;
    const banka_sabour_exchange = this.SBPDCLForm.get('banka_sabour_exchange').value;
    const kahalgaon_kahalgaon_exchange = this.SBPDCLForm.get('kahalgaon_kahalgaon_exchange').value;
    const lakhisarai_lakhisarai_exchange = this.SBPDCLForm.get('lakhisarai_lakhisarai_exchange').value;
    const lakhisarai_jamui_exchange = this.SBPDCLForm.get('lakhisarai_jamui_exchange').value;
    const tenughat_bihar_sharif_exchange = this.SBPDCLForm.get('tenughat_bihar_sharif_exchange').value;
    const japla_sonenagar_exchange = this.SBPDCLForm.get('japla_sonenagar_exchange').value;
    const lalmatia_kahalgaon_exchange = this.SBPDCLForm.get('lalmatia_kahalgaon_exchange').value;
    const sultanganj_deoghar_exchange = this.SBPDCLForm.get('sultanganj_deoghar_exchange').value;
    const barhi_rajgir_exchange = this.SBPDCLForm.get('barhi_rajgir_exchange').value;
    const barhi_nalanda_exchange = this.SBPDCLForm.get('barhi_nalanda_exchange').value;
    const bihar_sharif_begusarai_exchange = this.SBPDCLForm.get('bihar_sharif_begusarai_exchange').value;
    const rehand_sone_nagar_exchange = this.SBPDCLForm.get('rehand_sone_nagar_exchange').value;
    const gaya_dehri_exchange = this.SBPDCLForm.get('gaya_dehri_exchange').value;
    const banka_sultanganj_exchange = this.SBPDCLForm.get('banka_sultanganj_exchange').value;
    const kahalgaon_sabour_exchange = this.SBPDCLForm.get('kahalgaon_sabour_exchange').value;
    const chandauli_karmnasa_exchange = this.SBPDCLForm.get('chandauli_karmnasa_exchange').value;
    const sahupuri_karmnasa_exchange = this.SBPDCLForm.get('sahupuri_karmnasa_exchange').value;
    // end
    total1 = bihar_sharif_exchange + patna_sipara_exchange + patna_fatuha_exchange + patna_khagual_exchange
    + pusauli_nadokhar_exchange + pusauli_dehri_exchange + gaya_dehri_exchange + gaya_bodhgaya_exchange +
    gaya_khizasarai_exchange + gaya_sonenagar_exchange + banka_banka_exchange + banka_sabour_exchange + 
    banka_sultanganj_exchange + kahalgaon_sabour_exchange + kahalgaon_kahalgaon_exchange + lakhisarai_lakhisarai_exchange
    + lakhisarai_jamui_exchange + tenughat_bihar_sharif_exchange + japla_sonenagar_exchange + lalmatia_kahalgaon_exchange
    + sultanganj_deoghar_exchange + barhi_rajgir_exchange + barhi_nalanda_exchange + bihar_sharif_begusarai_exchange +
    rehand_sone_nagar_exchange + chandauli_karmnasa_exchange + sahupuri_karmnasa_exchange;
    // end
    const net_power_drawal_cs_exchange = this.SBPDCLForm.get('net_power_drawal_cs_exchange');
    net_power_drawal_cs_exchange.setValue(parseFloat(total1.toFixed(2)
      ));
    // end
    const Net_Power_Drawal_CS_Exchange = this.SBPDCLForm.get('net_power_drawal_cs_exchange').value;
    const Net_Power_Exchange = this.NBPDCLForm.get('net_power_exchange').value;
    total2 = total1 + Net_Power_Exchange;
    const net_power_drawal_bihar_exchange = this.SBPDCLForm.get('net_power_drawal_bihar_exchange');
    net_power_drawal_bihar_exchange.setValue(parseFloat(total2.toFixed(2)));
    // end
    total3 = rehand_sone_nagar_exchange + chandauli_karmnasa_exchange + sahupuri_karmnasa_exchange;
    const NR_CS_power_exchange = this.SystemReportNetForm.get('NR_CS_power_exchange');
    NR_CS_power_exchange.setValue(parseFloat(total3.toFixed(2)));
    // end
    const schedule_exchange = this.SBPDCLForm.get('schedule_exchange').value;
    const NR_CS_Power_Exchange = this.SystemReportNetForm.get('NR_CS_power_exchange').value;
    total4 = total2 - total3;
    const Central_Sector_Bilateral_Energy = this.SystemReportNetForm.get('central_sector_bilateral_energy');
    Central_Sector_Bilateral_Energy.setValue(parseFloat(total4.toFixed(2)));
    // end
    total5 = total3 + total4;
    const central_sector_bilateral_power = this.SystemReportNetForm.get('central_sector_bilateral_power');
    central_sector_bilateral_power.setValue(parseFloat(total5.toFixed(2)));
    // end;
    const bspgcl_gen = this.SystemReportForm.get('BSPGCL_GEN').value;
    const kbunl_stage_1 = this.SystemReportForm.get('KBUNL_STAGE_1').value;
    const total_solar_power_import = this.SolarPowerGenerationForm.get('total_solar_power_import').value;
    const sugar_mill_gen_97_import = this.SugarMillsGenerationForm.get('sugar_mill_gen_97_import').value;
    total6 = ( bspgcl_gen + sugar_mill_gen_97_import
      + total_solar_power_import + kbunl_stage_1 + total5);
    const total_demand_met_energy = this.SystemReportNetForm.get('total_demand_met_energy');
    total_demand_met_energy.setValue(parseFloat(total6.toFixed(2)));
    // end
    const demand_met_exchange = this.SBPDCLForm.get('demand_met_exchange');
    demand_met_exchange.setValue(parseFloat(total6.toFixed(2)));
    //end
    const glat_spp_import = this.SolarPowerGenerationForm.get('glat_spp_import').value;
    const response_spp_import = this.SolarPowerGenerationForm.get('response_spp_import').value;
    total7 = total1 + glat_spp_import + response_spp_import;
    const total_demand_met_SBPDCL = this.SystemReportNetForm.get('total_demand_met_SBPDCL');
    total_demand_met_SBPDCL.setValue(parseFloat(total7.toFixed(2)));
    // end
    const ERLDC_Schedule_energy = this.SystemReportNetForm.get('ERLDC_Schedule_energy');
    ERLDC_Schedule_energy.setValue(schedule_exchange);
    // end
    total8 = total2 - schedule_exchange;
    const energy_ui_energy = this.SystemReportNetForm.get('energy_ui_energy');
    energy_ui_energy.setValue(parseFloat(total8.toFixed(2)));
    // end
    const Sugar_Mills_Total = this.SugarMillsGenerationForm.get('sugar_mill_gen_97_import').value;
    const Total_Solar_Power_Import = this.SolarPowerGenerationForm.get('total_solar_power_import').value;
    const kbunl_generation = this.SystemReportForm.get('KBUNL_GENERATION').value;
    const kbunl_stage_2 = this.SystemReportForm.get('KBUNL_STAGE_2').value;
    total9 = (schedule_exchange + bspgcl_gen + kbunl_generation + Sugar_Mills_Total
              + Total_Solar_Power_Import - kbunl_stage_2) * 0.46;
    const drawal_exchange = this.NBPDCLForm.get('drawal_exchange');
    drawal_exchange.setValue(parseFloat(total9.toFixed(2)));
    // end
    total10 = (schedule_exchange + bspgcl_gen + kbunl_generation + Sugar_Mills_Total
      + Total_Solar_Power_Import - kbunl_stage_2) * 0.54;
    const net_schedule_exchange = this.SBPDCLForm.get('net_schedule_exchange');
    net_schedule_exchange.setValue(parseFloat(total10.toFixed(2)));
    // end
  }
  bindSBPDCLTieLinesExchangeData() {
    this.SBPDCLForm = this.formBuilder.group({
      bihar_sharif_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.bihar_sharif_import : null,
        disabled: false
      }, ],
      bihar_sharif_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.bihar_sharif_export : null,
        disabled: false
      }, ],
      bihar_sharif_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.bihar_sharif_exchange : null,
        disabled: false
      }, ],
      patna_sipara_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.patna_sipara_import : null,
        disabled: false
      }, ],
      patna_sipara_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.patna_sipara_export : null,
        disabled: false
      }, ],
      patna_sipara_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.patna_sipara_exchange : null,
        disabled: false
      }, ],
      patna_fatuha_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.patna_fatuha_import : null,
        disabled: false
      }, ],
      patna_fatuha_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.patna_fatuha_export : null,
        disabled: false
      }, ],
      patna_fatuha_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.patna_fatuha_exchange : null,
        disabled: false
      }, ],
      patna_khagaul_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.patna_khagaul_import : null,
        disabled: false
      }, ],
      patna_khagaul_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.patna_khagaul_export : null,
        disabled: false
      }, ],
      patna_khagual_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.patna_khagual_exchange : null,
        disabled: true
      }, ],
      pusauli_nadokhar_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.pusauli_nadokhar_import : null,
        disabled: false
      }, ],
      pusauli_nadokhar_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.pusauli_nadokhar_export : null,
        disabled: false
      }, ],
      pusauli_nadokhar_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.pusauli_nadokhar_exchange : null,
        disabled: true
      }, ],
      pusauli_dehri_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.pusauli_dehri_import : null,
        disabled: false
      }, ],
      pusauli_dehri_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.pusauli_dehri_export : null,
        disabled: false
      }, ],
      pusauli_dehri_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.pusauli_dehri_exchange : null,
        disabled: true
      }, ],
      gaya_dehri_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.gaya_dehri_import : null,
        disabled: false
      }, ],
      gaya_dehri_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.gaya_dehri_export : null,
        disabled: false
      }, ],
      gaya_dehri_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.gaya_dehri_exchange : null,
        disabled: false
      }, ],
      gaya_bodhgaya_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.gaya_bodhgaya_import : null,
        disabled: false
      },  ],
      gaya_bodhgaya_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.gaya_bodhgaya_export : null,
        disabled: false
      }, ],
      gaya_bodhgaya_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.gaya_bodhgaya_exchange : null,
        disabled: false
      }, ],
      gaya_khizasarai_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.gaya_khizasarai_import : null,
        disabled: false
      }, ],
      gaya_khizasarai_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.gaya_khizasarai_export : null,
        disabled: false
      }, ],
      gaya_khizasarai_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.gaya_khizasarai_exchange : null,
        disabled: false
      }, ],
      gaya_sonenagar_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.gaya_sonenagar_import : null,
        disabled: false
      }, ],
      gaya_sonenagar_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.gaya_sonenagar_export : null,
        disabled: false
      }, ],
      gaya_sonenagar_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.gaya_sonenagar_exchange : null,
        disabled: false
      }, ],
      banka_banka_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.banka_banka_import : null,
        disabled: false
      }, ],
      banka_banka_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.banka_banka_export : null,
        disabled: false
      }, ],
      banka_banka_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.banka_banka_exchange : null,
        disabled: true
      }, ],
      banka_sabour_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.banka_sabour_import : null,
        disabled: false
      }, ],
      banka_sabour_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.banka_banka_export : null,
        disabled: false
      }, ],
      banka_sabour_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.banka_sabour_exchange : null,
        disabled: true
      }, ],
      banka_sultanganj_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.banka_sultanganj_import : null,
        disabled: false
      }, ],
      banka_sultanganj_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.banka_sultanganj_export : null,
        disabled: false
      }, ],
      banka_sultanganj_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.banka_sultanganj_exchange : null,
        disabled: true
      }, ],
      kahalgaon_sabour_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.kahalgaon_sabour_import : null,
        disabled: false
      }, ],
      kahalgaon_sabour_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.kahalgaon_sabour_export : null,
        disabled: false
      }, ],
      kahalgaon_sabour_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.kahalgaon_sabour_exchange : null,
        disabled: false
      }, ],
      kahalgaon_kahalgaon_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.kahalgaon_kahalgaon_import : null,
        disabled: false
      }, ],
      kahalgaon_kahalgaon_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.kahalgaon_kahalgaon_export : null,
        disabled: false
      },  ],
      kahalgaon_kahalgaon_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.kahalgaon_kahalgaon_exchange : null,
        disabled: false
      },  ],
      lakhisarai_lakhisarai_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.lakhisarai_lakhisarai_import : null,
        disabled: false
      },  ],
      lakhisarai_lakhisarai_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.lakhisarai_lakhisarai_export : null,
        disabled: false
      },  ],
      lakhisarai_lakhisarai_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.lakhisarai_lakhisarai_exchange : null,
        disabled: true
      },  ],
      lakhisarai_jamui_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.lakhisarai_jamui_import : null,
        disabled: false
      },  ],
      lakhisarai_jamui_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.lakhisarai_jamui_export : null,
        disabled: false
      },  ],
      lakhisarai_jamui_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.lakhisarai_lakhisarai_exchange : null,
        disabled: true
      },  ],
      tenughat_bihar_sharif_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.tenughat_bihar_sharif_import : null,
        disabled: false
      },  ],
      tenughat_bihar_sharif_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.tenughat_bihar_sharif_export : null,
        disabled: false
      },  ],
      tenughat_bihar_sharif_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.tenughat_bihar_sharif_exchange : null,
        disabled: false
      },  ],
      japla_sonenagar_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.japla_sonenagar_import : null,
        disabled: false
      },  ],
      japla_sonenagar_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.japla_sonenagar_export : null,
        disabled: false
      },  ],
      japla_sonenagar_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.japla_sonenagar_exchange : null,
        disabled: false
      },  ],
      lalmatia_kahalgaon_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.lalmatia_kahalgaon_import : null,
        disabled: false
      },  ],
      lalmatia_kahalgaon_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.lalmatia_kahalgaon_export : null,
        disabled: false
      }, ],
      lalmatia_kahalgaon_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.lalmatia_kahalgaon_exchange : null,
        disabled: false
      }, ],
      sultanganj_deoghar_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.sultanganj_deoghar_import : null,
        disabled: false
      }, ],
      sultanganj_deoghar_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.sultanganj_deoghar_export : null,
        disabled: false
      }, ],
      sultanganj_deoghar_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.sultanganj_deoghar_exchange : null,
        disabled: false
      }, ],
      barhi_rajgir_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.barhi_rajgir_import : null,
        disabled: false
      }, ],
      barhi_rajgir_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.barhi_rajgir_export : null,
        disabled: false
      }, ],
      barhi_rajgir_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.barhi_rajgir_exchange : null,
        disabled: false
      }, ],
      barhi_nalanda_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.barhi_nalanda_import : null,
        disabled: false
      }, ],
      barhi_nalanda_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.barhi_nalanda_export : null,
        disabled: false
      }, ],
      barhi_nalanda_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.barhi_nalanda_exchange : null,
        disabled: false
      }, ],
      bihar_sharif_begusarai_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.bihar_sharif_begusarai_import : null,
        disabled: false
      }, ],
      bihar_sharif_begusarai_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.bihar_sharif_begusarai_export : null,
        disabled: false
      }, ],
      bihar_sharif_begusarai_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.bihar_sharif_begusarai_exchange : null,
        disabled: true
      }, ],
      rehand_sone_nagar_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.rehand_sone_nagar_import : null,
        disabled: false
      }, ],
      rehand_sone_nagar_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.rehand_sone_nagar_export : null,
        disabled: false
      }, ],
      rehand_sone_nagar_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.rehand_sone_nagar_exchange : null,
        disabled: false
      }, ],
      chandauli_karmnasa_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.chandauli_karmnasa_import : null,
        disabled: false
      }, ],
      chandauli_karmnasa_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.chandauli_karmnasa_export : null,
        disabled: false
      }, ],
      chandauli_karmnasa_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.chandauli_karmnasa_exchange : null,
        disabled: false
      }, ],
      sahupuri_karmnasa_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.sahupuri_karmnasa_import : null,
        disabled: false
      }, ],
      sahupuri_karmnasa_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.sahupuri_karmnasa_export : null,
        disabled: false
      }, ],
      sahupuri_karmnasa_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.sahupuri_karmnasa_exchange : null,
        disabled: false
      }, ],
      net_power_drawal_cs_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.net_power_drawal_cs_import : null,
        disabled: true
      }, ],
      net_power_drawal_cs_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.net_power_drawal_cs_export : null,
        disabled: true
      },  ],
      net_power_drawal_cs_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.net_power_drawal_cs_exchange : null,
        disabled: false
      }, ],
      net_schedule_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.net_schedule_import : null,
        disabled: true
      }, ],
      net_schedule_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.net_schedule_export : null,
        disabled: true
      }, ],
      net_schedule_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.net_schedule_exchange : null,
        disabled: true
      }, ],
      net_power_drawal_bihal_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.net_power_drawal_bihal_import : null,
        disabled: true
      }, ],
      net_power_drawal_bihar_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.net_power_drawal_bihar_export : null,
        disabled: true
      }, ],
      net_power_drawal_bihar_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.net_power_drawal_bihar_exchange : null,
        disabled: true
      }, ],
      schedule_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.schedule_import : null,
        disabled: false
      }, ],
      schedule_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.schedule_export : null,
        disabled: false
      }, ],
      schedule_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.schedule_exchange : null,
        disabled: false
      }, ],
      demand_met_import: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.demand_met_import : null,
        disabled: true
      }, ],
      demand_met_export: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.demand_met_export : null,
        disabled: true
      }, ],
      demand_met_exchange: [{
        value: this.SBPDCLTieLinesExchange ? this.SBPDCLTieLinesExchange.demand_met_exchange : null,
        disabled: true
      }, ],
    });
    this.onChangesSBPDCLTieLinesExchange();
  }
  onChangesKhagaul() {
    this.KhagaulForm.get('BSPTCL_1').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateKhagaul();
      });
    this.KhagaulForm.get('BGCL_2').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateKhagaul();
      });
    this.KhagaulForm.get('BGCL_3').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateKhagaul();
      });
  }
  calculateKhagaul() {
    let total = 0;
    const BSPTCL_1 = this.KhagaulForm.get('BSPTCL_1').value;
    const BGCL_2 = this.KhagaulForm.get('BGCL_2').value;
    const BGCL_3 = this.KhagaulForm.get('BGCL_3').value;
    total = BSPTCL_1 + BGCL_2 + BGCL_3;
    const Total = this.KhagaulForm.get('Total');
    Total.setValue(parseFloat(total.toFixed(2)));
    const patna_khagual_exchange = this.SBPDCLForm.get('patna_khagual_exchange');
    patna_khagual_exchange.setValue(parseFloat(total.toFixed(2)));
  }
  bindKhagaulData() {
    this.KhagaulForm = this.formBuilder.group({
      BSPTCL_1: [{
        value: this.khagaul ? this.khagaul.BSPTCL_1 : null,
        disabled: false
      }, ],
      BGCL_2: [{
        value: this.khagaul ? this.khagaul.BGCL_2 : null,
        disabled: false
      }, ],
      BGCL_3: [{
        value: this.khagaul ? this.khagaul.BGCL_3 : null,
        disabled: false
      }, ],
      Total: [{
        value: this.khagaul ? this.khagaul.Total : null,
        disabled: true
      }, ],
    });
    this.onChangesKhagaul();
  }
  onChangesMisc() {
    if (this.MiscellaneousForm) {
      this.MiscellaneousForm.get('lakhisarai_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();
      });
      this.MiscellaneousForm.get('lakhisarai_export').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();
      });
      this.MiscellaneousForm.get('jamui_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();
      });
      this.MiscellaneousForm.get('jamui_export').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();
      });
      this.MiscellaneousForm.get('pusauli_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();
      });
      this.MiscellaneousForm.get('pusauli_export').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();
      });
      this.MiscellaneousForm.get('dehri_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();
      });
      this.MiscellaneousForm.get('dehri_export').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();
      });
      this.MiscellaneousForm.get('pur_beg_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();
      });
      this.MiscellaneousForm.get('pur_beg_export').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();

      });
      this.MiscellaneousForm.get('banka_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();

      });
      this.MiscellaneousForm.get('banka_export').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();

      });
      this.MiscellaneousForm.get('sabour_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();

      });
      this.MiscellaneousForm.get('sabour_export').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();

      });
      this.MiscellaneousForm.get('sultanganj_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();

      });
      this.MiscellaneousForm.get('sultanganj_export').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();

      });
      this.MiscellaneousForm.get('kaffain_import').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();

      });
      this.MiscellaneousForm.get('kaffain_export').valueChanges.
      pipe(takeWhile(() => !this.destroying)).
      subscribe(data => {
        this.calculateMisc();

      });
    }
  }
  calculateMisc() {
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;
    let total4 = 0;
    let total5 = 0;
    let total6 = 0;
    let total7 = 0;
    let total8 = 0;
    let total9 = 0;
    const lakhisarai_import = this.MiscellaneousForm.get('lakhisarai_import').value;
    const lakhisarai_export = this.MiscellaneousForm.get('lakhisarai_export').value;
    const jamui_import = this.MiscellaneousForm.get('jamui_import').value;
    const jamui_export = this.MiscellaneousForm.get('jamui_export').value;
    const pusauli_import = this.MiscellaneousForm.get('pusauli_import').value;
    const pusauli_export = this.MiscellaneousForm.get('pusauli_export').value;
    const dehri_import = this.MiscellaneousForm.get('dehri_import').value;
    const dehri_export = this.MiscellaneousForm.get('dehri_export').value;
    const pur_beg_import = this.MiscellaneousForm.get('pur_beg_import').value;
    const pur_beg_export = this.MiscellaneousForm.get('pur_beg_export').value;
    const banka_import = this.MiscellaneousForm.get('banka_import').value;
    const banka_export = this.MiscellaneousForm.get('banka_export').value;
    const sabour_import = this.MiscellaneousForm.get('sabour_import').value;
    const sabour_export = this.MiscellaneousForm.get('sabour_export').value;
    const sultanganj_import = this.MiscellaneousForm.get('sultanganj_import').value;
    const sultanganj_export = this.MiscellaneousForm.get('sultanganj_export').value;
    const kaffain_import = this.MiscellaneousForm.get('kaffain_import').value;
    const kaffain_export = this.MiscellaneousForm.get('kaffain_export').value;
    // end
    total1 = lakhisarai_import + lakhisarai_export;
    const lakhisarai_exchange = this.MiscellaneousForm.get('lakhisarai_exchange');
    lakhisarai_exchange.setValue(parseFloat(total1.toFixed(2)));
    // end
    const lakhisarai_lakhisarai_exchange = this.SBPDCLForm.get('lakhisarai_lakhisarai_exchange');
    lakhisarai_lakhisarai_exchange.setValue(parseFloat(total1.toFixed(2)));
    // end
    total2 = jamui_import + jamui_export;
    const jamui_exchange = this.MiscellaneousForm.get('jamui_exchange');
    jamui_exchange.setValue(parseFloat(total2.toFixed(2)));
    // end
    const lakhisarai_jamui_exchange = this.SBPDCLForm.get('lakhisarai_jamui_exchange');
    lakhisarai_jamui_exchange.setValue((parseFloat(total2.toFixed(2))));
    // end
    total3 = pusauli_import + pusauli_export;
    const pusauli_exchange = this.MiscellaneousForm.get('pusauli_exchange');
    pusauli_exchange.setValue(parseFloat(total3.toFixed(2)));
    // end
    const pusauli_nadokhar_exchange = this.SBPDCLForm.get('pusauli_nadokhar_exchange');
    pusauli_nadokhar_exchange.setValue(parseFloat(total3.toFixed(2)));
    // end
    total4 = dehri_import + dehri_export;
    const dehri_exchange = this.MiscellaneousForm.get('dehri_exchange');
    dehri_exchange.setValue(parseFloat(total4.toFixed(2)));
    // end
    const pusauli_dehri_exchange = this.SBPDCLForm.get('pusauli_dehri_exchange');
    pusauli_dehri_exchange.setValue(parseFloat(total4.toFixed(2)));
    // end
    total5 = pur_beg_import + pur_beg_export;
    const pur_beg_exchange = this.MiscellaneousForm.get('pur_beg_exchange');
    pur_beg_exchange.setValue(parseFloat(total5.toFixed(2)));
    // end
    const purnea_begusarai_exchange = this.NBPDCLForm.get('purnea_begusarai_exchange');
    purnea_begusarai_exchange.setValue(parseFloat(total5.toFixed(2)));
    // end
    total6 = banka_import + banka_export;
    const banka_exchange = this.MiscellaneousForm.get('banka_exchange');
    banka_exchange.setValue(parseFloat(total6.toFixed(2)));
    // end
    const banka_banka_exchange = this.SBPDCLForm.get('banka_banka_exchange');
    banka_banka_exchange.setValue(parseFloat(total6.toFixed(2)));
    // end
    total7 = sabour_import + sabour_export;
    const sabour_exchange = this.MiscellaneousForm.get('sabour_exchange');
    sabour_exchange.setValue(parseFloat(total7.toFixed(2)));
    // end
    const banka_sabour_exchange = this.SBPDCLForm.get('banka_sabour_exchange');
    banka_sabour_exchange.setValue(parseFloat(total7.toFixed(2)));
    // end
    total8 = sultanganj_import + sultanganj_export;
    const sultanganj_exchange = this.MiscellaneousForm.get('sultanganj_exchange');
    sultanganj_exchange.setValue(parseFloat(total8.toFixed(2)));
    // end
    const banka_sultanganj_exchange = this.SBPDCLForm.get('banka_sultanganj_exchange');
    banka_sultanganj_exchange.setValue(parseFloat(total8.toFixed(2)));
    // end
    const muzaffarpur_KBUNL_exchange = this.NBPDCLForm.get('muzaffarpur_KBUNL_exchange');
    muzaffarpur_KBUNL_exchange.setValue(parseFloat(total8.toFixed(2)));
    // end
    total9 = kaffain_import + kaffain_export;
    const kaffain_exchange = this.MiscellaneousForm.get('kaffain_exchange');
    kaffain_exchange.setValue(parseFloat(total9.toFixed(2)));
  }
  bindMisc() {
    this.MiscellaneousForm = this.formBuilder.group({
      lakhisarai_import: [{
        value: this.misc ? this.misc.lakhisarai_import : null,
        disabled: false
      }, ],
      lakhisarai_export: [{
        value: this.misc ? this.misc.lakhisarai_export : null,
        disabled: false
      }, ],
      lakhisarai_exchange: [{
        value: this.misc ? this.misc.lakhisarai_exchange : null,
        disabled: false
      }, ],
      jamui_import: [{
        value: this.misc ? this.misc.jamui_import : null,
        disabled: false
      }, ],
      jamui_export: [{
        value: this.misc ? this.misc.jamui_export : null,
        disabled: false
      }, ],
      jamui_exchange: [{
        value: this.misc ? this.misc.jamui_exchange : null,
        disabled: false
      }, ],
      pusauli_import: [{
        value: this.misc ? this.misc.pusauli_import : null,
        disabled: false
      }, ],
      pusauli_export: [{
        value: this.misc ? this.misc.pusauli_export : null,
        disabled: false
      }, ],
      pusauli_exchange: [{
        value: this.misc ? this.misc.pusauli_exchange : null,
        disabled: false
      }, ],
      dehri_import: [{
        value: this.misc ? this.misc.dehri_import : null,
        disabled: false
      }, ],
      dehri_export: [{
        value: this.misc ? this.misc.dehri_export : null,
        disabled: false
      }, ],
      dehri_exchange: [{
        value: this.misc ? this.misc.dehri_exchange : null,
        disabled: false
      }, ],
      pur_beg_import: [{
        value: this.misc ? this.misc.pur_beg_import : null,
        disabled: false
      }, ],
      pur_beg_export: [{
        value: this.misc ? this.misc.pur_beg_export : null,
        disabled: false
      }, ],
      pur_beg_exchange: [{
        value: this.misc ? this.misc.pur_beg_exchange : null,
        disabled: false
      }, ],
      banka_import: [{
        value: this.misc ? this.misc.banka_import : null,
        disabled: false
      }, ],
      banka_export: [{
        value: this.misc ? this.misc.banka_export : null,
        disabled: false
      }, ],
      banka_exchange: [{
        value: this.misc ? this.misc.banka_exchange : null,
        disabled: false
      }, ],
      sabour_import: [{
        value: this.misc ? this.misc.sabour_import : null,
        disabled: false
      }, ],
      sabour_export: [{
        value: this.misc ? this.misc.sabour_export : null,
        disabled: false
      }, ],
      sabour_exchange: [{
        value: this.misc ? this.misc.sabour_exchange : null,
        disabled: false
      }, ],
      sultanganj_import: [{
        value: this.misc ? this.misc.sultanganj_import : null,
        disabled: false
      }, ],
      sultanganj_export: [{
        value: this.misc ? this.misc.sultanganj_export : null,
        disabled: false
      }, ],
      sultanganj_exchange: [{
        value: this.misc ? this.misc.sultanganj_exchange : null,
        disabled: false
      }, ],
      kaffain_import: [{
        value: this.misc ? this.misc.kaffain_import : null,
        disabled: false
      }, ],
      kaffain_export: [{
        value: this.misc ? this.misc.kaffain_export : null,
        disabled: false
      }, ],
      kaffain_exchange: [{
        value: this.misc ? this.misc.kaffain_exchange : null,
        disabled: false
      }, ],
      nepal_total: [{
        value: this.misc ? this.misc.nepal_total : null,
        disabled: false
      }, ],
    });
    this.onChangesMisc();
  }
  saveConstituentsGeneration() {
    const formData = this.ConstituentsGenerationForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    this.store.dispatch(new AddConstituentsGenerationAction(formData));
    this.ConstituentsGenerationForm.reset();
  }
  onEditConstituentsGeneration(data): void {
    const setObject = {
      Id: data.Id,
      LogbookId: data.LogbookId,
      farakka_load: data.farakka_load,
      talchar_load: data.talchar_load,
      kahalgaon_load: data.kahalgaon_load,
      barh_load: data.barh_load,
      chukha_load: data.chukha_load,
      rangit_load: data.rangit_load,
      tala_load: data.tala_load,
      teesta_load: data.teesta_load,
      WBSEGCL_load: data.WBSEGCL_load,
      GRIDCO_load: data.GRIDCO_load,
      BSPGCL_load: data.BSPGCL_load,
      KBUNL_load: data.KBUNL_load,
      DVC_load: data.DVC_load,
      CESC_load: data.CESC_load,
      JSEB_load: data.JSEB_load,
      kurichu_load: data.kurichu_load
    };
    this.dialogConstituentGenerationData.constituentGenerationData = setObject;
    this.dialogConstituentGenerationData.isdelete = false;
    const ref = this.dialogService.open(ConstituentGenerationComponent,
      {
        data: this.dialogConstituentGenerationData,
        header: 'Edit Constituent Generation',
        width: '50%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((returndata: any) => {
      this.store.dispatch(new UpdateConstituentsGenerationAction(returndata));
    });
  }
  saveNepalFeeders() {
    const formData = this.NepalFeedersForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    formData.nepal_energy = formData.kushaha_1_energy + formData.kushaha_2_energy + formData.raj_biraj_energy
                            + formData.surajpura_energy + formData.jaleshwar_sitamarhi_energy + formData.jaleshwar_sursand_energy
                            + formData.birganj_energy + formData.parwanipur_energy + formData.sirha_energy;
    this.store.dispatch(new AddNepalFeedersAction(formData));
    this.NepalFeedersForm.reset();
  }
  onEditNepalFeeders(data): void {
    const setObject = {
      Id: data.Id,
      LogbookId: data.LogbookId,
      kushaha_1_max_load: data.kushaha_1_max_load,
      kushaha_1_time: data.kushaha_1_time,
      kushaha_1_energy: data.kushaha_1_energy,
      kushaha_2_max_load: data.kushaha_2_max_load,
      kushaha_2_time: data.kushaha_2_time,
      kushaha_2_energy: data.kushaha_2_energy,
      raj_biraj_max_load: data.raj_biraj_max_load,
      raj_biraj_time: data.raj_biraj_time,
      raj_biraj_energy: data.raj_biraj_energy,
      surajpura_max_load: data.surajpura_max_load,
      surajpura_time: data.surajpura_time,
      surajpura_energy: data.surajpura_energy,
      jaleshwar_sitamarhi_max_load: data.jaleshwar_sitamarhi_max_load,
      jaleshwar_sitamarhi_time: data.jaleshwar_sitamarhi_time,
      jaleshwar_sitamarhi_energy: data.jaleshwar_sitamarhi_energy,
      jaleshwar_sursand_max_load: data.jaleshwar_sursand_max_load,
      jaleshwar_sursand_time: data.jaleshwar_sursand_time,
      jaleshwar_sursand_energy: data.jaleshwar_sursand_energy,
      birganj_max_load: data.birganj_max_load,
      birganj_time: data.birganj_time,
      birganj_energy: data.birganj_energy,
      parwanipur_max_load: data.parwanipur_max_load,
      parwanipur_time: data.parwanipur_time,
      parwanipur_energy: data.parwanipur_energy,
      sirha_max_load: data.sirha_max_load,
      sirha_time: data.sirha_time,
      sirha_energy: data.sirha_energy,
      nepal_energy: data.nepal_energy
    };
    this.dialogNepalFeedersData.nepalFeedersData = setObject;
    this.dialogNepalFeedersData.isdelete = false;
    const ref = this.dialogService.open(NepalFeedersComponent,
      {
        data: this.dialogNepalFeedersData,
        header: 'Edit Nepal Feeders',
        width: '50%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((returndata: any) => {
      this.store.dispatch(new UpdateNepalFeedersAction(returndata));
    });
  }
  saveSugarMillsGeneration() {
    const formData = this.SugarMillsGenerationForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    formData.sugar_mill_gen_97_import = formData.bharat_sm_8_import + formData.hari_nagar_sm_14_import + formData.swadeshi_sm_10_import
                            + formData.HPCL_biofuels_lauria_20_import + formData.hasanpur_sm_15_import +
                            formData.HPCL_biofuels_sugauli_20_import;
    this.store.dispatch(new AddSugarMillsGenerationAction(formData));
    this.SugarMillsGenerationForm.reset();
  }
  onEditSugarMills(data): void {
    const setObject = {
      Id: data.Id,
      LogbookId: data.LogbookId,
      bharat_sm_8_time: data.bharat_sm_8_time,
      bharat_sm_8_import: data.bharat_sm_8_import,
      hari_nagar_sm_14_time: data.hari_nagar_sm_14_time,
      hari_nagar_sm_14_import: data.hari_nagar_sm_14_import,
      swadeshi_sm_10_time: data.swadeshi_sm_10_time,
      swadeshi_sm_10_import: data.swadeshi_sm_10_import,
      HPCL_biofuels_lauria_20_time: data.HPCL_biofuels_lauria_20_time,
      HPCL_biofuels_lauria_20_import: data.HPCL_biofuels_lauria_20_import,
      hasanpur_sm_15_time: data.hasanpur_sm_15_time,
      hasanpur_sm_15_import: data.hasanpur_sm_15_import,
      HPCL_biofuels_sugauli_20_time: data.HPCL_biofuels_sugauli_20_time,
      HPCL_biofuels_sugauli_20_import: data.HPCL_biofuels_sugauli_20_import,
      sugar_mill_gen_97_time: data.sugar_mill_gen_97_time,
      sugar_mill_gen_97_import: data.sugar_mill_gen_97_import,
    };
    this.dialogSugarMillsGenerationData.sugarMillsGenerationData = setObject;
    this.dialogSugarMillsGenerationData.isdelete = false;
    const ref = this.dialogService.open(SugarMillsGenerationComponent,
      {
        data: this.dialogSugarMillsGenerationData,
        header: 'Edit Sugar Mills Generation',
        width: '50%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((returndata: any) => {
      this.store.dispatch(new UpdateSugarMillsGenerationAction(returndata));
    });
  }
  saveSolarPowerGeneration() {
    const formData = this.SolarPowerGenerationForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    formData.total_solar_power_import = formData.magadh_spp_import + formData.nalanda_spp_import + formData.bahera_spp_import
                            + formData.savkala_spp_import + formData.sunmark_spp_import + formData.alfa_spp_import
                            + formData.response_spp_import + formData.glat_spp_import + formData.avantika_spp_import +
                              formData.murera_spp_import;
    this.store.dispatch(new AddSolarPowerPlantsAction(formData));
    this.SolarPowerGenerationForm.reset();
  }
  onEditSolarPower(data): void {
    const setObject = {
      Id: data.Id,
      LogbookId: data.LogbookId,
      magadh_spp_time: data.magadh_spp_time,
      magadh_spp_import: data.magadh_spp_import,
      nalanda_spp_time: data.nalanda_spp_time,
      nalanda_spp_import: data.nalanda_spp_import,
      bahera_spp_time: data.bahera_spp_time,
      bahera_spp_import: data.bahera_spp_import,
      savkala_spp_time: data.savkala_spp_time,
      savkala_spp_import: data.savkala_spp_import,
      sunmark_spp_time: data.sunmark_spp_time,
      sunmark_spp_import: data.sunmark_spp_import,
      alfa_spp_time: data.alfa_spp_time,
      alfa_spp_import: data.alfa_spp_import,
      response_spp_time: data.response_spp_time,
      response_spp_import: data.response_spp_import,
      glat_spp_time: data.glat_spp_time,
      glat_spp_import: data.glat_spp_import,
      avantika_spp_time: data.avantika_spp_time,
      avantika_spp_import: data.avantika_spp_import,
      murera_spp_time: data.murera_spp_time,
      murera_spp_import: data.murera_spp_import,
      total_solar_power_time: data.total_solar_power_time,
      total_solar_power_import: data.total_solar_power_import,
    };
    this.dialogSolarPowerGenerationData.solarPowerGenerationData = setObject;
    this.dialogSolarPowerGenerationData.isdelete = false;
    const ref = this.dialogService.open(SolarPowerGenerationComponent,
      {
        data: this.dialogSolarPowerGenerationData,
        header: 'Edit Solar Power Generation',
        width: '50%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((returndata: any) => {
      this.store.dispatch(new UpdateSolarPowerPlantsAction(returndata));
    });
  }
  saveSystemReport() {
    const formData = this.SystemReportForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    formData.BSPGCL_GEN = formData.BTPS_6 + formData.BTPS_7 + formData.BTPS_8;
    formData.KBUNL_STAGE_1 = formData.KBUNL_1 + formData.KBUNL_2;
    formData.KBUNL_STAGE_2 = formData.KBUNL_3 + formData.KBUNL_4;
    formData.KBUNL_GENERATION = formData.KBUNL_STAGE_1 + formData.KBUNL_STAGE_2;
    this.store.dispatch(new AddSystemReportAction(formData));
    this.SystemReportForm.reset();
  }
  onEditSystemReport(data): void {
    const setObject = {
      Id: data.Id,
      LogbookId: data.LogbookId,
      BTPS_6: data.BTPS_6,
      BTPS_7: data.BTPS_7,
      BTPS_8: data.BTPS_8,
      BSPGCL_GEN: data.BSPGCL_GEN,
      KBUNL_1: data.KBUNL_1,
      KBUNL_2: data.KBUNL_2,
      KBUNL_STAGE_1: data.KBUNL_STAGE_1,
      KBUNL_3: data.KBUNL_3,
      KBUNL_4: data.KBUNL_4,
      KBUNL_STAGE_2: data.KBUNL_STAGE_2,
      KBUNL_GENERATION: data.KBUNL_GENERATION,
    };
    this.dialogSystemReportData.systemReportData = setObject;
    this.dialogSystemReportData.isdelete = false;
    const ref = this.dialogService.open(SystemReportComponent,
      {
        data: this.dialogSystemReportData,
        header: 'Edit System Report',
        width: '50%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((returndata: any) => {
      this.store.dispatch(new UpdateSystemReportAction(returndata));
    });
  }
  saveNBPDCL() {
    const formData = this.NBPDCLForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    this.store.dispatch(new AddNBPDCLTieLinesExchangeAction(formData));
    this.NBPDCLForm.reset();
  }
  onEditNBPDCL(data): void {
    const setObject = {
      Id: data.Id,
      LogbookId: data.LogbookId,
      muzaffarpur_KBUNL_import: data.muzaffarpur_KBUNL_import,
      muzaffarpur_KBUNL_export: data.muzaffarpur_KBUNL_export,
      muzaffarpur_KBUNL_exchange: data.muzaffarpur_KBUNL_exchange,
      KBUNL_ISGS_import: data.KBUNL_ISGS_import,
      KBUNL_ISGS_export: data.KBUNL_ISGS_export,
      KBUNL_ISGS_exchange: data.KBUNL_ISGS_exchange,
      muzaffarpur_hazipur_import: data.muzaffarpur_hazipur_import,
      muzaffarpur_hazipur_export: data.muzaffarpur_hazipur_export,
      muzaffarpur_hazipur_exchange: data.muzaffarpur_hazipur_exchange,
      purnia_madhepura_import: data.purnia_madhepura_import,
      purnia_madhepura_export: data.purnia_madhepura_export,
      purnia_madhepura_exchange: data.purnia_madhepura_exchange,
      purnea_purnea_import: data.purnea_purnea_import,
      purnea_purnea_export: data.purnea_purnea_export,
      purnea_purnea_exchange: data.purnea_purnea_exchange,
      purnia_kisanganj_import: data.purnia_kisanganj_import,
      purnia_kisanganj_export: data.purnia_kisanganj_export,
      purnia_kisanganj_exchange: data.purnia_kisanganj_exchange,
      purnea_begusarai_import: data.purnea_begusarai_import,
      purnea_begusarai_export: data.purnea_begusarai_export,
      purnea_begusarai_exchange: data.purnea_begusarai_exchange,
      kishanganj_kishanganj_import: data.kishanganj_kishanganj_import,
      kishanganj_kishanganj_export: data.kishanganj_kishanganj_export,
      kishanganj_kishanganj_exchange: data.kishanganj_kishanganj_exchange,
      dalkola_baisi_import: data.dalkola_baisi_import,
      dalkola_baisi_export: data.dalkola_baisi_export,
      dalkola_baisi_exchange: data.dalkola_baisi_exchange,
      darbhanga_samastipur_import: data.darbhanga_samastipur_import,
      darbhanga_samastipur_export: data.darbhanga_samastipur_export,
      darbhanga_samastipur_exchange: data.darbhanga_samastipur_exchange,
      darbhanga_motipur_import: data.darbhanga_motipur_import,
      darbhanga_motipur_export: data.darbhanga_motipur_export,
      darbhanga_motipur_exchange: data.darbhanga_motipur_exchange,
      darbhanga_laukahi_import: data.darbhanga_laukahi_import,
      darbhanga_laukahi_export: data.darbhanga_laukahi_export,
      darbhanga_laukahi_exchange: data.darbhanga_laukahi_exchange,
      darbhanga_darbhanga_import: data.darbhanga_darbhanga_import,
      darbhanga_darbhanga_export: data.darbhanga_darbhanga_export,
      darbhanga_darbhanga_exchange: data.darbhanga_darbhanga_exchange,
      motihari_motihari_import: data.motihari_motihari_import,
      motihari_motihari_export: data.motihari_motihari_export,
      motihari_motihari_exchange: data.motihari_motihari_exchange,
      motihari_bettiah_import: data.motihari_bettiah_import,
      motihari_bettiah_export: data.motihari_bettiah_export,
      motihari_bettiah_exchange: data.motihari_bettiah_exchange,
      motihari_raxaul_import: data.motihari_raxaul_import,
      motihari_raxaul_export: data.motihari_raxaul_export,
      motihari_raxaul_exchange: data.motihari_raxaul_exchange,
      bihar_sharif_begusarai_import: data.bihar_sharif_begusarai_import,
      bihar_sharif_begusarai_export: data.bihar_sharif_begusarai_export,
      bihar_sharif_begusarai_exchange: data.bihar_sharif_begusarai_exchange,
      net_power_import: data.net_power_import,
      net_power_export: data.net_power_export,
      net_power_exchange: data.net_power_exchange,
      drawal_import: data.drawal_import,
      drawal_export: data.drawal_export,
      drawal_exchange: data.drawal_exchange,
    };
    this.dialogNBPDCLTieLinesExchangeData.NBPDCLTieLinesExchangeData = setObject;
    this.dialogNBPDCLTieLinesExchangeData.isdelete = false;
    const ref = this.dialogService.open(NBPDCLTieLinesExchangeComponent,
      {
        data: this.dialogNBPDCLTieLinesExchangeData,
        header: 'Edit NBPDCL Tie Lines Exchange',
        width: '50%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((returndata: any) => {
      this.store.dispatch(new UpdateNBPDCLTieLinesExchangeAction(returndata));
    });
  }
  saveSBPDCLTieLinesExchange() {
    const formData = this.SBPDCLForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    this.store.dispatch(new AddSBPDCLTieLinesExchangeAction(formData));
    this.SBPDCLForm.reset();
  }
  onEditSBPDCL(data): void {
    const setObject = {
      Id: data.Id,
      LogbookId: data.LogbookId,
      bihar_sharif_import: data.bihar_sharif_import,
      bihar_sharif_export: data.bihar_sharif_export,
      bihar_sharif_exchange: data.bihar_sharif_exchange,
      patna_sipara_import: data.patna_sipara_import,
      patna_sipara_export: data.patna_sipara_export,
      patna_sipara_exchange: data.patna_sipara_exchange,
      patna_fatuha_import: data.patna_fatuha_import,
      patna_fatuha_export: data.patna_fatuha_export,
      patna_fatuha_exchange: data.patna_fatuha_exchange,
      patna_khagaul_import: data.patna_khagaul_import,
      patna_khagaul_export: data.patna_khagaul_export,
      patna_khagual_exchange: data.patna_khagual_exchange,
      pusauli_nadokhar_import: data.pusauli_nadokhar_import,
      pusauli_nadokhar_export: data.pusauli_nadokhar_export,
      pusauli_nadokhar_exchange: data.pusauli_nadokhar_exchange,
      pusauli_dehri_import: data.pusauli_dehri_import,
      pusauli_dehri_export: data.pusauli_dehri_export,
      pusauli_dehri_exchange: data.pusauli_dehri_exchange,
      gaya_dehri_import: data.gaya_dehri_import,
      gaya_dehri_export: data.gaya_dehri_export,
      gaya_dehri_exchange: data.gaya_dehri_exchange,
      gaya_bodhgaya_import: data.gaya_bodhgaya_import,
      gaya_bodhgaya_export: data.gaya_bodhgaya_export,
      gaya_bodhgaya_exchange: data.gaya_bodhgaya_exchange,
      gaya_khizasarai_import: data.gaya_khizasarai_import,
      gaya_khizasarai_export: data.gaya_khizasarai_export,
      gaya_khizasarai_exchange: data.gaya_khizasarai_exchange,
      gaya_sonenagar_import: data.gaya_sonenagar_import,
      gaya_sonenagar_export: data.gaya_sonenagar_export,
      gaya_sonenagar_exchange: data.gaya_sonenagar_exchange,
      banka_banka_import: data.banka_banka_import,
      banka_banka_export: data.banka_banka_export,
      banka_banka_exchange: data.banka_banka_exchange,
      banka_sabour_import: data.banka_sabour_import,
      banka_sabour_export: data.banka_sabour_export,
      banka_sabour_exchange: data.banka_sabour_exchange,
      banka_sultanganj_import: data.banka_sultanganj_import,
      banka_sultanganj_export: data.banka_sultanganj_export,
      banka_sultanganj_exchange: data.banka_sultanganj_exchange,
      kahalgaon_sabour_import: data.kahalgaon_sabour_import,
      kahalgaon_sabour_export: data.kahalgaon_sabour_export,
      kahalgaon_sabour_exchange: data.kahalgaon_sabour_exchange,
      kahalgaon_kahalgaon_import: data.kahalgaon_kahalgaon_import,
      kahalgaon_kahalgaon_export: data.kahalgaon_kahalgaon_export,
      kahalgaon_kahalgaon_exchange: data.kahalgaon_kahalgaon_exchange,
      lakhisarai_lakhisarai_import: data.lakhisarai_lakhisarai_import,
      lakhisarai_lakhisarai_export: data.lakhisarai_lakhisarai_export,
      lakhisarai_lakhisarai_exchange: data.lakhisarai_lakhisarai_exchange,
      lakhisarai_jamui_import: data.lakhisarai_jamui_import,
      lakhisarai_jamui_export: data.lakhisarai_jamui_export,
      lakhisarai_jamui_exchange: data.lakhisarai_jamui_exchange,
      tenughat_bihar_sharif_import: data.tenughat_bihar_sharif_import,
      tenughat_bihar_sharif_export: data.tenughat_bihar_sharif_export,
      tenughat_bihar_sharif_exchange: data.tenughat_bihar_sharif_exchange,
      japla_sonenagar_import: data.japla_sonenagar_import,
      japla_sonenagar_export: data.japla_sonenagar_export,
      japla_sonenagar_exchange: data.japla_sonenagar_exchange,
      lalmatia_kahalgaon_import: data.lalmatia_kahalgaon_import,
      lalmatia_kahalgaon_export: data.lalmatia_kahalgaon_export,
      lalmatia_kahalgaon_exchange: data.lalmatia_kahalgaon_exchange,
      sultanganj_deoghar_import: data.sultanganj_deoghar_import,
      sultanganj_deoghar_export: data.sultanganj_deoghar_export,
      sultanganj_deoghar_exchange: data.sultanganj_deoghar_exchange,
      barhi_rajgir_import: data.barhi_rajgir_import,
      barhi_rajgir_export: data.barhi_rajgir_export,
      barhi_rajgir_exchange: data.barhi_rajgir_exchange,
      barhi_nalanda_import: data.barhi_nalanda_import,
      barhi_nalanda_export: data.barhi_nalanda_export,
      barhi_nalanda_exchange: data.barhi_nalanda_exchange,
      bihar_sharif_begusarai_import: data.bihar_sharif_begusarai_import,
      bihar_sharif_begusarai_export: data.bihar_sharif_begusarai_export,
      bihar_sharif_begusarai_exchange: data.bihar_sharif_begusarai_exchange,
      rehand_sone_nagar_import: data.rehand_sone_nagar_import,
      rehand_sone_nagar_export: data.rehand_sone_nagar_export,
      rehand_sone_nagar_exchange: data.rehand_sone_nagar_exchange,
      chandauli_karmnasa_import: data.chandauli_karmnasa_import,
      chandauli_karmnasa_export: data.chandauli_karmnasa_export,
      chandauli_karmnasa_exchange: data.chandauli_karmnasa_exchange,
      net_power_drawal_cs_import: data.net_power_drawal_cs_import,
      net_power_drawal_cs_export: data.net_power_drawal_cs_export,
      net_power_drawal_cs_exchange: data.net_power_drawal_cs_exchange,
      net_schedule_import: data.net_schedule_import,
      net_schedule_export: data.net_schedule_export,
      net_schedule_exchange: data.net_schedule_exchange,
      net_power_drawal_bihal_import: data.net_power_drawal_bihal_import,
      net_power_drawal_bihar_export: data.net_power_drawal_bihar_export,
      net_power_drawal_bihar_exchange: data.net_power_drawal_bihar_exchange,
      schedule_import: data.schedule_import,
      schedule_export: data.schedule_export,
      schedule_exchange: data.schedule_exchange,
      demand_met_import: data.demand_met_import,
      demand_met_export: data.demand_met_export,
      demand_met_exchange: data.demand_met_exchange
    };
    this.dialogSBPDCLTieLinesExchangeData.SBPDCLTieLinesExchangeData = setObject;
    this.dialogSBPDCLTieLinesExchangeData.isdelete = false;
    const ref = this.dialogService.open(SBPDCLTieLinesExchangeComponent,
      {
        data: this.dialogSBPDCLTieLinesExchangeData,
        header: 'Edit SBPDCL Tie Lines Exchange',
        width: '50%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((returndata: any) => {
      this.store.dispatch(new UpdateSBPDCLTieLinesExchangeAction(returndata));
    });
  }
  saveMaxMinPower() {
    const formData = this.MaxMinPowerForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    this.store.dispatch(new AddMaxMinPowerAction(formData));
    this.MaxMinPowerForm.reset();
  }
  onEditMaxMinPower(data): void {
    const setObject = {
      Id: data.Id,
      LogbookId: data.LogbookId,
      BTPS_gen_max_power: data.BTPS_gen_max_power,
      BTPS_gen_max_time: data.BTPS_gen_max_time,
      BTPS_gen_min_power: data.BTPS_gen_min_power,
      BTPS_gen_min_time: data.BTPS_gen_min_time,
      KBUNL_gen_max_power: data.KBUNL_gen_max_power,
      KBUNL_gen_max_time: data.KBUNL_gen_max_time,
      KBUNL_gen_min_power: data.KBUNL_gen_min_power,
      KBUNL_gen_min_time: data.KBUNL_gen_min_time,
      sugar_max_power: data.sugar_max_power,
      sugar_max_time: data.sugar_max_time,
      sugar_min_power: data.sugar_min_power,
      sugar_min_time: data.sugar_min_time,
      solar_max_power: data.solar_max_power,
      solar_max_time: data.solar_max_time,
      solar_min_power: data.solar_min_power,
      solar_min_time: data.solar_min_time,
      net_power_max_power: data.net_power_max_power,
      net_power_max_time: data.net_power_max_time,
      net_power_min_power: data.net_power_min_power,
      net_power_min_time: data.net_power_min_time,
      demand_max_power: data.demand_max_power,
      demand_max_time: data.demand_max_time,
      demand_min_power: data.demand_min_power,
      demand_min_time: data.demand_min_time,
      nepal_max_power: data.nepal_max_power,
      nepal_max_time: data.nepal_max_time,
      nepal_min_power: data.nepal_min_power,
      nepal_min_time: data.nepal_min_time
    };
    this.dialogMaxMinPowerData.maxMinPowerData = setObject;
    this.dialogMaxMinPowerData.isdelete = false;
    const ref = this.dialogService.open(MaxMinPowerComponent,
      {
        data: this.dialogMaxMinPowerData,
        header: 'Edit Max Min Power',
        width: '50%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((returndata: any) => {
      this.store.dispatch(new UpdateMaxMinPowerAction(returndata));
    });
  }
  saveSystemReportNet() {
    const formData = this.SystemReportNetForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    this.store.dispatch(new AddSystemReportNetAction(formData));
    this.SystemReportNetForm.reset();
  }
  onEditSystemReportNet(data): void {
    const setObject = {
      Id: data.Id,
      LogbookId: data.LogbookId,
      central_sector_bilateral_energy: data.central_sector_bilateral_energy,
      NR_CS_power_exchange: data.NR_CS_power_exchange,
      total_demand_met_energy: data.total_demand_met_energy,
      total_demand_met_NBPDCL_energy: data.total_demand_met_NBPDCL_energy,
      total_demand_met_SBPDCL: data.total_demand_met_SBPDCL,
      ERLDC_Schedule_energy: data.ERLDC_Schedule_energy,
      energy_ui_energy: data.energy_ui_energy,
      average_frequency: data.average_frequency,
    };
    this.dialogSystemReportNetData.systemReportNetData = setObject;
    this.dialogSystemReportNetData.isdelete = false;
    const ref = this.dialogService.open(SystemReportNetComponent,
      {
        data: this.dialogSystemReportNetData,
        header: 'Edit System Report Net',
        width: '50%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((returndata: any) => {
      this.store.dispatch(new UpdateSystemReportNetAction(returndata));
    });
  }
  saveKhagaul() {
    const formData = this.KhagaulForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    formData.Total = formData.BSPTCL_1 + formData.BGCL_2 + formData.BGCL_3;
    this.store.dispatch(new AddKhagaulAction(formData));
    this.KhagaulForm.reset();
  }
  onEditKhagaul(data): void {
    const setObject = {
      Id: data.Id,
      LogbookId: data.LogbookId,
      BSPTCL_1: data.BSPTCL_1,
      BGCL_2: data.BGCL_2,
      BGCL_3: data.BGCL_3,
      Total: data.Total,
    };
    this.dialogKhagaulData.khagaulData = setObject;
    this.dialogKhagaulData.isdelete = false;
    const ref = this.dialogService.open(KhagaulComponent,
      {
        data: this.dialogKhagaulData,
        header: 'Edit Khagaul',
        width: '50%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((returndata: any) => {
      this.store.dispatch(new UpdateKhagaulAction(returndata));
    });
  }
  saveMisc() {
    const formData = this.MiscellaneousForm.getRawValue();
    formData.LogbookId = this.currLogbookData.RequestId;
    this.store.dispatch(new AddMiscAction(formData));
    this.MiscellaneousForm.reset();
  }
  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.destroying = true;
  }
}
