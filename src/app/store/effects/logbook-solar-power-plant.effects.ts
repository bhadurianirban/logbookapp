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
export class LogbookSolarPowerPlantsEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private logbookService: LogbookService,
                private messageService: MessageService) {}
                @Effect()
                getSolarPowerPlants$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SolarPowerPlantsActions.GET_SOLAR_POWER_PLANTS_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.GetSolarPowerPlantsAction) =>
                    this.logbookService.getSolarPowerGeneration(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.GetSolarPowerPlantsSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.GetSolarPowerPlantsErrorAction(error)])
                    )
                )
                );
                @Effect()
                getSolarPowerPlantsSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SolarPowerPlantsActions.GET_SOLAR_POWER_PLANTS_SUCCESS),
                    switchMap(() => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                getSolarPowerPlantsError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SolarPowerPlantsActions.GET_SOLAR_POWER_PLANTS_ERROR),
                    switchMap((error: any) => {
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addSolarPowerPlants$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SolarPowerPlantsActions.ADD_SOLAR_POWER_PLANTS_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.AddSolarPowerPlantsAction) =>
                    this.logbookService.addSolarPowerGeneration(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.AddSolarPowerPlantsSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.AddSolarPowerPlantsErrorAction(error)])
                    )
                )
                );
                @Effect()
                addSolarPowerPlantsSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SolarPowerPlantsActions.ADD_SOLAR_POWER_PLANTS_SUCCESS),
                    switchMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Add SolarPowerPlants',
                             detail: 'Solar Power Plants has been added successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                addSolarPowerPlantsError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SolarPowerPlantsActions.ADD_SOLAR_POWER_PLANTS_ERROR),
                    switchMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Add SolarPowerPlants',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateSolarPowerPlants$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SolarPowerPlantsActions.UPDATE_SOLAR_POWER_PLANTS_TRY),
                    tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
                    switchMap((action: RootActions.UpdateSolarPowerPlantsAction) =>
                    this.logbookService.updateSolarPowerGeneration(action.payload)
                    .pipe(
                        map(result => {
                            return new RootActions.UpdateSolarPowerPlantsSuccessAction(result);
                        }),
                            catchError(error => [new RootActions.UpdateSolarPowerPlantsErrorAction(error)])
                    )
                )
                );
                @Effect()
                updateSolarPowerPlantsSuccess$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SolarPowerPlantsActions.UPDATE_SOLAR_POWER_PLANTS_SUCCESS),
                    mergeMap(() => {
                        this.messageService.add(
                            { key: 'saveNotification', severity: 'success', summary: 'Update SolarPowerPlants',
                             detail: 'Solar Power Plants has been updated successfully.', closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
                @Effect()
                updateSolarPowerPlantsError$: Observable<Action> = this.actions.pipe(
                    ofType(RootActions.SolarPowerPlantsActions.ADD_SOLAR_POWER_PLANTS_ERROR),
                    mergeMap((error: any) => {
                        this.messageService.add(
                            { key: 'errorNotification', severity: 'error', summary: 'Update SolarPowerPlants',
                             detail: 'Error - ' + error.payload.error, closable: true }
                          );
                        return [new LoadingIndicatorAction(false)];
                    })
                );
    }
