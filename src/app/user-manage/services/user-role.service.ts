import { Injectable } from '@angular/core';
import { IUserRoleMap, IUserRoleMapView } from '../user-role-map/user-role-map.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, EMPTY, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserRoleService {
    private getAllUserRoleMapping = environment.apiURL + 'UserRoleMap/Get';
    private addUserRoleMapping = environment.apiURL + 'UserRoleMap/Add';
    private deleteUserRoleMapping = environment.apiURL + 'UserRoleMap/Delete';

    constructor(private http: HttpClient) { }

    getUserRoles(): Observable<IUserRoleMapView[]> {
        return this.http.get(this.getAllUserRoleMapping)
            .pipe(catchError(this.handleError));
    }
    addUserRoleData(data: IUserRoleMap): Observable<IUserRoleMapView> {
        const headerData = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
        const options = ({ headers: headerData });
        return this.http.post(this.addUserRoleMapping, data, options)
            .pipe(catchError(this.handleError));
    }
    deleteUserRoleData(data: IUserRoleMap): Observable<IUserRoleMapView> {
        const headerData = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
        const options = ({ headers: headerData });
        return this.http.post(this.deleteUserRoleMapping, data, options)
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
