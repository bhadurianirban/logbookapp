import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrippingValue } from 'src/app/shared/models/tripping-value.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrippingValuesService {

  constructor(private httpService: HttpClient) { }

  getAllTrippingData(): Observable<TrippingValue[]> {
    return this.httpService.get<TrippingValue[]>(`${environment.apiURL}TrippingMaster/AllData`);
  }

  addUpdateTrippingData(trippingData: TrippingValue): Observable<TrippingValue> {
    return this.httpService.post<TrippingValue>(`${environment.apiURL}TrippingMaster/AddEdit`, trippingData);
  }

  deleteTrippingData(trippingData: TrippingValue): Observable<TrippingValue> {
    return this.httpService.post<TrippingValue>(`${environment.apiURL}TrippingMaster/Delete`, trippingData);
  }
}
