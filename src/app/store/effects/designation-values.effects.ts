import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { DesignationValuesService} from 'src/app/master-data/services/designation-values.service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap, mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';

@Injectable()
export class  DesignationValueEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private designationService: DesignationValuesService,
                private messageService: MessageService) {}

    @Effect()
    getDesignationValues$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.GET_DESIGNATION_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetDesignationValuesAction) =>
            this.designationService.getAllDesignationData()
                .pipe(
                    map(result => {
                        return new RootActions.GetDesignationValuesSuccessAction(result);
                    }),
                    catchError(error => [new RootActions.GetDesignationValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    getDesigntationSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.GET_DESIGNATION_VALUES_SUCCESS),
            mergeMap(() => {
                this.messageService.add(
                    { key: 'saveNotification', severity: 'success', summary: 'Get Designation',
                     detail: 'Designation values loaded successfully.', closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    getDesigntationError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.GET_DESIGNATION_VALUES_ERROR),
            mergeMap((error: any) => {
                this.messageService.add(
                    { key: 'errorNotification', severity: 'error', summary: 'Get Designation Values',
                     detail: 'Error - ' + error.payload.error, closable: true }
                  );
                return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addDesigntationValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.ADD_DESIGNATION_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions. AddDesignationValueAction) =>
        this.designationService.addUpdateDesignationData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.AddDesignationValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.AddDesignationValueErrorAction(error)])
        )
    )
    );

    @Effect()
    addDesigntationValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.ADD_DESIGNATION_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Add Designation',
                 detail: 'Designation Value has been added successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    addDesigntationValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.ADD_DESIGNATION_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Add Error',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateDesigntationValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.UPDATE_DESIGNATION_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.UpdateDesignationValueAction) =>
        this.designationService.addUpdateDesignationData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.UpdateDesignationValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.UpdateDesignationValueErrorAction(error)])
        )
    )
    );

    @Effect()
    updateDesigntationValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.UPDATE_DESIGNATION_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Update Designation',
                 detail: 'Designation Value has been updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    updateDesigntationValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.UPDATE_DESIGNATION_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Update Designation',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
    @Effect()
    deleteDesigntationData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.DELETE_DESIGNATION_VALUES_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.DeleteDesignationValuesAction) =>
        this.designationService.deleteDesignationData(action.payload)
                .pipe(
                map(result => {
                    return new RootActions.DeleteDesignationValuesSuccessAction(result);
                }),
                catchError(error => [new RootActions.DeleteDesignationValuesErrorAction(error)])
                )
        )
    );

    @Effect()
    deleteDesigntationSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.DELETE_DESIGNATION_VALUES_SUCCESS),
        switchMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Designation Value',
                 detail: 'Data updated successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    deleteDesigntationError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.DELETE_DESIGNATION_VALUES_ERROR),
        switchMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Designation Value',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    saveDesigntationValue$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.SAVE_DESIGNATION_VALUE_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        switchMap((action: RootActions.SaveDesignationValueAction) =>
        this.designationService.SaveDesignationData(action.payload)
        .pipe(
            map(result => {
                return new RootActions.SaveDesignationValueSuccessAction(result);
            }),
             catchError(error => [new RootActions.SaveDesignationValueErrorAction(error)])
        )
    )
    );

    @Effect()
    saveDesigntationValueSuccess$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.SAVE_DESIGNATION_VALUE_SUCCESS),
        mergeMap(() => {
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: 'Save Designation',
                 detail: 'Designation Value has been saved successfully.', closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );

    @Effect()
    saveDesigntationValueError$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationValueActions.SAVE_DESIGNATION_VALUE_ERROR),
        mergeMap((error: any) => {
            this.messageService.add(
                { key: 'errorNotification', severity: 'error', summary: 'Save Designation',
                 detail: 'Error - ' + error.payload.error, closable: true }
              );
            return [new LoadingIndicatorAction(false)];
        })
    );
}
