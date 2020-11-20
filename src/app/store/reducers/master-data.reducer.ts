import { MasterDataStoreData, INITIAL_MASTERDATA_STORE } from '../master-data.store';
// tslint:disable-next-line: max-line-length
import { ConfigValueActionsUnion, ConfigValueActions, ViolationValueActions, ViolationValueActionsUnion, ConstituentValueActions, ConstituentValueActionsUnion, IssueValueActions, IssueValueActionsUnion, TrippingValueActions, TrippingValueActionsUnion, SchedulingValueActions, SchedulingValueActionsUnion, DesignationValueActions, DesignationValueActionsUnion, FirstTimeChargeLineValueActions, FirstTimeChargeLineValueActionsUnion} from '../actions';
import { handleAddConfigSuccessAction, handleUpdateConfigSuccessAction } from './config-value.reducer';
// tslint:disable-next-line: max-line-length
import { handleAddViolationSuccessAction, handleUpdateViolationSuccessAction, handleDeleteViolationSuccessAction } from './violation-values.reducer';
// tslint:disable-next-line: max-line-length
import { handleAddConstituentSuccessAction, handleUpdateConstituentSuccessAction, handleDeleteConstituentSuccessAction } from './constituent-values.reducer';
import { handleAddIssueSuccessAction, handleUpdateIssueSuccessAction, handleDeleteIssueSuccessAction } from './issue-values.reducer';
// tslint:disable-next-line: max-line-length
import { handleAddTrippingSuccessAction, handleUpdateTrippingSuccessAction, handleDeleteTrippingSuccessAction } from './tripping-values.reducer';
// tslint:disable-next-line: max-line-length
import { handleAddSchedulingSuccessAction, handleUpdateSchedulingSuccessAction, handleDeleteSchedulingSuccessAction } from './scheduling-values.reducer';
// tslint:disable-next-line: max-line-length
import { handleAddDesignationSuccessAction, handleUpdateDesignationSuccessAction, handleDeleteDesignationSuccessAction,  handleSaveDesignationSuccessAction } from './designation-values.reducer';
// tslint:disable-next-line: max-line-length
import { handleAddLineSuccessAction, handleUpdateLineSuccessAction } from './first-time-charge-line-master.reducer';


