import { AsyncRequestModel } from '../shared/models/async-request.model';
import { LogbookConstituentsGeneration} from 'src/app/e-logbook/models/ConstituentsGeneration.model';
import { LogbookNepalFeeder } from '../e-logbook/models/NepalFeeder.model';
import { LogbookSugarMills } from '../e-logbook/models/SugarMills.model';
import { LogbookSolarPower } from '../e-logbook/models/SolarPower.model';
import { LogbookSystemReport } from '../e-logbook/models/SystemReport.model';
import { LogbookNBPDCLTieLineExchange } from '../e-logbook/models/NBPDCLTieLineExchange.model';
import { LogbookSBPDCLTieLineExchange } from '../e-logbook/models/SBPDCLTieLineExchange.model';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { LogbookMaxMinPowerDetails } from '../e-logbook/models/MaxMinPowerDetails.model';
import { LogbookSystemReportNet } from '../e-logbook/models/SystemReportNet.model';
import { LogbookKhagaul } from '../e-logbook/models/Khagaul.model';
import { LogbookMisc } from '../e-logbook/models/Misc.model';


export interface EnergySheetStoreData extends AsyncRequestModel {
    constituentsGenerationValueData: LogbookConstituentsGeneration;
    nepalFeedersValueData: LogbookNepalFeeder;
    sugarMillsGenerationValueData: LogbookSugarMills;
    solarPowerPlantsValueData: LogbookSolarPower;
    maxMinPowerValueData: LogbookMaxMinPowerDetails;
    systemReportValueData: LogbookSystemReport;
    systemReportNetValueData: LogbookSystemReportNet;
    NBPDCLTieLinesExchangeValueData: LogbookNBPDCLTieLineExchange;
    SBPDCLTieLinesExchangeValueData: LogbookSBPDCLTieLineExchange;
    KhagaulValueData: LogbookKhagaul;
    miscValueData: LogbookMisc;
}

export const INITIAL_ENERGYSHEET_STORE: EnergySheetStoreData = {
    constituentsGenerationValueData: null,
    nepalFeedersValueData: null,
    sugarMillsGenerationValueData: null,
    solarPowerPlantsValueData: null,
    maxMinPowerValueData: null,
    systemReportValueData: null,
    systemReportNetValueData: null,
    NBPDCLTieLinesExchangeValueData: null,
    SBPDCLTieLinesExchangeValueData: null,
    KhagaulValueData: null,
    miscValueData: null,
    error: null,
    pending: false,
    issued: false
};
