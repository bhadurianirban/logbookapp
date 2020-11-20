import { Injectable } from '@angular/core';
import { IRoasterGroup } from '../../shared/models/roaster-group.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RoasterGroupService {
    private getAllGroups = environment.apiURL + 'Roaster/Get/RoasterGroups';
    constructor(private http: HttpClient) { }

    getGroups(): Observable<IRoasterGroup[]> {
        return this.http.get(this.getAllGroups)
            .pipe(catchError(this.handleError));
    }
    private handleError(error: HttpErrorResponse): Observable<any> {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${error.error.message}`;
        } else {
            errorMessage = `${error.error}`;
        }
        return throwError(errorMessage);
    }

}
