import { Injectable } from '@angular/core';
import { IUserInterface, IUserViewModelInterface } from '../../shared/models/user-management.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, EMPTY, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserManagementService {
    private getAllUsers = environment.apiURL + 'UserMaster/Get/Users';
    private addUser = environment.apiURL + 'UserMaster/AddEdit';
    private deleteUser = environment.apiURL + 'UserMaster/Delete';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<IUserViewModelInterface[]> {
        return this.http.get(this.getAllUsers)
            .pipe(catchError(this.handleError));
    }
    addUserData(data: IUserInterface): Observable<IUserViewModelInterface> {
        const headerData = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
        const options = ({ headers: headerData });
        return this.http.post(this.addUser, data, options)
            .pipe(catchError(this.handleError));
    }
    deleteUserData(data: IUserInterface): Observable<IUserViewModelInterface> {
        const headerData = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
        const options = ({ headers: headerData });
        return this.http.post(this.deleteUser, data, options)
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
