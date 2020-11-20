import { OutageModel } from './outage.model';
import { TrippingModel } from './tripping.model';
import { ApprovedShutdownRequest } from './approved-shutdown.model';
import { LogbookViolationMessage, STATCOM, FSCTCSC } from './logbook.model';
import { AntiTheftModel } from './antiTheft.model';
import { AutoRecloseModel } from './auto-reclose.model';
import { FirstTimeChargeModel } from './first-time-charge.model';
import { DayWiseTieLine } from './load-management.model';
import { ConstituentValue } from './constituent-value.model';

export interface IDashboard {
    OutageElements: OutageModel[];
    TrippingElements: TrippingModel[];
    ShutdownElements: ApprovedShutdownRequest[];
    ViolationMessages: LogbookViolationMessage[];
    AntiTheftElements: AntiTheftModel[];
    STATCOMData: STATCOM[];
    FSCTCSCData: FSCTCSC[];
    AutoRecloseData: AutoRecloseModel[];
    FirstTimeChargeData: FirstTimeChargeModel[];
    TieLines: DayWiseTieLine[];
    GridsWithRestriction: ConstituentValue[];
}
