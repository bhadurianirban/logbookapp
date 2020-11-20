import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FSCTCSC, STATCOM } from '../models/logbook.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StatcomFsctcscService {
    constructor(private httpService: HttpClient) { }

    getFsctcscData(logbookId: string): Observable<FSCTCSC[]> {
        return this.httpService.get<FSCTCSC[]>(`${environment.apiURL}FscTcsc/Get?logbookId=${logbookId}`);
    }

    getStatcomData(logbookId: string): Observable<STATCOM[]> {
        return this.httpService.get<STATCOM[]>(`${environment.apiURL}Statcom/Get?logbookId=${logbookId}`);
    }
}
