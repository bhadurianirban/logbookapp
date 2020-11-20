import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { LoadingIndicatorAction } from 'src/app/store/actions';

@Injectable({
    providedIn: 'root'
})
export class LoadingInterceptorService {

    activeRequests = 0;

    constructor(private store: Store<ApplicationState>) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.activeRequests >= 0) {
            this.store.dispatch(new LoadingIndicatorAction(true));
        }

        this.activeRequests++;

        return next.handle(request).pipe(
            finalize(() => {
                this.activeRequests--;
                if (this.activeRequests === 0) {
                    this.store.dispatch(new LoadingIndicatorAction(false));
                }
            })
        );
    }
}
