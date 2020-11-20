import { Injectable, OnDestroy } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Logbook } from 'src/app/shared/models/logbook.model';
import { ApplicationState } from 'src/app/store/state';
import { Store, select } from '@ngrx/store';
import { LoadLogbookDetailsAction } from 'src/app/store/actions';
import { Observable } from 'rxjs';
import * as fromRoot from '../../store/selectors';
import { takeWhile, map, take } from 'rxjs/operators';

@Injectable()
export class LogbookResolver implements Resolve<Logbook>, OnDestroy {
    destroying = false;
    requestId: string;
    constructor(private store: Store<ApplicationState>) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Logbook> {
        this.requestId = route.params.id || route.params.requestId;
        this.initLogbookData();
        return this.waitForLogbookDataToLoad();
    }

    waitForLogbookDataToLoad(): Observable<Logbook> {
        return this.store.pipe(select(fromRoot.selectCurrentLogbook),
        takeWhile(() => !this.destroying),
        map(x => x),
        take(1)
        );
    }

    initLogbookData() {
        this.store.dispatch(new LoadLogbookDetailsAction(this.requestId));
    }

    ngOnDestroy() {
        this.destroying = true;
    }
}
