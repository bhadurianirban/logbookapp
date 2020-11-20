import { Injectable } from '@angular/core';
import { IRoasterGroupUser, IRoasterGroupUserViewModel, IRoasterGroupUserCombination } from '../../shared/models/roaster-group-user.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class RoasterGroupUserService {
    private addRoasterGroupUser = environment.apiURL + 'Roaster/Add/RoasterGroupUser';
    private getRoasterGroupUsers = environment.apiURL + 'Roaster/Get/RoasterGroupUsers';
    private deleteRoasterGroupUsers = environment.apiURL + 'Roaster/Delete';
    constructor(private http: HttpClient) { }

    getRoasterGroupUserData(date: any): Observable<IRoasterGroupUserViewModel[]> {
        date = date.replace('/', '-');
        return this.http.get(this.getRoasterGroupUsers + '?selectedMonth=' + date)
            .pipe(catchError(this.handleError));
    }
    addRoasterGroupUserData(data: IRoasterGroupUserCombination): Observable<IRoasterGroupUserCombination> {
        const headerData = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
        const options = ({ headers: headerData });
        return this.http.post(this.addRoasterGroupUser, data, options)
            .pipe(catchError(this.handleError));
    }
    deleteRoasterGroupUserData(data: IRoasterGroupUser): Observable<IRoasterGroupUserCombination> {
        const headerData = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
        const options = ({ headers: headerData });
        return this.http.post(this.deleteRoasterGroupUsers, data, options)
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
