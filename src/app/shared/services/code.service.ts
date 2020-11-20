import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CodeBase, CodeBaseViewModel } from '../models/code-base.model';
import { Observable } from 'rxjs';
import { LoadViewModel } from '../models/load-management.model';

@Injectable({
    providedIn: 'root'
  })
  export class CodeService {
    constructor(private httpService: HttpClient) { }

    createCode(codeBase: CodeBase): Observable<CodeBase> {
      return this.httpService.post<CodeBase>(`${environment.apiURL}Code/AddCode`, codeBase);
    }

    createLoadCode(loadData: LoadViewModel): Observable<CodeBase> {
      return this.httpService.post<CodeBase>(`${environment.apiURL}LoadManagement/CreateLoadCode`, loadData);
    }

    cancelCode(codeBase: CodeBase): Observable<CodeBase> {
      return this.httpService.post<CodeBase>(`${environment.apiURL}Code/CancelCode`, codeBase);
    }

    getLogbookCodes(logbookId: string): Observable<CodeBaseViewModel[]> {
      return this.httpService.get<CodeBaseViewModel[]>(`${environment.apiURL}CodeRepository/GetByLogbookId?logbookId=${logbookId}`);
    }

    getAllCodes(month: string): Observable<CodeBaseViewModel[]> {
      return this.httpService.get<CodeBaseViewModel[]>(`${environment.apiURL}CodeRepository/Codes?month=${month}`);
    }

    getPendingCodes(): Observable<CodeBaseViewModel[]> {
      return this.httpService.get<CodeBaseViewModel[]>(`${environment.apiURL}CodeRepository/PendingCodes`);
    }
  }
