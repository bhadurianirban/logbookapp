import { environment } from '../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import * as RootReducers from './store/reducers/index';

export const reducers = {
    userAuthData: RootReducers.UserAuthReducer,
    commonStoreData: RootReducers.CommonReducer,
    commonMasterStoreData: RootReducers.CommonMasterDataReducer,
    masterElementsData: RootReducers.MasterElementsReducer,
    userData: RootReducers.UserManagementReducer,
    currentLogbookData: RootReducers.LogbookReducer,
    logbookDashboard: RootReducers.LogbookDashboardReducer,
    designationData: RootReducers.DesignationReducer,
    roleData: RootReducers.RoleReducer,
    userRoleMapData: RootReducers.UserRoleReducer,
    roasterGroupData: RootReducers.RoasterGroupReducer,
    roasterGroupUserData: RootReducers.RoasterGroupUserReducer,
    dutyRoasterData: RootReducers.DutyRoasterReducer,
    dashboard: RootReducers.DashboardReducer,
    codeRepository: RootReducers.CodeRepositoryReducer,
    historicElements: RootReducers.HistoricElementsReducer,
    summary: RootReducers.EmployeeShiftSummaryReducer,
    reportsData: RootReducers.ReportReducer,
    masterDataStore: RootReducers.MasterDataReducer,
    reportingStoreData: RootReducers.ReportingReducer,
    energySheetStore: RootReducers.EnergySheetReducer,
    aldcLoadDataStore: RootReducers.ALDCLoadReducer
};

export function logger(reducer) {
  // tslint:disable-next-line:only-arrow-functions
  return function(state, action) {
    if (!environment.production) {
      console.group(action.type);
    }
    const nextState = reducer(state, action);
    console.log('Reducer is: ', reducer);
    console.log(`%c prev state`, `color: #9E9E9E; font-weight: bold`, state);
    console.log(`%c action`, `color: #03A9F4; font-weight: bold`, action);
    console.log(`%c next state`, `color: #4CAF50; font-weight: bold`, nextState);
    console.groupEnd();
    return nextState;
  };
}


export const metaReducers = environment.production ? [] : [storeFreeze, logger];
