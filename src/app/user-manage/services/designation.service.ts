import { Injectable } from '@angular/core';
import { IDesignation } from '../../shared/models/designation.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, EMPTY, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DesignationService {
    private getAllDesignations = environment.apiURL + 'DesignationMaster/GetAll';
    constructor(private http: HttpClient) { }

    getDesignations(): Observable<IDesignation[]> {
        return this.http.get(this.getAllDesignations)
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
