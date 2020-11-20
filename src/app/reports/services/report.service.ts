import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IViolationMessageReport, IElementWiseReport, ITieLinesReport } from '../reports.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpService: HttpClient) { }

  getViolationMessageReport(start: string, end: string): Observable<IViolationMessageReport[]> {
    return this.httpService.get<IViolationMessageReport[]>
    (`${environment.apiURL}Reports/ViolationMessage?startDate=${start}&endDate=${end}`);
  }

  getElementWiseReport(start: string, end: string, elementId: number): Observable<IElementWiseReport[]> {
    return this.httpService.get<IElementWiseReport[]>
    (`${environment.apiURL}Reports/ElementWiseReport?startDate=${start}&endDate=${end}&elementId=${elementId}`);
  }
  getTieLinesReport(date: string): Observable<ITieLinesReport[]> {
    return this.httpService.get<ITieLinesReport[]>
    (`${environment.apiURL}Reports/TieLines?Date=${date}`);
  }
}
