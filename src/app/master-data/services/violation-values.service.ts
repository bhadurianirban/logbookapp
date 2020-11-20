import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViolationValue } from 'src/app/shared/models/violation-value.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViolationValuesService {

  constructor(private httpService: HttpClient) { }

  getAllViolationData(): Observable<ViolationValue[]> {
    return this.httpService.get<ViolationValue[]>(`${environment.apiURL}ViolationMaster/AllData`);
  }

  addUpdateViolationData(violationData: ViolationValue): Observable<ViolationValue> {
    return this.httpService.post<ViolationValue>(`${environment.apiURL}ViolationMaster/AddEdit`, violationData);
  }

  deleteViolationData(violationData: ViolationValue): Observable<ViolationValue> {
    return this.httpService.post<ViolationValue>(`${environment.apiURL}ViolationMaster/Delete`, violationData);
  }
}
