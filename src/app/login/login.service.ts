import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserViewModelInterface } from '../shared/models/user-management.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private httpService: HttpClient) {}

    login(username: string, pswd: string): Observable<IUserViewModelInterface> {
        return this.httpService.post<IUserViewModelInterface>(`${environment.apiURL}Account/Login`,
        { Username: username, Password: pswd });
    }

    getLoggedInUser(): any {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    getToken(): string {
        return localStorage.getItem('currentUser') != null ? JSON.parse(localStorage.getItem('currentUser')).user.token : '';
    }
}
