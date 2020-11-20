import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AutoRecloseModel } from '../models/auto-reclose.model';

@Injectable({
  providedIn: 'root'
})
export class AutoRecloseService {

  constructor(private httpService: HttpClient) { }

  addAutoRecloseData(data: AutoRecloseModel[]): Observable<AutoRecloseModel[]> {
    return this.httpService.post<AutoRecloseModel[]>(`${environment.apiURL}AutoReclose/Add`, data);
  }

  updateAutoRecloseData(data: AutoRecloseModel): Observable<AutoRecloseModel> {
    return this.httpService.post<AutoRecloseModel>(`${environment.apiURL}AutoReclose/Update`, data);
  }

  deleteAutoRecloseData(data: AutoRecloseModel): Observable<AutoRecloseModel> {
    return this.httpService.post<AutoRecloseModel>(`${environment.apiURL}AutoReclose/Delete`, data);
  }

  getLogbookData(logbookId: string, type: number): Observable<AutoRecloseModel[]> {
    return this.httpService.get<AutoRecloseModel[]>
    (`${environment.apiURL}AutoReclose/GetByLogbookandType?logbookId=${logbookId}&type=${type}`);
  }
}
