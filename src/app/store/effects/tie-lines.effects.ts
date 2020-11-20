import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TieLineService } from 'src/app/shared/services/tie-lines.service';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { LoadingIndicatorAction, GetPendingCodesAction, DataUpdateSignalREventAction } from '../actions/index';
import { tap, switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class TieLineEffectService {
    constructor(private actions: Actions,
        private store: Store<ApplicationState>,
        private tieLineService: TieLineService,
        private messageService: MessageService) { }

    @Effect()
    captureLineData$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TieLineActions.CAPTURE_TIE_LINE_DATA_TRY),
        switchMap((action: RootActions.CaptureTieLineAction) =>
            this.tieLineService.captureTieLineData(action.payload)
                .pipe(
                    map(result => {
                        return new RootActions.CaptureTieLineSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.CaptureTieLineErrorAction(error)])
                )
        )
    );

    @Effect()
    captureLineDataSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TieLineActions.CAPTURE_TIE_LINE_DATA_SUCCESS),
            mergeMap(() => {
                this.messageService.add(
                    { key: 'saveNotification', severity: 'success', summary: 'Get Line Values',
                     detail: 'Line values loaded successfully.', closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getFirstTimeChargeLineError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TieLineActions.CAPTURE_TIE_LINE_DATA_ERROR),
            mergeMap((error: any) => {
                this.messageService.add(
                    { key: 'errorNotification', severity: 'error', summary: 'Get Line Values',
                     detail: 'Error - ' + error.payload.error, closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );


    @Effect()
    updateTieLinesEffect$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TieLineActions.UPDATE_TIE_LINE_DATA_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateTieLineAction) =>
            this.tieLineService.updateTieLineData(action.payload)
                .pipe(
                    map(result => {
                        {
                            return new RootActions.UpdateTieLineSuccessAction(result);
                        }
                    }),
                    catchError(error => [new RootActions.UpdateTieLineErrorAction(error)])
                )
        )
    );

    @Effect()
    updateTieLinesSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TieLineActions.UPDATE_TIE_LINE_DATA_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                {
                    key: 'saveNotification', severity: 'success', summary: 'Update Line',
                    detail: 'Line Value has been updated successfully.', closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateTieLinesError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.TieLineActions.UPDATE_TIE_LINE_DATA_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                {
                    key: 'errorNotification', severity: 'error', summary: 'Update Line',
                    detail: 'Error - ' + error.payload.error, closable: true
                }
            );
            return [new LoadingIndicatorAction(false)];
        })
    );

}
