import { Injectable } from '@angular/core';
import { IRole } from '../../shared/models/role.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, EMPTY, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private getAllRoles = environment.apiURL + 'RoleMaster/Get';
    constructor(private http: HttpClient) { }

    getRoles(): Observable<IRole[]> {
        return this.http.get(this.getAllRoles)
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
