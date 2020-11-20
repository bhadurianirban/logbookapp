import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OutageModel } from '../shared/models/outage.model';
import { environment } from 'src/environments/environment';
import { TrippingModel } from '../shared/models/tripping.model';
import { AntiTheftModel } from '../shared/models/antiTheft.model';
import { ApprovedShutdownRequest } from '../shared/models/approved-shutdown.model';
import { AutoRecloseModel } from '../shared/models/auto-reclose.model';
import { FirstTimeChargeModel } from '../shared/models/first-time-charge.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricElementsService {

  constructor(private httpService: HttpClient) { }

  getOutageHistory(startDate: string, endDate: string): Observable<OutageModel[]> {
    return this.httpService.get<OutageModel[]>(`${environment.apiURL}HistoricElements/Outage?fromDate=${startDate}&toDate=${endDate}`);
  }

  getAutoRecloseHistory(startDate: string, endDate: string): Observable<AutoRecloseModel[]> {
    // tslint:disable-next-line:max-line-length
    return this.httpService.get<AutoRecloseModel[]>(`${environment.apiURL}HistoricElements/AutoReclose?fromDate=${startDate}&toDate=${endDate}`);
  }

  getFirstTimeChargeHistory(startDate: string, endDate: string): Observable<FirstTimeChargeModel[]> {
    // tslint:disable-next-line:max-line-length
    return this.httpService.get<FirstTimeChargeModel[]>(`${environment.apiURL}HistoricElements/FirstTimeCharge?fromDate=${startDate}&toDate=${endDate}`);
  }

  getTrippingHistory(startDate: string, endDate: string): Observable<TrippingModel[]> {
    // tslint:disable-next-line:max-line-length
    return this.httpService.get<TrippingModel[]>(`${environment.apiURL}HistoricElements/Tripping?fromDate=${startDate}&toDate=${endDate}`);
  }

  getAntiTheftHistory(startDate: string, endDate: string): Observable<AntiTheftModel[]> {
    // tslint:disable-next-line:max-line-length
    return this.httpService.get<AntiTheftModel[]>(`${environment.apiURL}HistoricElements/AntiTheft?fromDate=${startDate}&toDate=${endDate}`);
  }

  getShutdownHistory(startDate: string, endDate: string): Observable<ApprovedShutdownRequest[]> {
    // tslint:disable-next-line:max-line-length
    return this.httpService.get<ApprovedShutdownRequest[]>(`${environment.apiURL}HistoricElements/Shutdown?fromDate=${startDate}&toDate=${endDate}`);
  }
}
