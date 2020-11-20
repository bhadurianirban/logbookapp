import { AsyncRequestModel } from '../shared/models/async-request.model';
import { IHistoricElement } from '../shared/models/historic-elements.model';

export interface HistoricElementStore extends AsyncRequestModel {
    historicElementsData: IHistoricElement;
}

export const INITIAL_HISTORIC_ELEMENTS: HistoricElementStore = {
    historicElementsData: null,
    error: null,
    pending: false,
    issued: false
};
