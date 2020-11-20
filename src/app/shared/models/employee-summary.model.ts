export class EmployeeSummaryModel {
    Config: string[][];
    Groups: string[];
    comments: string;
    DutyReported: string;
}

export interface IEmployeeSummary {
    summary: EmployeeSummaryModel;
}
