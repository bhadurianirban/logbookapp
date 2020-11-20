import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IDashboard } from '../../shared/models/dashboard-model';
import { environment } from 'src/environments/environment';
import { ApprovedShutdownRequest } from 'src/app/shared/models/approved-shutdown.model';
import { OutageModel } from 'src/app/shared/models/outage.model';
import { TrippingModel } from 'src/app/shared/models/tripping.model';
import { AntiTheftModel } from 'src/app/shared/models/antiTheft.model';
import { AutoRecloseModel } from 'src/app/shared/models/auto-reclose.model';
import { FirstTimeChargeModel } from 'src/app/shared/models/first-time-charge.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpService: HttpClient) { }

  getDashboardData(): Observable<IDashboard> {
    return this.httpService.get<IDashboard>(`${environment.apiURL}Dashboard/Get`);
  }

  getDashboardShutdownData(): Observable<ApprovedShutdownRequest[]> {
    return this.httpService.get<ApprovedShutdownRequest[]>(`${environment.apiURL}ApprovedShutdown/GetDashboardRequests`);
  }

  getDashboardOutageData(): Observable<OutageModel[]> {
    return this.httpService.get<OutageModel[]>(`${environment.apiURL}Outage/GetDashboardRequests`);
  }

  getDashboardAutoRecloseData(): Observable<AutoRecloseModel[]> {
    return this.httpService.get<AutoRecloseModel[]>(`${environment.apiURL}AutoReclose/GetDashboardRequests`);
  }

  getDashboardFirstTimeChargeData(): Observable<FirstTimeChargeModel[]> {
    return this.httpService.get<FirstTimeChargeModel[]>(`${environment.apiURL}FirstTimeCharge/GetDashboardRequests`);
  }

  getDashboardTrippingData(): Observable<TrippingModel[]> {
    return this.httpService.get<TrippingModel[]>(`${environment.apiURL}Tripping/GetDashboardRequests`);
  }

  getDashboardAntiTheftData(): Observable<AntiTheftModel[]> {
    return this.httpService.get<AntiTheftModel[]>(`${environment.apiURL}AntiTheft/GetDashboardRequests`);
  }
}
