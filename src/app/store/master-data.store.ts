import { AsyncRequestModel } from '../shared/models/async-request.model';
import { ConfigValue } from '../shared/models/config-values.model';
import { ViolationValue } from '../shared/models/violation-value.model';
import { ConstituentValue } from '../shared/models/constituent-value.model';
import { IssueValue } from '../shared/models/issue-value.model';
import { TrippingValue } from '../shared/models/tripping-value.model';
import { SchedulingValue } from '../shared/models/scheduling-value.model';
import { DesignationValue } from '../shared/models/designation-value.model';
import { FirstTimeChargeLine} from '../shared/models/first-time-charge-lines.model';

export interface MasterDataStoreData extends AsyncRequestModel {
    configValueData: ConfigValue[];
    violationValueData: ViolationValue[];
    constituentValueData: ConstituentValue[];
    issueValueData: IssueValue[];
    trippingValueData: TrippingValue[];
    schedulingValueData: SchedulingValue[];
    designationValueData: DesignationValue[];
    firstTimeChargeLineData: FirstTimeChargeLine[];
}

export const INITIAL_MASTERDATA_STORE: MasterDataStoreData = {
    configValueData: [],
    constituentValueData: [],
    violationValueData: [],
    trippingValueData: [],
    issueValueData: [],
    schedulingValueData: [],
    designationValueData: [],
    firstTimeChargeLineData: [],
    error: null,
    pending: false,
    issued: false
};
