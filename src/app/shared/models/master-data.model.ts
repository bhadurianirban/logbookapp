import { CommonMasterData, OutageMasterElementsData } from 'src/app/store/element-master.store';

export class MasterData {
    commonMaster: CommonMasterData;
}

export class MasterElementsData {
    masterElements: OutageMasterElementsData;
}

export interface ITrippingNature {
    Id: number;
    Name: string;
}

export interface IOutageSelectOptions {
    Reasons: string[];
    Remarks: string[];
    RestoreRemarks: string[];
}

export interface IIssueType {
    Id: number;
    Issue: string;
}

export interface IMasterSchedulingType {
    Id: number;
    SchedulingType: string;
}

export interface IViolationMaster {
    Id: number;
    ViolationType: string;
}

export interface ISubViolationMaster {
    Id: number;
    Name: string;
}

export interface IConstituents {
    Id: number;
    Name: string;
    Code: string;
    Region: string;
    MaxPeak: number;
    MaxOffPeak: number;
    PresentLoad: number;
    AllocatedLoad: number;
    Restriction: number;
}

export interface IVoltageLevelInterface {
    Id: number;
    Name: string;
    isDeleted: boolean;
}
