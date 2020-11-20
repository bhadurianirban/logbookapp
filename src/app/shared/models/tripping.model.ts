import { CodeBase } from './code-base.model';
import { MenuItem } from 'primeng/api';
import { AuditTrail } from './audit-trail';

export class TrippingModel {
    Id: number;
    EntityId: number;
    Name: string;
    Description: string;
    Type: number;
    RequestId: string;
    LogbookId: string;
    TripDate: string;
    TripTime: string;
    Nature: string;
    ExpectedDate: string;
    EndRelayReasonOne: string;
    EndRelayReasonTwo: string;
    LoadAffectedMW: number;
    GenerationEffectedMW: number;
    AffectedArea: string;
    AffectedPlant: string;
    RevivalDate: string;
    RevivalTime: string;
    OpeningCode: CodeBase[];
    ClosingCode: CodeBase[];
    PatrolingCode: CodeBase[];
    OpeningThirdPartyCode: CodeBase[];
    ClosingThirdPartyCode: CodeBase[];
    IsDashboardVisible: boolean;
    IsDashboardUpdate: boolean;
    menuItems: MenuItem[];
    AuditHistory: AuditTrail[];
    trippingrequestid: string;
    IsHistoryUpdate: boolean;
    ClearanceComment: string;
    Gss: string;
    GssUserName: string;
    ElementCategory: string;
}

export const INITIAL_TRIPPING_MODEL: TrippingModel[] = [{
    Id: null,
    EntityId: null,
    Name: null,
    Description: null,
    Type: null,
    RequestId: null,
    LogbookId: null,
    TripDate: null,
    TripTime: null,
    Nature: null,
    ExpectedDate: null,
    EndRelayReasonOne: null,
    EndRelayReasonTwo: null,
    LoadAffectedMW: 0,
    GenerationEffectedMW: 0,
    AffectedArea: null,
    AffectedPlant: null,
    RevivalDate: null,
    RevivalTime: null,
    OpeningCode: [],
    ClosingCode: [],
    OpeningThirdPartyCode: [],
    ClosingThirdPartyCode: [],
    IsDashboardVisible: true,
    IsDashboardUpdate: false,
    menuItems: [],
    AuditHistory: [],
    trippingrequestid: null,
    IsHistoryUpdate: false,
    PatrolingCode: [],
    ClearanceComment: null,
    Gss: null,
    GssUserName: null,
    ElementCategory: null
}];
