import { ApprovedShutdownRequest } from 'src/app/shared/models/approved-shutdown.model';

export enum ShutdownRequestActions {
    UPDATE_APPROVED_SHUTDOWN_TRY = 'UPDATE_APPROVED_SHUTDOWN_TRY',
    UPDATE_LOGBOOK_APPROVED_SHUTDOWN_SUCCESS = 'UPDATE_LOGBOOK_APPROVED_SHUTDOWN_SUCCESS',
    UPDATE_DASHBOARD_APPROVED_SHUTDOWN_SUCCESS = 'UPDATE_DASHBOARD_APPROVED_SHUTDOWN_SUCCESS',
    UPDATE_HISTORY_APPROVED_SHUTDOWN_SUCCESS = 'UPDATE_HISTORY_APPROVED_SHUTDOWN_SUCCESS',
    UPDATE_APPROVED_SHUTDOWN_ERROR = 'UPDATE_APPROVED_SHUTDOWN_ERROR',

    DEFER_SHUTDOWN_TRY = 'DEFER_SHUTDOWN_TRY',
    DEFER_LOGBBOK_SHUTDOWN_SUCCESS = 'DEFER_LOGBBOK_SHUTDOWN_SUCCESS',
    DEFER_DASHBOARD_SHUTDOWN_SUCCESS = 'DEFER_DASHBOARD_SHUTDOWN_SUCCESS',
    DEFER_HISTORY_SHUTDOWN_SUCCESS = 'DEFER_HISTORY_SHUTDOWN_SUCCESS',
    DEFER_SHUTDOWN_ERROR = 'DEFER_SHUTDOWN_ERROR',

    REFRESH_SHUTDOWN_TRY = 'REFRESH_SHUTDOWN_TRY',
    REFRESH_SHUTDOWN_SUCCESS = 'REFRESH_SHUTDOWN_SUCCESS',
    REFRESH_SHUTDOWN_ERROR = 'REFRESH_SHUTDOWN_ERROR',

    DOWNLOAD_SHUTDOWN_APPROVAL_TRY = 'DOWNLOAD_SHUTDOWN_APPROVAL_TRY',
    DOWNLOAD_SHUTDOWN_APPROVAL_SUCCESS = 'DOWNLOAD_SHUTDOWN_APPROVAL_SUCCESS',
    DOWNLOAD_SHUTDOWN_APPROVAL_ERROR = 'DOWNLOAD_SHUTDOWN_APPROVAL_ERROR'
}

export class UpdateApprovedShutdownAction {
    readonly type = ShutdownRequestActions.UPDATE_APPROVED_SHUTDOWN_TRY;
    constructor(public payload?: ApprovedShutdownRequest) {}
}

export class UpdateLogbookApprovedShutdownSuccessAction {
    readonly type = ShutdownRequestActions.UPDATE_LOGBOOK_APPROVED_SHUTDOWN_SUCCESS;
    constructor(public payload?: ApprovedShutdownRequest) {}
}

export class UpdateDashboardApprovedShutdownSuccessAction {
    readonly type = ShutdownRequestActions.UPDATE_DASHBOARD_APPROVED_SHUTDOWN_SUCCESS;
    constructor(public payload?: { updatedData?: ApprovedShutdownRequest, previousData?: ApprovedShutdownRequest }) {}
}

export class UpdateHistoryApprovedShutdownSuccessAction {
    readonly type = ShutdownRequestActions.UPDATE_HISTORY_APPROVED_SHUTDOWN_SUCCESS;
    constructor(public payload?: ApprovedShutdownRequest) {}
}

export class UpdateApprovedShutdownErrorAction {
    readonly type = ShutdownRequestActions.UPDATE_APPROVED_SHUTDOWN_ERROR;
    constructor(public payload?: any) {}
}

export class DeferShutdownAction {
    readonly type = ShutdownRequestActions.DEFER_SHUTDOWN_TRY;
    constructor(public payload?: ApprovedShutdownRequest) {}
}

export class DeferLogbookShutdownSuccessAction {
    readonly type = ShutdownRequestActions.DEFER_LOGBBOK_SHUTDOWN_SUCCESS;
    constructor(public payload?: ApprovedShutdownRequest) {}
}

export class DeferDashboardShutdownSuccessAction {
    readonly type = ShutdownRequestActions.DEFER_DASHBOARD_SHUTDOWN_SUCCESS;
    constructor(public payload?: ApprovedShutdownRequest) {}
}

export class DeferHistoryShutdownSuccessAction {
    readonly type = ShutdownRequestActions.DEFER_HISTORY_SHUTDOWN_SUCCESS;
    constructor(public payload?: ApprovedShutdownRequest) {}
}

export class DeferShutdownErrorAction {
    readonly type = ShutdownRequestActions.DEFER_SHUTDOWN_ERROR;
    constructor(public payload?: any) {}
}

export class RefreshShutdownAction {
    readonly type = ShutdownRequestActions.REFRESH_SHUTDOWN_TRY;
    constructor(public payload?: {logbookId: string, isIntervalCall: boolean, isDashBoardCall: boolean }) {}
}

export class RefreshShutdownSuccessAction {
    readonly type = ShutdownRequestActions.REFRESH_SHUTDOWN_SUCCESS;
    constructor(public payload?: ApprovedShutdownRequest[]) {}
}

export class RefreshShutdownErrorAction {
    readonly type = ShutdownRequestActions.REFRESH_SHUTDOWN_ERROR;
    constructor(public payload?: any) {}
}

export class DownloadApprovalAction {
    readonly type = ShutdownRequestActions.DOWNLOAD_SHUTDOWN_APPROVAL_TRY;
    constructor(public payload?: number) {}
}

export class DownloadApprovalSuccessAction {
    readonly type = ShutdownRequestActions.DOWNLOAD_SHUTDOWN_APPROVAL_SUCCESS;
    constructor(public payload?: any) {}
}

export class DownloadApprovalErrorAction {
    readonly type = ShutdownRequestActions.DOWNLOAD_SHUTDOWN_APPROVAL_ERROR;
    constructor(public payload?: any) {}
}

export type ShutdownRequestActionsUnion = UpdateApprovedShutdownAction
| UpdateDashboardApprovedShutdownSuccessAction | UpdateLogbookApprovedShutdownSuccessAction | UpdateApprovedShutdownErrorAction
| DeferShutdownAction | DeferLogbookShutdownSuccessAction | DeferDashboardShutdownSuccessAction | DeferShutdownErrorAction
| RefreshShutdownAction | RefreshShutdownSuccessAction | RefreshShutdownErrorAction
| DeferHistoryShutdownSuccessAction | UpdateHistoryApprovedShutdownSuccessAction
| DownloadApprovalAction | DownloadApprovalSuccessAction | DownloadApprovalErrorAction;
