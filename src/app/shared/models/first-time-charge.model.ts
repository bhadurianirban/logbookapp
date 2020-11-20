import { CodeBase } from './code-base.model';
import { MenuItem } from 'primeng/api';
import { AuditTrail } from './audit-trail';

export class FirstTimeChargeModel {
    Id: number;
    EntityId: number;
    RegionId: number;
    Name: string;
    Description: string;
    RequestedDate: string;
    ChargeDate: string;
    Owner: string;
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
    firsttimechargerequestid: string;
    IsHistoryUpdate: boolean;
}

export const INITIAL_FIRST_TIME_CHARGE_MODEL: FirstTimeChargeModel[] = [{
    Id: null,
    EntityId: null,
    RegionId: null,
    Description: null,
    Name: null,
    RequestedDate: null,
    ChargeDate: null,
    Owner: null,
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
    firsttimechargerequestid: null,
    IsHistoryUpdate: false
}];
