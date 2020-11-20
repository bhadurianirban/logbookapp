import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { ApplicationState } from '../state';
import { DesignationService } from 'src/app/user-manage/services/designation.service';
import * as RootActions from '../actions/index';
import { map, catchError, tap, mergeMap } from 'rxjs/operators';
import { LoadingIndicatorAction } from '../actions/index';
import { Observable } from 'rxjs';

@Injectable()
export class DesignationEffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private designationService: DesignationService) { }

    @Effect()
    getDesignationData: Observable<Action> = this.actions.pipe(
        ofType(RootActions.DesignationRepositoryActions.GET_DESIGNATIONS_TRY),
        tap(() => this.store.dispatch(new LoadingIndicatorAction(true))),
        mergeMap((action: RootActions.GetDesignationAction) =>
            this.designationService.getDesignations()
                .pipe(
                map(result => {
                    return new RootActions.GetDesignationSuccessAction(result);
                }),
                catchError(error => [new RootActions.GetDesignationErrorAction(error)])
                )
        )
    );
}
