import { IDutyRoaster } from '../shared/models/duty-roaster.model';
import { AsyncRequestModel } from '../shared/models/async-request.model';

export interface DutyRoasterStoreData extends AsyncRequestModel {
    dutyRoasterData: IDutyRoaster[];
}
export const INITIAL_DUTY_ROASTER_DATA: DutyRoasterStoreData = {
    dutyRoasterData: [],
    error: null,
    pending: false,
    issued: false
};
