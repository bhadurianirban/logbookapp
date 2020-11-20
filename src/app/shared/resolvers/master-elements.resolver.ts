import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { GetMasterElementsAction } from 'src/app/store/actions';
import * as fromRoot from '../../store/selectors';
import { Observable } from 'rxjs';
import { takeWhile, filter, map, take } from 'rxjs/operators';
import { MasterElementsData } from '../models/master-data.model';

@Injectable()
export class MasterElementsResolver implements Resolve<MasterElementsData>, OnDestroy {
    destroying = false;
    constructor(private store: Store<ApplicationState>) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<MasterElementsData> {
        this.initMasterData();
        return this.waitForMasterDataToLoad();
    }

    waitForMasterDataToLoad(): Observable<MasterElementsData> {
        return this.store.pipe(select(fromRoot.selectMasterElements),
        takeWhile(() => !this.destroying),
        filter(x => x.issued && !x.pending && !x.error),
        map(x => x),
        take(1)
        );
    }

    initMasterData(): void {
        this.store.select(state => state.masterElementsData).pipe(
            take(1)
        ).subscribe(data => {
            if (!data || !data.masterElements) {
                this.store.dispatch(new GetMasterElementsAction());
            }
        });
      }

    ngOnDestroy() {
        this.destroying = true;
    }
}
