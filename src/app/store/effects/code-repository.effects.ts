import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { LoadingIndicatorAction, CreateLogbookCodeSuccessAction,
     CreateDashboardCodeSuccessAction, CancelLogbookCodeSuccessAction,
      CancelDashboardCodeSuccessAction,
      GetDashboardShutdownAction,
      GetDashboardOutageAction,
      GetDashboardTrippingAction,
      GetDashboardAntitheftAction,
      GetDashboardAutoRecloseAction,
      GetDashboardFirstTimeChargeAction,
      GetLogbookCodesAction,
      DataUpdateSignalREventAction,
      CodeCreateSignalREventAction,
      CreateLoadCodeSuccessAction,
      GetLogbookRestrictionAction,
      GetLogbookReleaseAction} from '../actions/index';
import { CodeService } from 'src/app/shared/services/code.service';
import { MessageService } from 'primeng/api';
import { result } from 'lodash';

@Injectable()
export class CodeRepositoryEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private codeService: CodeService,
                private messageService: MessageService) {}

    @Effect()
    createLoadCodeEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.CREATE_LOAD_CODE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.CreateLoadCodeAction) =>
            this.codeService.createLoadCode(action.payload)
            .pipe(
                map(actionResult => {
                    if (action.payload.Type === 'LR') {
                        this.store.dispatch(new GetLogbookRestrictionAction(action.payload.LogbookId));
                    } else {
                        this.store.dispatch(new GetLogbookReleaseAction(action.payload.LogbookId));
                    }
                    return new CreateLoadCodeSuccessAction(actionResult);
                }),
                catchError(error => [new RootActions.CreateLoadCodeErrorAction(error)])
            )
        )
    );

    @Effect()
    createLoadCodeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.CREATE_LOAD_CODE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Code Create',
                 detail: 'Code created successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    createLoadCoderror$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.CREATE_LOAD_CODE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Code Create',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    createCodeEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.CREATE_CODE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.CreateCodeAction) =>
            this.codeService.createCode(action.payload.code)
            .pipe(
                map(result => {
                    this.store.dispatch(new CodeCreateSignalREventAction({
                        code: result.Code,
                        codeForElement: action.payload.code.ElementName,
                        codeForElementType: action.payload.code.CodeType,
                        codeType: action.payload.code.Type
                    }));
                    if (action.payload.createdFrom === 'logbook') {
                        this.store.dispatch(new GetLogbookCodesAction(action.payload.code.LogbookId));
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.code.LogbookId,
                            updatedItem: action.payload.code.Type,
                            updatedSubItem: 0,
                            isDashboardUpdated: false
                        }));
                        return new CreateLogbookCodeSuccessAction(result);
                    } else {
                        this.store.dispatch(new DataUpdateSignalREventAction({
                            logbookId : action.payload.code.LogbookId,
                            updatedItem: action.payload.code.Type,
                            updatedSubItem: 0,
                            isDashboardUpdated: true
                        }));
                        if (action.payload.code.ElementId !== result.ElementId) {
                            switch (action.payload.code.Type) {
                                case 'Outage':
                                    return new GetDashboardOutageAction();
                                case 'AutoReclose':
                                    return new GetDashboardAutoRecloseAction();
                                case 'FirstTimeCharge':
                                    return new GetDashboardFirstTimeChargeAction();
                                case 'Tripping':
                                    return new GetDashboardTrippingAction();
                                case 'AntiTheft':
                                    return new GetDashboardAntitheftAction();
                                default:
                                    return new GetDashboardShutdownAction();
                            }
                        } else {
                            return new CreateDashboardCodeSuccessAction(result);
                        }
                    }
                }),
                catchError(error => [new RootActions.CreateCodeErrorAction(error)])
            )
        )
    );

    @Effect()
    createCodeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.CREATE_LOGBOOK_CODE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Code Create',
                 detail: 'Code created successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    createDashboardCodeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.CREATE_DASHBOARD_CODE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Code Create',
                 detail: 'Code created successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    createCoderror$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.CREATE_CODE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Code Create',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    cancelCodeAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.CANCEL_CODE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.CancelCodeAction) =>
            this.codeService.cancelCode(action.payload.code)
            .pipe(
                map(result => {
                    if (action.payload.createdFrom === 'logbook') {
                        this.store.dispatch(new GetLogbookCodesAction(action.payload.code.LogbookId));
                        return new CancelLogbookCodeSuccessAction(result);
                    } else {
                        if (action.payload.code.ElementId !== result.ElementId) {
                            switch (action.payload.code.Type) {
                                case 'Outage':
                                    return new GetDashboardOutageAction();
                                case 'AutoReclose':
                                    return new GetDashboardAutoRecloseAction();
                                case 'FirstTimeCharge':
                                    return new GetDashboardFirstTimeChargeAction();
                                case 'Tripping':
                                    return new GetDashboardTrippingAction();
                                case 'AntiTheft':
                                    return new GetDashboardAntitheftAction();
                                default:
                                    return new GetDashboardShutdownAction();
                            }
                        } else {
                            return new CancelDashboardCodeSuccessAction(result);
                        }
                    }
                }),
                catchError(error => [new RootActions.CancelCodeErrorAction(error)])
            )
        )
    );

    @Effect()
    cancelLogbookCodeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.CANCEL_LOGBOOK_CODE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Cancel Code',
                 detail: 'Code cancelled successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    cancelDashboardCodeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.CANCEL_DASHBOARD_CODE_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Cancel Code',
                 detail: 'Code cancelled successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    cancelCoderror$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.CANCEL_CODE_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Cancel Code',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getLogbookCodesAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.GET_LOGBOK_CODES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetLogbookCodesAction) =>
            this.codeService.getLogbookCodes(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.GetLogbookCodesSuccessAction(result);
                }),
                 catchError(error => [new RootActions.GetLogbookCodesErrorAction(error)])
            )
        )
    );

    @Effect()
    getLogbookCodeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.GET_LOGBOK_CODES_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getLogbookCodeError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.GET_LOGBOK_CODES_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getAllCodesAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.GET_ALL_CODES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetAllCodesAction) =>
            this.codeService.getAllCodes(action.payload)
            .pipe(
                map(result => {
                    return new RootActions.GetAllCodesSuccessAction(result);
                }),
                 catchError(error => [new RootActions.GetAllCodesErrorAction(error)])
            )
        )
    );

    @Effect()
    getAllCodeSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.GET_ALL_CODES_SUCCESS),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getAllCodeError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.GET_ALL_CODES_ERROR),
             mergeMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getPendingCodesAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.CodeRepositoryActions.GET_PENDING_CODES_TRY),
        mergeMap((action: RootActions.GetPendingCodesAction) =>
            this.codeService.getPendingCodes()
            .pipe(
                map(result => {
                    return new RootActions.GetPendingCodesSuccessAction(result);
                }),
                 catchError(error => [new RootActions.GetPendingCodesErrorAction(error)])
            )
        )
    );
}
