import { OutageModel } from './outage.model';
import { TrippingModel } from './tripping.model';
import { ApprovedShutdownRequest } from './approved-shutdown.model';
import { AntiTheftModel } from './antiTheft.model';
import { AutoRecloseModel } from './auto-reclose.model';
import { FirstTimeChargeModel } from './first-time-charge.model';

export interface IHistoricElement {
    OutageData: OutageModel[];
    TrippingData: TrippingModel[];
    ShutdownData: ApprovedShutdownRequest[];
    AntiTheftData: AntiTheftModel[];
    AutoRecloseData: AutoRecloseModel[];
    FirstTimeChargeData: FirstTimeChargeModel[];
}
