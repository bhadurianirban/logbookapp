import { OutageModel } from './outage.model';
import { TrippingModel } from './tripping.model';
import { AntiTheftModel } from './antiTheft.model';
import { ApprovedShutdownRequest } from './approved-shutdown.model';
import { AutoRecloseModel } from './auto-reclose.model';
import { LoadViewModel } from './load-management.model';
import { FirstTimeChargeModel } from './first-time-charge.model';

export class CodeBase {
    Id: number;
    Code: string;
    CodeId: string;
    CodeType: string;
    Type: string;
    ElementId: string;
    LogbookId: string;
    IsCancelled: boolean;
    CreatedDate: string;
    CreatedTime: string;
    CancelRemarks: string;
    CancelledDate: string;
    CancelledTime: string;
    CodeCreatedFrom: string;
    ElementName: string;
}

export interface OutageCodeData {
    itemData: OutageModel;
    codeType: string;
}

export class CodeBaseViewModel extends CodeBase  {
    OutageData: OutageModel;
    TrippingData: TrippingModel;
    AntiTheftData: AntiTheftModel;
    ShutdownData: ApprovedShutdownRequest;
    AutoRecloseData: AutoRecloseModel;
    ElementName: string;
    CreatedDateTimeStamp: string;
    CodeCancelYesNo: string;
    LoadData: LoadViewModel;
    FirstTimeChargeData: FirstTimeChargeModel;
}

export interface ICodeRepository {
    codes: CodeBaseViewModel[];
    pendingCodes: CodeBaseViewModel[];
}
