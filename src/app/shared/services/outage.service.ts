import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OutageModel } from 'src/app/shared/models/outage.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutageService {

  constructor(private httpService: HttpClient) { }

  addOutageData(data: OutageModel[]): Observable<OutageModel[]> {
    return this.httpService.post<OutageModel[]>(`${environment.apiURL}Outage/Add`, data);
  }

  updateOutageData(data: OutageModel): Observable<OutageModel> {
    return this.httpService.post<OutageModel>(`${environment.apiURL}Outage/Update`, data);
  }

  deleteOutageData(data: OutageModel): Observable<OutageModel> {
    return this.httpService.post<OutageModel>(`${environment.apiURL}Outage/Delete`, data);
  }

  getLogbookData(logbookId: string, type: number): Observable<OutageModel[]> {
    return this.httpService.get<OutageModel[]>
    (`${environment.apiURL}Outage/GetByLogbookandType?logbookId=${logbookId}&type=${type}`);
  }
}
