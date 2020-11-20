import { OutageModel, INITIAL_OUTAGE_MODEL } from './outage.model';
import { TrippingModel, INITIAL_TRIPPING_MODEL } from './tripping.model';
import { ApprovedShutdownRequest, INITIAL_SHUTDOWN_REQUEST } from './approved-shutdown.model';
import { MenuItem } from 'primeng/api';
import { AntiTheftModel, INITIAL_ANTITHEFT_MODEL } from './antiTheft.model';
import { IUserViewModelInterface } from './user-management.model';
import { ShiftHandoverModel } from './shift-user.model';
import { CodeBaseViewModel } from './code-base.model';
import { AutoRecloseModel, INITIAL_AUTO_RECLOSE_MODEL } from './auto-reclose.model';
import { FirstTimeChargeModel, INITIAL_FIRST_TIME_CHARGE_MODEL } from './first-time-charge.model';
import { LoadViewModel, DayWiseTieLine } from './load-management.model';
import { ConstituentValue } from './constituent-value.model';
import { PowerChangeOver } from './power-change-over.model';

export class Logbook {
    Id: number;
    RequestId: string;
    LogbookDate: string;
    Shift: string;
    DemandMaximumMW: number;
    DemandMaximumTime: string;
    DemandMinimumMW: number;
    DemandMinimumTime: string;
    FrequencyMaximumHz: number;
    FrequencyMaximumTime: string;
    FrequencyMinimumHz: number;
    FrequencyMinimumTime: string;
    SBDemandMaximumMW: number;
    SBDemandMaximumTime: string;
    SBDemandMinimumMW: number;
    SBDemandMinimumTime: string;
    SBFrequencyMaximumHz: number;
    SBFrequencyMaximumTime: string;
    SBFrequencyMinimumHz: number;
    SBFrequencyMinimumTime: string;
    FBDemandMaximumMW: number;
    FBDemandMaximumTime: string;
    FBDemandMinimumMW: number;
    FBDemandMinimumTime: string;
    FBFrequencyMaximumHz: number;
    FBFrequencyMaximumTime: string;
    FBFrequencyMinimumHz: number;
    FBFrequencyMinimumTime: string;
    ShiftIncharge: number;
    OutageElements: OutageModel[];
    TrippingElements: TrippingModel[];
    ShutdownElements: ApprovedShutdownRequest[];
    Issues: Issue[];
    SchedulingDetails: LogbookSchedulingDetail[];
    ViolationMessages: LogbookViolationMessage[];
    AntiTheftElements: AntiTheftModel[];
    ShiftUsers: IUserViewModelInterface[];
    ShiftConfirmation: boolean;
    ShiftHandover: ShiftHandoverModel;
    ShiftCodes: CodeBaseViewModel[];
    Status: string;
    STATCOMData: STATCOM[];
    FSCTCSCData: FSCTCSC[];
    AutoRecloseData: AutoRecloseModel[];
    Instructions: LogbookInstruction[];
    FirstTimeChargeData: FirstTimeChargeModel[];
    LoadData: LoadViewModel[];
    LoadReleaseData: LoadViewModel[];
    GridsWithRestriction: ConstituentValue[];
    IsNextShiftCreated: boolean;
    PowerChangeOverData: PowerChangeOver[];
}

export class Issue {
    Id: number;
    RequestId: string;
    LogbookId: string;
    IssueType: string;
    Issue: string;
    issueid: string;
}

export class STATCOM {
    Id: number;
    RequestId: string;
    LogbookId: string;
    Name: string;
    STATCOM: string;
    InstalledAt: string;
    Status: string;
    Remarks: string;
}

export class FSCTCSC {
    Id: number;
    RequestId: string;
    LogbookId: string;
    Name: string;
    FSCTCSC: string;
    InstalledAt: string;
    Status: string;
    Remarks: string;
}

export class LogbookSchedulingDetail {
    Id: number;
    RequestId: string;
    LogbookId: string;
    SchedulingType: string;
    SchedulingDetail: string;
    schedulingid: string;
}

export class LogbookViolationMessage {
    Id: number;
    RequestId: string;
    LogbookId: string;
    ViolationType: string;
    Constituent: string;
    SubViolationType: string;
    Message: string;
    ScheduleMW: number;
    ActualMW: number;
    ActualDeviationMW: number;
    AreaControlErrorMW: number;
    Desired: string;
    CreatedDate: string;
    CreatedTime: string;
    menuItems: MenuItem[];
    messageid: string;
}

export interface LogbookInstruction {
    Id: string;
    LogbookId: string;
    Instruction: string;
    CreatedOn: string;
    CreatedBy: string;
    EndDate: string;
}

export const LOGBOOK_INITIAL_DATA = {
    Id: 0,
    RequestId: null,
    LogbookDate: null,
    Shift: null,
    DemandMaximumMW: null,
    DemandMaximumTime: null,
    DemandMinimumMW: null,
    DemandMinimumTime: null,
    FrequencyMaximumHz: null,
    FrequencyMaximumTime: null,
    FrequencyMinimumHz: null,
    FrequencyMinimumTime: null,
    ShiftIncharge: 0,
    OutageElements: INITIAL_OUTAGE_MODEL,
    TrippingElements: INITIAL_TRIPPING_MODEL,
    ShutdownElements: INITIAL_SHUTDOWN_REQUEST,
    Issues: [],
    SchedulingDetails: [],
    ViolationMessages: [],
    AntiTheftElements: INITIAL_ANTITHEFT_MODEL,
    ShiftUsers: [],
    ShiftConfirmation: false,
    ShiftHandover: null,
    AutoRecloseData: INITIAL_AUTO_RECLOSE_MODEL,
    FirstTimeChargeData: INITIAL_FIRST_TIME_CHARGE_MODEL,
    Instructions: [],
    LoadData: [],
    LoadReleaseData: [],
    GridsWithRestriction: [],
    IsNextShiftCreated: false,
    PowerChangeOverData: []
} as Logbook;

