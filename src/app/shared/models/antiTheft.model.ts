import { MenuItem } from 'primeng/api';
import { CodeBase } from './code-base.model';
import { AuditTrail } from './audit-trail';

export class AntiTheftModel {
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
    AntiTheftOpeningCode: CodeBase[];
    AntiTheftClosingCode: CodeBase[];
    AntiTheftThirdPartyOpeningCode: CodeBase[];
    AntiTheftThirdPartyClosingCode: CodeBase[];
    IsDashboardVisible: boolean;
    IsDashboardUpdate: boolean;
    menuItems: MenuItem[];
    reasonsViewOnly: string;
    remarksViewOnly: string;
    restoreRemarksViewOnly: string;
    AuditHistory: AuditTrail[];
    antitheftrequestid: string;
    IsHistoryUpdate: boolean;
}

export const INITIAL_ANTITHEFT_MODEL: AntiTheftModel[] = [{
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
    AntiTheftClosingCode: [],
    AntiTheftOpeningCode: [],
    AntiTheftThirdPartyOpeningCode: [],
    AntiTheftThirdPartyClosingCode: [],
    IsDashboardVisible: true,
    menuItems: [],
    IsDashboardUpdate: false,
    reasonsViewOnly: null,
    remarksViewOnly: null,
    restoreRemarksViewOnly: null,
    AuditHistory: [],
    antitheftrequestid: null,
    IsHistoryUpdate: false
}];
