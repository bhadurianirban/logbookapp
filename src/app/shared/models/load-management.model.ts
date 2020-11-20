import { AuditTrail } from './audit-trail';
import { CodeBase } from './code-base.model';

export interface LoadConstituent {
    Id: number;
    Name: string;
    Type: string;
    Region: string;
    MaxPeakLoad: number;
    MaxOffPeakLoad: number;
    PresentLoad: number;
    AllocatedLoad: number;
    Restriction: number;
    Release: number;
}

export interface LoadViewModel {
    Id: number;
    RequestId: string;
    LogbookId: string;
    Type: string;
    Remarks: string;
    LoadGrids: LoadGrid[];
    AuditHistory: AuditTrail[];
    Code: CodeBase;
    Grids: string;
    DisplayType: string;
    loadrequestid: string;
    CreatedOnDate: string;
    CreatedOnTime: string;
    CreatedOn: string;
    Name: string;
    Designation: string;
    ContactNumber: string;
    IsALDCAddUpdate: boolean;
    LoadShedType: string;
    ImposedFromTime: string;
    ImposedToTime: string;
    ImposedFromDate: string;
    ImposedToDate: string;
}

export interface IALDCLoadModel {
    AllGrids: LoadConstituent[];
    GridsWithRestriction: LoadConstituent[];
}

export interface DayWiseTieLine {
    Id: number;
    RequestId: string;
    TieLineName: string;
    Date: string;
    Time0: string;
    Time1: string;
    Time2: string;
    Time3: string;
    Time4: string;
    Time5: string;
    Time6: string;
    Time7: string;
    Time8: string;
    Time9: string;
    Time10: string;
    Time11: string;
    Time12: string;
    Time13: string;
    Time14: string;
    Time15: string;
    Time16: string;
    Time17: string;
    Time18: string;
    Time19: string;
    Time20: string;
    Time21: string;
    Time22: string;
    Time23: string;
}

export interface LoadGrid {
    Id: number;
    RequestId: string;
    LoadManagementId: string;
    GridName: string;
    GridId: number;
    Type: string;
    Region: string;
    MaxPeakLoad: number;
    PresentLoad: number;
    AllocatedLoad: number;
    Restriction: number;
    Release: number;
    id: string;
    Code: string;
    CreatedOn: string;
    MaxOffPeakLoad: number;
}
