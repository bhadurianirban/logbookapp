export const LOADING_INDICATOR_ACTION = 'LOADING_INDICATOR_ACTION';

export class LoadingIndicatorAction {
    readonly type = LOADING_INDICATOR_ACTION;
    constructor(public payload?: any) {}
}
