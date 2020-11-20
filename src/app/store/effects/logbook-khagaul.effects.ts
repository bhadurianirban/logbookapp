import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { LogbookService } from 'src/app/e-logbook/services/logbook.service';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { LoadingIndicatorAction } from '../actions/index';
import { tap, switchMap, map, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class LogbookKhagaulEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}
                @Effect()
                getKhagaul$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.KhagaulActions.GET_KHAGAUL_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.GetKhagaulAction) =>
                    this.logbookService.getKhagaul(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.GetKhagaulSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.GetKhagaulErrorAction(error)])
                    )
                )
                );
                @Effect()
                getKhagaulSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.KhagaulActions.GET_KHAGAUL_SUCCESS),
                    switchMap(() => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                getKhagaulError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.KhagaulActions.GET_KHAGAUL_ERROR),
                    switchMap((error: any) => {
                    return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addKhagaul$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.KhagaulActions.ADD_KHAGAUL_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.AddKhagaulAction) =>
                    this.logbookService.addKhagaul(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.AddKhagaulSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.AddKhagaulErrorAction(error)])
                    )
                )
                );
                @Effect()
                addKhagaulSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.KhagaulActions.ADD_KHAGAUL_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Add Khagaul',
                             detail: 'Khagaul has been added successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addKhagaulError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.KhagaulActions.ADD_KHAGAUL_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Add Khagaul',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateKhagaul$: Observable<Action> = this.actions.pipe(
                ofType(RootActions.KhagaulActions.UPDATE_KHAGAUL_TRY),
                tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                switchMap((action: RootActions.UpdateKhagaulAction) =>
                this.logbookService.updateKhagaul(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.UpdateKhagaulSuccessAction(result);
                }),
                catchError(error => [new RootActions.UpdateKhagaulErrorAction(error)])
        )
    )
    );

    @Effect()
    updateKhagaulSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.KhagaulActions.UPDATE_KHAGAUL_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Khagaul',
                 detail: 'Khagaul Value has been updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateKhagaulError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.KhagaulActions.UPDATE_KHAGAUL_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Khagaul',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
    }
