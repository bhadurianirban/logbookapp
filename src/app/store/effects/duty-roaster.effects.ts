import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { DutyRoasterService } from 'src/app/duty-roster/services/duty-roaster.service';
import * as RootActions from '../actions/index';
import { map, catchError, tap, mergeMap, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class DutyRoasterEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private dutyRoasterService: DutyRoasterService,
                private messageService: MessageService) { }

    @Effect()
    getDutyRoasterData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DutyRoasterActions.GET_ROASTER_CONFIG_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetDutyRoasterConfigAction) =>
            this.dutyRoasterService.getRoasterConfigData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.GetDutyRoasterConfigSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetDutyRoasterConfigErrorAction(error)])
                )
        )
    );

    @Effect()
    getDutyRoasterSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DutyRoasterActions.GET_ROASTER_CONFIG_SUCCESS),
        switchMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDutyRoasterError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DutyRoasterActions.GET_ROASTER_CONFIG_ERROR),
        switchMap(() => {
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    createDutyRoasterData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DutyRoasterActions.CREATE_ROASTER_CONFIG_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.CreateDutyRoasterConfigAction) =>
            this.dutyRoasterService.addRoasterConfigData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.CreateDutyRoasterConfigSuccessAction(result);
                }),
                catchError(error => [new RootActions.CreateDutyRoasterConfigErrorAction(error)])
                )
        )
    );

    @Effect()
    createDutyRoasterSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DutyRoasterActions.CREATE_ROASTER_CONFIG_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Roster Data',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    createDutyRoasterError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DutyRoasterActions.CREATE_ROASTER_CONFIG_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Create Duty Roster',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    rptDutyRoasterData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DutyRoasterActions.RPT_ROASTER_CONFIG_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.RptDutyRoasterConfigAction) =>
            this.dutyRoasterService.getRoasterReport(action.payload.month, action.payload.isExcel)
                .pipe(
                map(result => {
                    const contentDisposition = result.headers.get('content-disposition');
                    const filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
                    return new RootActions.RptDutyRoasterConfigSuccessAction(
                        {
                            data: result,
                            isExcel: action.payload.isExcel,
                            fileName: filename
                        }
                    );
                }),
                catchError(error => [new RootActions.RptDutyRoasterConfigErrorAction(error)])
                )
        )
    );

    @Effect()
    rptDutyRoasterSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DutyRoasterActions.RPT_ROASTER_CONFIG_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Roster Data',
                 detail: 'Report created successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    rptDutyRoasterError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DutyRoasterActions.RPT_ROASTER_CONFIG_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Get Duty Roster Report',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

}
