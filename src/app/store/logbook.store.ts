import { AsyncRequestModel } from '../shared/models/async-request.model';
import { Logbook, LOGBOOK_INITIAL_DATA } from '../shared/models/logbook.model';

export interface LogbookStoreData extends AsyncRequestModel {
    currentLogbookData: Logbook;
}

export const INITIAL_LOGBOOK_DATA: LogbookStoreData = {
    currentLogbookData: LOGBOOK_INITIAL_DATA,
    error: null,
    pending: false,
    issued: false
};

