import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FirstTimeChargeLine } from 'src/app/shared/models/first-time-charge-lines.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeChargeLineValuesService {

  constructor(private httpService: HttpClient) { }

  getAllFirstTimeChargeLineData(): Observable<FirstTimeChargeLine[]> {
    return this.httpService.get<FirstTimeChargeLine[]>(`${environment.apiURL}FirstTimeChargeLineMaster/Get/All`);
  }

  addUpdateFirstTimeChargeLineData(configData: FirstTimeChargeLine): Observable<FirstTimeChargeLine> {
    return this.httpService.post<FirstTimeChargeLine>(`${environment.apiURL}FirstTimeChargeLineMaster/Add`, configData);
  }
}
