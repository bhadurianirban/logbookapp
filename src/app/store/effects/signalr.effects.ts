import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ApplicationState } from '../state';
import { Store, Action } from '@ngrx/store';
import { SignalRService } from 'src/app/shared/services/signalr.service';
import { Observable } from 'rxjs';
import * as RootActions from '../actions/index';
import { tap } from 'rxjs/operators';

@Injectable()
export class SignalREffectService {
    constructor(private actions: Actions,
                private store: Store<ApplicationState>,
                private signalRService: SignalRService) {}

    @Effect({dispatch: false})
    updateDataSignalrAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SignalRActions.DATA_UPDATE_SIGNALR_EVENT_TRY),
        tap((payload: RootActions.DataUpdateSignalREventAction) => this.signalRService.broadcastUpdatedData(payload.payload))
    );

    @Effect({dispatch: false})
    CreateCodeSignalrAction$: Observable<Action> = this.actions.pipe(
        ofType(RootActions.SignalRActions.CODE_CREATE_SIGNALR_EVENT_TRY),
        tap((payload: RootActions.CodeCreateSignalREventAction) => this.signalRService.broadcastCreateCode(payload.payload))
    );
}
