import { INITIAL_MASTER_ELEMENTS_STORE_DATA, MasterElementsStoreData,
     MasterStoreData, INITIAL_MASTER_STORE_DATA } from './element-master.store';
import { UserMasterStoreData, INITIAL_USER_MASTER_DATA } from './user-master.store';
import { LogbookStoreData, INITIAL_LOGBOOK_DATA } from './logbook.store';
import { LogbookDashboardStore, INITIAL_LOGBOOK_DASHBOARD } from './logbook-dashboard.store';
import { RoleStoreData, INITIAL_ROLE_DATA } from './role.store';
import { DesignationStoreData, INITIAL_DESIGNATION_DATA } from './designation.store';
import { UserRoleMapStoreData, INITIAL_USERROLEMAP_DATA } from './user-role-map.store';
import { RoasterGroupStoreData, INITIAL_ROASTERGROUP_DATA } from './roaster-group.store';
import { RoasterGroupUserStoreData, INITIAL_ROASTERGROUPUSER_DATA } from './roaster-group-user.store';
import { UserStoreData, INITIAL_USER_STORE_DATA } from './user.store';
import { DutyRoasterStoreData, INITIAL_DUTY_ROASTER_DATA } from './duty-roaster.store';
import { DashboardStore, INITIAL_DASHBOARD } from './dashboard.store';
import { CommonStoreData, INITIAL_COMMON_STORE_DATA } from './common.store';
import { CodeRepositoryStore, INITIAL_CODE_REPOSITORY } from './code-repository.store';
import { HistoricElementStore, INITIAL_HISTORIC_ELEMENTS } from './historic-elements.store';
import { EmployeeSummaryStore, INITIAL_SUMMARY_DATA } from './employee-summary.store';
import { ReportsStore, INITIAL_REPORT_REPO } from './reports.store';
import { MasterDataStoreData, INITIAL_MASTERDATA_STORE } from './master-data.store';
import { ReportingStore, INITIAL_REPORTING_DATA } from './reporting.store';
import { EnergySheetStoreData, INITIAL_ENERGYSHEET_STORE } from './energy-sheet.store';
import { ALDCLoadStore, INITIAL_ALDC_LOAD } from './aldc-load.store';



export interface ApplicationState {
    userAuthData: UserStoreData;
    commonStoreData: CommonStoreData;
    masterElementsData: MasterElementsStoreData;
    commonMasterStoreData: MasterStoreData;
    userData: UserMasterStoreData;
    currentLogbookData: LogbookStoreData;
    logbookDashboard: LogbookDashboardStore;
    roleData: RoleStoreData;
    designationData: DesignationStoreData;
    userRoleMapData: UserRoleMapStoreData;
    roasterGroupData: RoasterGroupStoreData;
    roasterGroupUserData: RoasterGroupUserStoreData;
    dutyRoasterData: DutyRoasterStoreData;
    dashboard: DashboardStore;
    codeRepository: CodeRepositoryStore;
    historicElements: HistoricElementStore;
    summary: EmployeeSummaryStore;
    reportsData: ReportsStore;
    masterDataStore: MasterDataStoreData;
    reportingStoreData: ReportingStore;
    energySheetStore: EnergySheetStoreData;
    aldcLoadDataStore: ALDCLoadStore;
}

export const INITIAL_APPLICATION_STATE: ApplicationState  = {
    userAuthData: INITIAL_USER_STORE_DATA,
    commonStoreData: INITIAL_COMMON_STORE_DATA,
    masterElementsData: INITIAL_MASTER_ELEMENTS_STORE_DATA,
    commonMasterStoreData: INITIAL_MASTER_STORE_DATA,
    userData: INITIAL_USER_MASTER_DATA,
    currentLogbookData: INITIAL_LOGBOOK_DATA,
    logbookDashboard: INITIAL_LOGBOOK_DASHBOARD,
    roleData: INITIAL_ROLE_DATA,
    designationData: INITIAL_DESIGNATION_DATA,
    userRoleMapData: INITIAL_USERROLEMAP_DATA,
    roasterGroupData: INITIAL_ROASTERGROUP_DATA,
    roasterGroupUserData: INITIAL_ROASTERGROUPUSER_DATA,
    dutyRoasterData: INITIAL_DUTY_ROASTER_DATA,
    dashboard: INITIAL_DASHBOARD,
    codeRepository: INITIAL_CODE_REPOSITORY,
    historicElements: INITIAL_HISTORIC_ELEMENTS,
    summary: INITIAL_SUMMARY_DATA,
    reportsData: INITIAL_REPORT_REPO,
    masterDataStore: INITIAL_MASTERDATA_STORE,
    reportingStoreData: INITIAL_REPORTING_DATA,
    energySheetStore: INITIAL_ENERGYSHEET_STORE,
    aldcLoadDataStore: INITIAL_ALDC_LOAD
};
