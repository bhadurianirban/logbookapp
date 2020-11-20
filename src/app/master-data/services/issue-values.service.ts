import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IssueValue } from 'src/app/shared/models/issue-value.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IssueValuesService {

  constructor(private httpService: HttpClient) { }

  getAllIssueData(): Observable<IssueValue[]> {
    return this.httpService.get<IssueValue[]>(`${environment.apiURL}IssuesMaster/AllData`);
  }

  addUpdateIssueData(issueData: IssueValue): Observable<IssueValue> {
    return this.httpService.post<IssueValue>(`${environment.apiURL}IssuesMaster/AddEdit`, issueData);
  }

  deleteIssueData(issueData: IssueValue): Observable<IssueValue> {
    return this.httpService.post<IssueValue>(`${environment.apiURL}IssuesMaster/Delete`, issueData);
  }
}
