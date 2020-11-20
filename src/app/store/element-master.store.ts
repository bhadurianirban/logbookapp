import { AsyncRequestModel } from '../shared/models/async-request.model';
import { MasterElement } from '../shared/models/element.model';
import { ITrippingNature, IOutageSelectOptions, IIssueType,
     IMasterSchedulingType, IViolationMaster, ISubViolationMaster, IConstituents, IVoltageLevelInterface } from '../shared/models/master-data.model';
import { IScadaData } from '../shared/models/scada-data.model';
import { IUserViewModelInterface } from '../shared/models/user-management.model';
import { FirstTimeChargeModel } from '../shared/models/first-time-charge.model';

export interface MasterStoreData extends AsyncRequestModel {
    commonMaster: CommonMasterData;
    outageMaster: OutageMasterData;
    stateDeviation: ScadaDeviationData;
}

export interface MasterElementsStoreData extends AsyncRequestModel {
    masterElements: OutageMasterElementsData;
}

export interface OutageMasterElementsData {
    linesData: MasterElement[];
    unitsData: MasterElement[];
    busData: MasterElement[];
    bayData: MasterElement[];
    hvdcData: MasterElement[];
    ictData: MasterElement[];
    busReactorData: MasterElement[];
    lineReactorData: MasterElement[];
    fscData: MasterElement[];
    tcscData: MasterElement[];
    statcomData: MasterElement[];
    autoReclosureData: MasterElement[];
    firstTimeChargeData: FirstTimeChargeModel[];
    subStationData: MasterElement[];
}

export interface CommonMasterData {
    trippingNatures: ITrippingNature[];
    issueTypes: IIssueType[];
    schedulingTypes: IMasterSchedulingType[];
    violationTypes: IViolationMaster[];
    subViolationTypes: ISubViolationMaster[];
    constituents: IConstituents[];
    allShiftUsers: IUserViewModelInterface[];
    shiftInchargeUsers: IUserViewModelInterface[];
    voltageLevels: IVoltageLevelInterface[];
}

export interface OutageMasterData {
    selectOptions: IOutageSelectOptions;
}

export interface ScadaDeviationData {
    deviation: IScadaData;
}

export const INITIAL_MASTER_STORE_DATA: MasterStoreData = {
    commonMaster: null,
    outageMaster: null,
    stateDeviation: null,
    error: null,
    pending: false,
    issued: false
};

export const INITIAL_MASTER_ELEMENTS_STORE_DATA: MasterElementsStoreData = {
    masterElements: null,
    error: null,
    pending: false,
    issued: false
};
