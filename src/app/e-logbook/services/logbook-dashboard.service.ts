import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LogbookDashboard } from 'src/app/shared/models/logbook-dashboard.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class LogbookDashboardService {
    constructor(private httpService: HttpClient) {}

    getLogbookDashboardData(month: string): Observable<LogbookDashboard[]> {
        return this.httpService.get<LogbookDashboard[]>(`${environment.apiURL}LogbookDashboard/Get?month=${month}`);
    }
  }
