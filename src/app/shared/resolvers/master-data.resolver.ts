import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { GetCommonMasterDataAction } from 'src/app/store/actions';
import * as fromRoot from '../../store/selectors';
import { Observable } from 'rxjs';
import { takeWhile, map, take, filter } from 'rxjs/operators';
import { MasterData } from '../models/master-data.model';

@Injectable()
export class MasterDataResolver implements Resolve<MasterData>, OnDestroy {
    destroying = false;
    constructor(private store: Store<ApplicationState>) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<MasterData> {
        this.initMasterData();
        return this.waitForMasterDataToLoad();
    }

    waitForMasterDataToLoad(): Observable<MasterData> {
        return this.store.pipe(select(fromRoot.selectCommonMasterData),
        takeWhile(() => !this.destroying),
        filter(x => x.issued && !x.pending && !x.error),
        map(x => x),
        take(1)
        );
    }

    initMasterData(): void {
        this.store.select(state => state.commonMasterStoreData).pipe(
            take(1)
        ).subscribe(data => {
            if (!data || !data.commonMaster) {
                this.store.dispatch(new GetCommonMasterDataAction());
            }
        });
      }

    ngOnDestroy() {
        this.destroying = true;
    }
}
