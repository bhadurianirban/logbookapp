import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchedulingValue } from 'src/app/shared/models/scheduling-value.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchedulingValuesService {

  constructor(private httpService: HttpClient) { }

  getAllSchedulingData(): Observable<SchedulingValue[]> {
    return this.httpService.get<SchedulingValue[]>(`${environment.apiURL}SchedulingMaster/AllData`);
  }

  addUpdateSchedulingData(schedulingData: SchedulingValue): Observable<SchedulingValue> {
    return this.httpService.post<SchedulingValue>(`${environment.apiURL}SchedulingMaster/AddEdit`, schedulingData);
  }

  deleteSchedulingData(schedulingData: SchedulingValue): Observable<SchedulingValue> {
    return this.httpService.post<SchedulingValue>(`${environment.apiURL}SchedulingMaster/Delete`, schedulingData);
  }
}
