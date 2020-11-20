import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AntiTheftModel } from '../models/antiTheft.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AntiTheftService {

    constructor(private httpService: HttpClient) { }

  addAntiTheftData(data: AntiTheftModel[]): Observable<AntiTheftModel[]> {
    return this.httpService.post<AntiTheftModel[]>(`${environment.apiURL}AntiTheft/Add`, data);
  }

  updateAntiTheftData(data: AntiTheftModel): Observable<AntiTheftModel> {
    return this.httpService.post<AntiTheftModel>(`${environment.apiURL}AntiTheft/Update`, data);
  }

  deleteAntiTheftData(data: AntiTheftModel): Observable<AntiTheftModel> {
    return this.httpService.post<AntiTheftModel>(`${environment.apiURL}AntiTheft/Delete`, data);
  }

  getLogbookData(logbookId: string, type: number): Observable<AntiTheftModel[]> {
    return this.httpService.get<AntiTheftModel[]>
    (`${environment.apiURL}AntiTheft/GetByLogbookandType?logbookId=${logbookId}&type=${type}`);
  }
}
