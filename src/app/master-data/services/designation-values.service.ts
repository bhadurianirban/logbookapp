import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DesignationValue } from 'src/app/shared/models/designation-value.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DesignationValuesService {

  constructor(private httpService: HttpClient) { }

  getAllDesignationData(): Observable<DesignationValue[]> {
    return this.httpService.get<DesignationValue[]>(`${environment.apiURL}DesignationMaster/GetAll`);
  }

  addUpdateDesignationData(designationData: DesignationValue): Observable<DesignationValue> {
    return this.httpService.post<DesignationValue>(`${environment.apiURL}DesignationMaster/AddEdit`, designationData);
  }

  deleteDesignationData(designationData: DesignationValue): Observable<DesignationValue> {
    return this.httpService.post<DesignationValue>(`${environment.apiURL}DesignationMaster/Delete`, designationData);
  }
  SaveDesignationData(designationData: DesignationValue[]): Observable<DesignationValue[]> {
    return this.httpService.post<DesignationValue[]>(`${environment.apiURL}DesignationMaster/Save`, designationData);
  }
}
