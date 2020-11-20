import { CodeBase } from './code-base.model';
import { MenuItem } from 'primeng/api';
import { AuditTrail } from './audit-trail';

export class OutageModel {
    Id: number;
    EntityId: number;
    Name: string;
    Description: string;
    Type: number;
    RequestId: string;
    LogbookId: string;
    LogDate: string;
    LogTime: string;
    RestoreDate: string;
    RestoreTime: string;
    Reason: string;
    Remarks: string;
    RestoredRemarks: string;
    OpeningCode: CodeBase[];
    ClosingCode: CodeBase[];
    OpeningThirdPartyCode: CodeBase[];
    ClosingThirdPartyCode: CodeBase[];
    IsDashboardVisible: boolean;
    IsDashboardUpdate: boolean;
    menuItems: MenuItem[];
    reasonsViewOnly: string;
    remarksViewOnly: string;
    restoreRemarksViewOnly: string;
    AuditHistory: AuditTrail[];
    outagerequestid: string;
    IsHistoryUpdate: boolean;
    Constituent: number;
    ClearanceComment: string;
    Gss: string;
    GssUserName: string;
    ElementCategory: string;
}

export const INITIAL_OUTAGE_MODEL: OutageModel[] = [{
    Id: null,
    EntityId: null,
    Name: null,
    Description: null,
    Type: null,
    RequestId: null,
    LogbookId: null,
    LogDate: null,
    LogTime: null,
    RestoreDate: null,
    RestoreTime: null,
    Reason: null,
    Remarks: null,
    RestoredRemarks: null,
    OpeningCode: [],
    ClosingCode: [],
    OpeningThirdPartyCode: [],
    ClosingThirdPartyCode: [],
    IsDashboardVisible: true,
    menuItems: [],
    IsDashboardUpdate: false,
    reasonsViewOnly: null,
    remarksViewOnly: null,
    restoreRemarksViewOnly: null,
    AuditHistory: [],
    outagerequestid: null,
    IsHistoryUpdate: false,
    Constituent: null,
    ClearanceComment: null,
    Gss: null,
    GssUserName: null,
    ElementCategory: null
}];
