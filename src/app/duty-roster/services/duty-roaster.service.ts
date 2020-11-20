import { Injectable } from '@angular/core';
import { IDutyRoaster } from '../../shared/models/duty-roaster.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IDutyRoasterMonthDataViewModel } from '../../shared/models/duty-roaster.model';
import { IRequestOptions } from 'src/app/shared/services/shift-summary.service';

@Injectable({
    providedIn: 'root'
})
export class DutyRoasterService {
    private getRoasterConfig = environment.apiURL + 'Roaster/Get/RoasterConfig';
    private addRoasterConfig = environment.apiURL + 'Roaster/Add/RoasterConfig';
    private getRoasterRpt = environment.apiURL + 'Roaster/GetReport';

    constructor(private http: HttpClient) { }

    getRoasterConfigData(date: any): Observable<IDutyRoaster> {
        return this.http.get(this.getRoasterConfig + '?yearMonth=' + date)
            .pipe(catchError(this.handleError));
    }
    getRoasterReport(date: any, isExcel: boolean): Observable<any> {
        const options: IRequestOptions  = {
            observe: 'response',
            responseType: 'blob' as 'json'
        };
        return this.http.get<any>(this.getRoasterRpt + '?yearMonth=' + date + '&isExcel=' + isExcel, options)
            .pipe(catchError(this.handleError));
    }
    addRoasterConfigData(data: IDutyRoasterMonthDataViewModel): Observable<IDutyRoaster> {
        const headerData = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
        const options = ({ headers: headerData });
        return this.http.post(this.addRoasterConfig, data, options)
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
