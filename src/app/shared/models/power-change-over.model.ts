import { CodeBase } from './code-base.model';
import { AuditTrail } from './audit-trail';
import { MenuItem } from 'primeng/api';

export interface PowerChangeOver {
    ID: number;
    RequestId: string;
    LogbookId: string;
    Remarks: string;
    CodeData: CodeBase;
    AuditHistory: AuditTrail[];
    pcoid: string;
    ChangeOverDate: string;
    ChangeOverTime: string;
    ActualDate: string;
    ActualTime: string;
    CancelRemarks: string;
    IsCancelled: boolean;
    menuItems: MenuItem[];
}
