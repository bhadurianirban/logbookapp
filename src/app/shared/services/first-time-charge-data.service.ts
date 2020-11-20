import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FirstTimeChargeModel } from '../models/first-time-charge.model';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeChargeDataService {

  constructor(private httpService: HttpClient) { }

  addFirstTimeChargeData(data: FirstTimeChargeModel[]): Observable<FirstTimeChargeModel[]> {
    return this.httpService.post<FirstTimeChargeModel[]>(`${environment.apiURL}FirstTimeCharge/Add`, data);
  }

  updateFirstTimeChargeData(data: FirstTimeChargeModel): Observable<FirstTimeChargeModel> {
    return this.httpService.post<FirstTimeChargeModel>(`${environment.apiURL}FirstTimeCharge/Update`, data);
  }

  deleteFirstTimeChargeData(data: FirstTimeChargeModel): Observable<FirstTimeChargeModel> {
    return this.httpService.post<FirstTimeChargeModel>(`${environment.apiURL}FirstTimeCharge/Delete`, data);
  }

  getLogbookData(logbookId: string, type: number): Observable<FirstTimeChargeModel[]> {
    return this.httpService.get<FirstTimeChargeModel[]>
    (`${environment.apiURL}FirstTimeCharge/GetByLogbookandType?logbookId=${logbookId}&type=${type}`);
  }
}
