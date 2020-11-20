import { CodeBase } from './code-base.model';
import { MenuItem } from 'primeng/api';
import { AuditTrail } from './audit-trail';

export class ApprovedShutdownRequest {
    Id: number;
    EntityId: number;
    ElementId: number;
    ElementName: string;
    ElementDescription: string;
    LogbookId: string;
    RequestId: string;
    ShutdownAvailedBy: string;
    Nature: string;
    PlannedOutage: string;
    PlannedRestore: string;
    ExtendedOutage: string;
    ExtendedRestore: string;
    Reason: string;
    Type: string;
    ActualOutageDate: string;
    ActualOutageTime: string;
    ActualRestoreDate: string;
    ActualRestoreTime: string;
    OpeningCode: CodeBase[];
    ClosingCode: CodeBase[];
    OpeningThirdPartyCode: CodeBase[];
    ClosingThirdPartyCode: CodeBase[];
    IsDashboardVisible: boolean;
    IsDashboardUpdate: boolean;
    menuItems: MenuItem[];
    IsDeferred: boolean;
    ActualOutage: string;
    ActualRestore: string;
    AuditHistory: AuditTrail[];
    shutdownrequestid: string;
    IsHistoryUpdate: boolean;
    DeferComments: string;
    Conditions: string;
    GSSName: string;
    ElementCategory: string;
    GSSUserName: string;
}

export const INITIAL_SHUTDOWN_REQUEST: ApprovedShutdownRequest[] = [{
    Id: null,
    EntityId: null,
    ElementName: null,
    ElementDescription: null,
    ElementId: null,
    LogbookId: null,
    RequestId: null,
    ShutdownAvailedBy: null,
    Nature: null,
    PlannedOutage: null,
    PlannedRestore: null,
    ExtendedOutage: null,
    ExtendedRestore: null,
    Reason: null,
    Type: null,
    ActualOutageDate: null,
    ActualOutageTime: null,
    ActualRestoreDate: null,
    ActualRestoreTime: null,
    OpeningCode: [],
    ClosingCode: [],
    OpeningThirdPartyCode: [],
    ClosingThirdPartyCode: [],
    IsDashboardVisible: true,
    IsDashboardUpdate: false,
    menuItems: [],
    IsDeferred: false,
    ActualOutage: null,
    ActualRestore: null,
    AuditHistory: [],
    shutdownrequestid: null,
    IsHistoryUpdate: false,
    DeferComments: null,
    Conditions: null,
    GSSName: null,
    GSSUserName: null,
    ElementCategory: null
}];

