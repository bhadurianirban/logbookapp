import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DayWiseTieLine } from '../models/load-management.model';

@Injectable({
  providedIn: 'root'
})
export class TieLineService {

  constructor(private httpService: HttpClient) { }

  captureTieLineData(time: string): Observable<DayWiseTieLine[]> {
    return this.httpService.get<DayWiseTieLine[]>
    (`${environment.apiURL}DayWiseTieLine/GetScadaData?passedTime=${time}`);
  }

  updateTieLineData(data: DayWiseTieLine[]): Observable<DayWiseTieLine[]> {
    return this.httpService.post<DayWiseTieLine[]>(`${environment.apiURL}DayWiseTieLine/UpdateScadaData`, data);
  }
}
