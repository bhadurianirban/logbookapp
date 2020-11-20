import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeSummaryModel } from 'src/app/shared/models/employee-summary.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmployeeSummaryService {
    constructor(private http: HttpClient) { }

    getSummary(month: string): Observable<EmployeeSummaryModel> {
        return this.http.get<EmployeeSummaryModel>(`${environment.apiURL}EmployeeSummary/GetReport?yearMonth=${month}`);
      }
}
