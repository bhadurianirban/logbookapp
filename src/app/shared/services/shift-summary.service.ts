import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface IRequestOptions {
    body?: any;
    headers?: HttpHeaders | { [header: string]: string | Array<string> };
    observe?: any;
    params?: HttpParams | { [param: string]: string | Array<string> };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ShiftReportService {
    constructor(private httpService: HttpClient) { }

    getShiftSummaryReport(logbookId: string, isExcel: boolean): Observable<any> {
        const options: IRequestOptions  = {
            observe: 'response',
            responseType: 'blob' as 'json'
        };
        return this.httpService.get<any>
        (`${environment.apiURL}ShiftReports/ShiftSummary?RequestId=${logbookId}&isExcel=${isExcel}`, options);
    }

    getShiftHOReport(logbookId: string, isExcel: boolean): Observable<any> {
        const options: IRequestOptions  = {
            observe: 'response',
            responseType: 'blob' as 'json'
        };
        return this.httpService.get<any>
        (`${environment.apiURL}ShiftReports/ShiftHandover?RequestId=${logbookId}&isExcel=${isExcel}`, options);
    }
}
