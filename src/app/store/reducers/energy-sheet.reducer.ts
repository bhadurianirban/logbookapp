import { EnergySheetStoreData, INITIAL_ENERGYSHEET_STORE } from '../energy-sheet.store';

import { LogbookConstituentsGenerationActionsUnion, ConstituentsGenerationActions, LogbookNepalFeedersActionsUnion,
         NepalFeedersActions, LogbookSugarMillsGenerationActionsUnion, SugarMillsGenerationActions,
         LogbookSolarPowerPlantsActionsUnion, SolarPowerPlantsActions, SystemReportActions,
         LogbookSystemReportActionsUnion, LogbookNBPDCLTieLinesExchangeActionsUnion,
         NBPDCLTieLinesExchangeActions, LogbookSBPDCLTieLinesExchangeActionsUnion, SBPDCLTieLinesExchangeActions,
         LogbookMaxMinPowerActionsUnion, MaxMinPowerActions, LogbookSystemReportNetActionsUnion, SystemReportNetActions,
         KhagaulActions, LogbookKhagaulActionsUnion, MiscActions, LogbookMiscActionsUnion} from '../actions';
import { handleAddConstituentGenerationSuccessAction } from './logbook-constituent-generation.reducer';

// tslint:disable-next-line: max-line-length
export function EnergySheetReducer(state: EnergySheetStoreData = INITIAL_ENERGYSHEET_STORE, action: LogbookConstituentsGenerationActionsUnion |
                                                                                                    LogbookNepalFeedersActionsUnion |
          // tslint:disable-next-line: max-line-length
                                                                                                    LogbookSugarMillsGenerationActionsUnion| LogbookSolarPowerPlantsActionsUnion|LogbookSystemReportActionsUnion|
                                                                                                LogbookNBPDCLTieLinesExchangeActionsUnion|
                                                                                                LogbookSBPDCLTieLinesExchangeActionsUnion|
                                                                                                LogbookMaxMinPowerActionsUnion|
                                                                                                LogbookSystemReportNetActionsUnion|
                                                                                                LogbookKhagaulActionsUnion|
                                                                                                LogbookMiscActionsUnion ) {
    switch (action.type) {
        case ConstituentsGenerationActions.GET_CONSTITUENTS_GENERATION_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case ConstituentsGenerationActions.GET_CONSTITUENTS_GENERATION_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { constituentsGenerationValueData: action.payload });
        case ConstituentsGenerationActions.GET_CONSTITUENTS_GENERATION_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case ConstituentsGenerationActions.ADD_CONSTITUENTS_GENERATION_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case ConstituentsGenerationActions.ADD_CONSTITUENTS_GENERATION_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { constituentsGenerationValueData: action.payload });
        case ConstituentsGenerationActions.ADD_CONSTITUENTS_GENERATION_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case ConstituentsGenerationActions.UPDATE_CONSTITUENTS_GENERATION_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case ConstituentsGenerationActions.UPDATE_CONSTITUENTS_GENERATION_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { constituentsGenerationValueData: action.payload });
        case ConstituentsGenerationActions.UPDATE_CONSTITUENTS_GENERATION_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case NepalFeedersActions.GET_NEPAL_FEEDERS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case NepalFeedersActions.GET_NEPAL_FEEDERS_SUCCESS:
            return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null
        }, { nepalFeedersValueData: action.payload });
        case NepalFeedersActions.GET_NEPAL_FEEDERS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case NepalFeedersActions.ADD_NEPAL_FEEDERS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case NepalFeedersActions.ADD_NEPAL_FEEDERS_SUCCESS:
            return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null
        }, { nepalFeedersValueData: action.payload });
        case NepalFeedersActions.ADD_NEPAL_FEEDERS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case NepalFeedersActions.UPDATE_NEPAL_FEEDERS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case NepalFeedersActions.UPDATE_NEPAL_FEEDERS_SUCCESS:
            return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null
        }, { nepalFeedersValueData: action.payload });
        case NepalFeedersActions.UPDATE_NEPAL_FEEDERS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case SugarMillsGenerationActions.GET_SUGAR_MILLS_GENERATION_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case SugarMillsGenerationActions.GET_SUGAR_MILLS_GENERATION_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { sugarMillsGenerationValueData: action.payload });
        case SugarMillsGenerationActions.GET_SUGAR_MILLS_GENERATION_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case SugarMillsGenerationActions.ADD_SUGAR_MILLS_GENERATION_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case SugarMillsGenerationActions.ADD_SUGAR_MILLS_GENERATION_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { sugarMillsGenerationValueData: action.payload });
        case SugarMillsGenerationActions.ADD_SUGAR_MILLS_GENERATION_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case SolarPowerPlantsActions.GET_SOLAR_POWER_PLANTS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case SolarPowerPlantsActions.GET_SOLAR_POWER_PLANTS_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { solarPowerPlantsValueData: action.payload });
        case SolarPowerPlantsActions.GET_SOLAR_POWER_PLANTS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case SugarMillsGenerationActions.UPDATE_SUGAR_MILLS_GENERATION_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case SugarMillsGenerationActions.UPDATE_SUGAR_MILLS_GENERATION_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { sugarMillsGenerationValueData: action.payload });
        case SugarMillsGenerationActions.UPDATE_SUGAR_MILLS_GENERATION_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case SolarPowerPlantsActions.ADD_SOLAR_POWER_PLANTS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case SolarPowerPlantsActions.ADD_SOLAR_POWER_PLANTS_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { solarPowerPlantsValueData: action.payload });
        case SolarPowerPlantsActions.ADD_SOLAR_POWER_PLANTS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case SolarPowerPlantsActions.UPDATE_SOLAR_POWER_PLANTS_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case SolarPowerPlantsActions.UPDATE_SOLAR_POWER_PLANTS_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { solarPowerPlantsValueData: action.payload });
        case SolarPowerPlantsActions.UPDATE_SOLAR_POWER_PLANTS_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case SystemReportActions.GET_SYSTEM_REPORT_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case SystemReportActions.GET_SYSTEM_REPORT_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { systemReportValueData: action.payload });
        case SystemReportActions.GET_SYSTEM_REPORT_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case SystemReportActions.ADD_SYSTEM_REPORT_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case SystemReportActions.ADD_SYSTEM_REPORT_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { systemReportValueData: action.payload });
        case SystemReportActions.ADD_SYSTEM_REPORT_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case SystemReportActions.UPDATE_SYSTEM_REPORT_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case SystemReportActions.UPDATE_SYSTEM_REPORT_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { systemReportValueData: action.payload });
        case SystemReportActions.UPDATE_SYSTEM_REPORT_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case NBPDCLTieLinesExchangeActions.GET_NBPDCL_TIE_LINES_EXCHANGE_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case NBPDCLTieLinesExchangeActions.GET_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: null
                }, { NBPDCLTieLinesExchangeValueData: action.payload });
            case NBPDCLTieLinesExchangeActions.GET_NBPDCL_TIE_LINES_EXCHANGE_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });
            case NBPDCLTieLinesExchangeActions.ADD_NBPDCL_TIE_LINES_EXCHANGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case NBPDCLTieLinesExchangeActions.ADD_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { NBPDCLTieLinesExchangeValueData: action.payload });
        case NBPDCLTieLinesExchangeActions.ADD_NBPDCL_TIE_LINES_EXCHANGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case NBPDCLTieLinesExchangeActions.UPDATE_NBPDCL_TIE_LINES_EXCHANGE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case NBPDCLTieLinesExchangeActions.UPDATE_NBPDCL_TIE_LINES_EXCHANGE_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { NBPDCLTieLinesExchangeValueData: action.payload });
        case NBPDCLTieLinesExchangeActions.UPDATE_NBPDCL_TIE_LINES_EXCHANGE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case SBPDCLTieLinesExchangeActions.GET_SBPDCL_TIE_LINES_EXCHANGE_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case SBPDCLTieLinesExchangeActions.GET_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: null
                }, { SBPDCLTieLinesExchangeValueData: action.payload });
            case SBPDCLTieLinesExchangeActions.GET_SBPDCL_TIE_LINES_EXCHANGE_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });
            case SBPDCLTieLinesExchangeActions.ADD_SBPDCL_TIE_LINES_EXCHANGE_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case SBPDCLTieLinesExchangeActions.ADD_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: null
                }, { SBPDCLTieLinesExchangeValueData: action.payload });
            case SBPDCLTieLinesExchangeActions.ADD_SBPDCL_TIE_LINES_EXCHANGE_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });
                case SBPDCLTieLinesExchangeActions.UPDATE_SBPDCL_TIE_LINES_EXCHANGE_TRY:
                    return Object.assign({}, state, {
                        issued: true,
                        pending: true,
                        error: null
                    });
                case SBPDCLTieLinesExchangeActions.UPDATE_SBPDCL_TIE_LINES_EXCHANGE_SUCCESS:
                    return Object.assign({}, state, {
                        issued: true,
                        pending: false,
                        error: null
                    }, { SBPDCLTieLinesExchangeValueData: action.payload });
                case SBPDCLTieLinesExchangeActions.UPDATE_SBPDCL_TIE_LINES_EXCHANGE_ERROR:
                    return Object.assign({}, state, {
                        issued: true,
                        pending: false,
                        error: action.payload
                    });
                    case MaxMinPowerActions.GET_MAX_MIN_POWER_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case MaxMinPowerActions.GET_MAX_MIN_POWER_SUCCESS:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: null
                }, { maxMinPowerValueData: action.payload });
            case MaxMinPowerActions.GET_MAX_MIN_POWER_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });
                case MaxMinPowerActions.ADD_MAX_MIN_POWER_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case MaxMinPowerActions.ADD_MAX_MIN_POWER_SUCCESS:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: null
                }, { maxMinPowerValueData: action.payload });
            case MaxMinPowerActions.ADD_MAX_MIN_POWER_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });
                case MaxMinPowerActions.UPDATE_MAX_MIN_POWER_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case MaxMinPowerActions.UPDATE_MAX_MIN_POWER_SUCCESS:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: null
                }, { maxMinPowerValueData: action.payload });
            case MaxMinPowerActions.UPDATE_MAX_MIN_POWER_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });
                case SystemReportNetActions.GET_SYSTEM_REPORT_NET_TRY:
                return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
                });
        case SystemReportNetActions.GET_SYSTEM_REPORT_NET_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { systemReportNetValueData: action.payload });
        case SystemReportNetActions.GET_SYSTEM_REPORT_NET_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
                case SystemReportNetActions.ADD_SYSTEM_REPORT_NET_TRY:
                return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
                });
        case SystemReportNetActions.ADD_SYSTEM_REPORT_NET_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { systemReportNetValueData: action.payload });
        case SystemReportNetActions.ADD_SYSTEM_REPORT_NET_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case SystemReportNetActions.UPDATE_SYSTEM_REPORT_NET_TRY:
                return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
                });
        case SystemReportNetActions.UPDATE_SYSTEM_REPORT_NET_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { systemReportNetValueData: action.payload });
        case SystemReportNetActions.UPDATE_SYSTEM_REPORT_NET_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case KhagaulActions.GET_KHAGAUL_TRY:
                return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
                });
        case KhagaulActions.GET_KHAGAUL_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { KhagaulValueData: action.payload });
        case KhagaulActions.GET_KHAGAUL_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
                case KhagaulActions.ADD_KHAGAUL_TRY:
                return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
                });
        case KhagaulActions.ADD_KHAGAUL_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { KhagaulValueData: action.payload });
        case KhagaulActions.ADD_KHAGAUL_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case KhagaulActions.UPDATE_KHAGAUL_TRY:
                return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
                });
        case KhagaulActions.UPDATE_KHAGAUL_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { KhagaulValueData: action.payload });
        case KhagaulActions.UPDATE_KHAGAUL_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case MiscActions.GET_MISC_TRY:
                return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
                });
        case MiscActions.GET_MISC_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { miscValueData: action.payload });
        case MiscActions.GET_MISC_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
                case MiscActions.ADD_MISC_TRY:
                return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
                });
        case MiscActions.ADD_MISC_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null
            }, { miscValueData: action.payload });
        case MiscActions.ADD_MISC_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            default:
            return state;
    }
}
