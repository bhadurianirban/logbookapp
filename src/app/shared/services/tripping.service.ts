import { HttpClient } from '@angular/common/http';
import { TrippingModel } from 'src/app/shared/models/tripping.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TrippingService {

    constructor(private httpService: HttpClient) { }

    addTripping(trippingData: TrippingModel[]): Observable<TrippingModel[]> {
        return this.httpService.post<TrippingModel[]>(`${environment.apiURL}Tripping/Add`, trippingData);
    }

    updateTripping(trippingData: TrippingModel): Observable<TrippingModel> {
        return this.httpService.post<TrippingModel>(`${environment.apiURL}Tripping/Update`, trippingData);
    }

    deleteTripping(trippingData: TrippingModel): Observable<TrippingModel> {
        return this.httpService.post<TrippingModel>(`${environment.apiURL}Tripping/Delete`, trippingData);
    }

    getLogbookData(logbookId: string, type: number): Observable<TrippingModel[]> {
        return this.httpService.get<TrippingModel[]>
        (`${environment.apiURL}Tripping/GetByLogbookandType?logbookId=${logbookId}&type=${type}`);
      }
}