// tslint:disable-next-line: max-line-length
export function MasterDataReducer(state: MasterDataStoreData = INITIAL_MASTERDATA_STORE, action: ConfigValueActionsUnion| ViolationValueActionsUnion | ConstituentValueActionsUnion| IssueValueActionsUnion| TrippingValueActionsUnion| SchedulingValueActionsUnion| DesignationValueActionsUnion | FirstTimeChargeLineValueActionsUnion) {
    switch (action.type) {
        case ConfigValueActions.GET_CONFIG_VALUES_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case ConfigValueActions.GET_CONFIG_VALUES_SUCCESS:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null,
            }, { configValueData: action.payload });
        case ConfigValueActions.GET_CONFIG_VALUES_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case ConfigValueActions.ADD_CONFIG_VALUE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case ConfigValueActions.ADD_CONFIG_VALUE_SUCCESS:
            return handleAddConfigSuccessAction(state, action);
        case ConfigValueActions.ADD_CONFIG_VALUE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case ConfigValueActions.UPDATE_CONFIG_VALUE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case ConfigValueActions.UPDATE_CONFIG_VALUE_SUCCESS:
            return handleUpdateConfigSuccessAction(state, action);
        case ConfigValueActions.UPDATE_CONFIG_VALUE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
            case ViolationValueActions.GET_VIOLATION_VALUES_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case ViolationValueActions.GET_VIOLATION_VALUES_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
                }, { violationValueData: action.payload });
            case ViolationValueActions.GET_VIOLATION_VALUES_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });
            case ViolationValueActions.ADD_VIOLATION_VALUE_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case ViolationValueActions.ADD_VIOLATION_VALUE_SUCCESS:
                return handleAddViolationSuccessAction(state, action);
            case ViolationValueActions.ADD_VIOLATION_VALUE_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });
            case ViolationValueActions.UPDATE_VIOLATION_VALUE_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case ViolationValueActions.UPDATE_VIOLATION_VALUE_SUCCESS:
                return handleUpdateViolationSuccessAction(state, action);
            case ViolationValueActions.UPDATE_VIOLATION_VALUE_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });

                case ViolationValueActions.DELETE_VIOLATION_VALUES_TRY:
                   return Object.assign({}, state, {
                     issued: true,
                    pending: true,
                    error: null
                });
        case ViolationValueActions.DELETE_VIOLATION_VALUES_SUCCESS:
        // tslint:disable-next-line: only-arrow-functions
        return handleDeleteViolationSuccessAction(state, action);
        case ViolationValueActions.DELETE_VIOLATION_VALUES_ERROR:
          return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: action.payload
        });
        case ConstituentValueActions.GET_CONSTITUENT_VALUES_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case ConstituentValueActions.GET_CONSTITUENT_VALUES_SUCCESS:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null,
            }, { constituentValueData: action.payload });
        case ConstituentValueActions.GET_CONSTITUENT_VALUES_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case ConstituentValueActions.ADD_CONSTITUENT_VALUE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case ConstituentValueActions.ADD_CONSTITUENT_VALUE_SUCCESS:
            return handleAddConstituentSuccessAction(state, action);
        case ConstituentValueActions.ADD_CONSTITUENT_VALUE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case ConstituentValueActions.UPDATE_CONSTITUENT_VALUE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case ConstituentValueActions.UPDATE_CONSTITUENT_VALUE_SUCCESS:
            return handleUpdateConstituentSuccessAction(state, action);
        case ConstituentValueActions.UPDATE_CONSTITUENT_VALUE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });

            case ConstituentValueActions.DELETE_CONSTITUENT_VALUES_TRY:
               return Object.assign({}, state, {
                 issued: true,
                pending: true,
                error: null
            });
    case ConstituentValueActions.DELETE_CONSTITUENT_VALUES_SUCCESS:
    // tslint:disable-next-line: only-arrow-functions
    return handleDeleteConstituentSuccessAction(state, action);
    case ConstituentValueActions.DELETE_CONSTITUENT_VALUES_ERROR:
      return Object.assign({}, state, {
        issued: true,
        pending: false,
        error: action.payload
    });

    case IssueValueActions.GET_ISSUE_VALUES_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case IssueValueActions.GET_ISSUE_VALUES_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
                }, { issueValueData: action.payload });
            case IssueValueActions.GET_ISSUE_VALUES_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });
            case IssueValueActions.ADD_ISSUE_VALUE_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case IssueValueActions.ADD_ISSUE_VALUE_SUCCESS:
                return handleAddIssueSuccessAction(state, action);
            case IssueValueActions.ADD_ISSUE_VALUE_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });
            case IssueValueActions.UPDATE_ISSUE_VALUE_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case IssueValueActions.UPDATE_ISSUE_VALUE_SUCCESS:
                return handleUpdateIssueSuccessAction(state, action);
            case IssueValueActions.UPDATE_ISSUE_VALUE_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });

                case IssueValueActions.DELETE_ISSUE_VALUES_TRY:
                   return Object.assign({}, state, {
                     issued: true,
                    pending: true,
                    error: null
                });
        case IssueValueActions.DELETE_ISSUE_VALUES_SUCCESS:
        // tslint:disable-next-line: only-arrow-functions
        return handleDeleteIssueSuccessAction(state, action);
        case IssueValueActions.DELETE_ISSUE_VALUES_ERROR:
          return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: action.payload
        });

        case TrippingValueActions.GET_TRIPPING_VALUES_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case TrippingValueActions.GET_TRIPPING_VALUES_SUCCESS:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null,
            }, { trippingValueData: action.payload });
        case TrippingValueActions.GET_TRIPPING_VALUES_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case TrippingValueActions.ADD_TRIPPING_VALUE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case TrippingValueActions.ADD_TRIPPING_VALUE_SUCCESS:
            return handleAddTrippingSuccessAction(state, action);
        case TrippingValueActions.ADD_TRIPPING_VALUE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case TrippingValueActions.UPDATE_TRIPPING_VALUE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case TrippingValueActions.UPDATE_TRIPPING_VALUE_SUCCESS:
            return handleUpdateTrippingSuccessAction(state, action);
        case TrippingValueActions.UPDATE_TRIPPING_VALUE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });

            case TrippingValueActions.DELETE_TRIPPING_VALUES_TRY:
               return Object.assign({}, state, {
                 issued: true,
                pending: true,
                error: null
            });
    case TrippingValueActions.DELETE_TRIPPING_VALUES_SUCCESS:
    // tslint:disable-next-line: only-arrow-functions
    return handleDeleteTrippingSuccessAction(state, action);
    case TrippingValueActions.DELETE_TRIPPING_VALUES_ERROR:
      return Object.assign({}, state, {
        issued: true,
        pending: false,
        error: action.payload
      });

      case SchedulingValueActions.GET_SCHEDULING_VALUES_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case SchedulingValueActions.GET_SCHEDULING_VALUES_SUCCESS:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: null,
                }, { schedulingValueData: action.payload });
            case SchedulingValueActions.GET_SCHEDULING_VALUES_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });
            case SchedulingValueActions.ADD_SCHEDULING_VALUE_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case SchedulingValueActions.ADD_SCHEDULING_VALUE_SUCCESS:
                return handleAddSchedulingSuccessAction(state, action);
            case SchedulingValueActions.ADD_SCHEDULING_VALUE_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });
            case SchedulingValueActions.UPDATE_SCHEDULING_VALUE_TRY:
                return Object.assign({}, state, {
                    issued: true,
                    pending: true,
                    error: null
                });
            case SchedulingValueActions.UPDATE_SCHEDULING_VALUE_SUCCESS:
                return handleUpdateSchedulingSuccessAction(state, action);
            case SchedulingValueActions.UPDATE_SCHEDULING_VALUE_ERROR:
                return Object.assign({}, state, {
                    issued: true,
                    pending: false,
                    error: action.payload
                });

                case SchedulingValueActions.DELETE_SCHEDULING_VALUES_TRY:
                   return Object.assign({}, state, {
                     issued: true,
                    pending: true,
                    error: null
                });
        case SchedulingValueActions.DELETE_SCHEDULING_VALUES_SUCCESS:
        // tslint:disable-next-line: only-arrow-functions
        return handleDeleteSchedulingSuccessAction(state, action);
        case SchedulingValueActions.DELETE_SCHEDULING_VALUES_ERROR:
          return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: action.payload
        });

        case DesignationValueActions.GET_DESIGNATION_VALUES_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case DesignationValueActions.GET_DESIGNATION_VALUES_SUCCESS:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null,
            }, { designationValueData: action.payload });
        case DesignationValueActions.GET_DESIGNATION_VALUES_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case DesignationValueActions.ADD_DESIGNATION_VALUE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case DesignationValueActions.ADD_DESIGNATION_VALUE_SUCCESS:
            return handleAddDesignationSuccessAction(state, action);
        case DesignationValueActions.ADD_DESIGNATION_VALUE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case DesignationValueActions.UPDATE_DESIGNATION_VALUE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case DesignationValueActions.UPDATE_DESIGNATION_VALUE_SUCCESS:
            return handleUpdateDesignationSuccessAction(state, action);
        case DesignationValueActions.UPDATE_DESIGNATION_VALUE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });

            case DesignationValueActions.DELETE_DESIGNATION_VALUES_TRY:
               return Object.assign({}, state, {
                 issued: true,
                pending: true,
                error: null
            });
    case DesignationValueActions.DELETE_DESIGNATION_VALUES_SUCCESS:
    // tslint:disable-next-line: only-arrow-functions
    return handleDeleteDesignationSuccessAction(state, action);
    case DesignationValueActions.DELETE_DESIGNATION_VALUES_ERROR:
      return Object.assign({}, state, {
        issued: true,
        pending: false,
        error: action.payload
    });
    case DesignationValueActions.SAVE_DESIGNATION_VALUE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case DesignationValueActions.SAVE_DESIGNATION_VALUE_SUCCESS:
            return handleSaveDesignationSuccessAction(state, action);
        case DesignationValueActions.SAVE_DESIGNATION_VALUE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        
            //first-time-charge-line-master
            case FirstTimeChargeLineValueActions.GET_LINE_VALUES_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case FirstTimeChargeLineValueActions.GET_LINE_VALUES_SUCCESS:
        return Object.assign({}, state, {
            issued: true,
            pending: false,
            error: null,
            }, { firstTimeChargeLineData: action.payload });
        case FirstTimeChargeLineValueActions.GET_LINE_VALUES_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case FirstTimeChargeLineValueActions.ADD_LINE_VALUE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case FirstTimeChargeLineValueActions.ADD_LINE_VALUE_SUCCESS:
            return handleAddLineSuccessAction(state, action);
        case FirstTimeChargeLineValueActions.ADD_LINE_VALUE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });
        case FirstTimeChargeLineValueActions.UPDATE_LINE_VALUE_TRY:
            return Object.assign({}, state, {
                issued: true,
                pending: true,
                error: null
            });
        case FirstTimeChargeLineValueActions.UPDATE_LINE_VALUE_SUCCESS:
            return handleUpdateLineSuccessAction(state, action);
        case FirstTimeChargeLineValueActions.UPDATE_LINE_VALUE_ERROR:
            return Object.assign({}, state, {
                issued: true,
                pending: false,
                error: action.payload
            });    


        default:
            return state;
    }
}
