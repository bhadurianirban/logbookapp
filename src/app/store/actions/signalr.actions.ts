import { SocketModel, SocketCodeModel } from 'src/app/shared/models/sockets.model';

export enum SignalRActions {
    DATA_UPDATE_SIGNALR_EVENT_TRY = 'DATA_UPDATE_SIGNALR_EVENT_TRY',
    CODE_CREATE_SIGNALR_EVENT_TRY = 'CODE_CREATE_SIGNALR_EVENT_TRY'
}

export class DataUpdateSignalREventAction {
    readonly type = SignalRActions.DATA_UPDATE_SIGNALR_EVENT_TRY;
    constructor(public payload?: SocketModel) {}
}

export class CodeCreateSignalREventAction {
    readonly type = SignalRActions.CODE_CREATE_SIGNALR_EVENT_TRY;
    constructor(public payload?: SocketCodeModel) {}
}


export type SignalRActionsUnion = DataUpdateSignalREventAction | CodeCreateSignalREventAction;
