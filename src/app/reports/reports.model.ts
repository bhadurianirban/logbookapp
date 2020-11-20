export interface IViolationMessageReport {
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
}

export interface IElementWiseReport {
    EntityId: number;
    ElementName: string;
    OutageOrTripDate: string;
    RestoreOrReviveDate: string;
    OutageOrTripTime: string;
    RestoreOrReviveTime: string;
    ReasonIfAny: string;
    RemarksIfAny: string;
    EntryType: string;
}
export interface ITieLinesReport {
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
