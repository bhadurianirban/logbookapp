import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { ApprovedShutdownRequest } from '../models/approved-shutdown.model';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ShutdownService {
    private httpClient: HttpClient;
    constructor(private httpService: HttpClient,
                private backEnd: HttpBackend) {
                    this.httpClient = new HttpClient(backEnd);
                 }

    updateShutdownData(data: ApprovedShutdownRequest): Observable<ApprovedShutdownRequest> {
        return this.httpService.post<ApprovedShutdownRequest>(`${environment.apiURL}ApprovedShutdown/Update`, data);
    }

    deferShutdown(data: ApprovedShutdownRequest): Observable<ApprovedShutdownRequest> {
        return this.httpService.post<ApprovedShutdownRequest>(`${environment.apiURL}ApprovedShutdown/Defer`, data);
    }

    refreshShutdownData(logbookId: string, isIntervalCall: boolean): Observable<ApprovedShutdownRequest[]> {
        if (isIntervalCall) {
            return this.httpClient.get<ApprovedShutdownRequest[]>
            (`${environment.apiURL}Reports/RefreshShutdownData?logbookId=${logbookId}`);
        } else {
            return this.httpService.get<ApprovedShutdownRequest[]>
            (`${environment.apiURL}Reports/RefreshShutdownData?logbookId=${logbookId}`);
        }

    }

    getLogbookData(logbookId: string, type: number): Observable<ApprovedShutdownRequest[]> {
        return this.httpService.get<ApprovedShutdownRequest[]>
        (`${environment.apiURL}Reports/GetByLogbookandType?logbookId=${logbookId}&type=${type}`);
      }

    getShutdownApprovalPDF(requestId: number): Observable<any> {
        const url = environment.shutdownApprovalURL + 'PlannedOutage/DownloadApprovedShutdownRequestToPdf?requestid=' + requestId;
        return of(window.open(url, '_blank'));
    }
}
