import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstituentValue } from 'src/app/shared/models/constituent-value.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstituentValuesService {

  constructor(private httpService: HttpClient) { }

  getAllConstituentData(): Observable<ConstituentValue[]> {
    return this.httpService.get<ConstituentValue[]>(`${environment.apiURL}ConstituentMaster/AllData`);
  }

  addUpdateConstituentData(constituentData: ConstituentValue): Observable<ConstituentValue> {
    return this.httpService.post<ConstituentValue>(`${environment.apiURL}ConstituentMaster/AddEdit`, constituentData);
  }

  deleteConstituentData(constituentData: ConstituentValue): Observable<ConstituentValue> {
    return this.httpService.post<ConstituentValue>(`${environment.apiURL}ConstituentMaster/Delete`, constituentData);
  }
}
