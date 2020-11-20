import { IViolationMessageReport, IElementWiseReport, ITieLinesReport } from 'src/app/reports/reports.model';

export interface IReporting {
    ViolationReportData: IViolationMessageReport[];
    ElementWiseReport: IElementWiseReport[];
    TieLinesReportData: ITieLinesReport[];
}
