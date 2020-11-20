import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IALDCLoadModel, LoadConstituent } from '../shared/models/load-management.model';

@Injectable({
  providedIn: 'root'
})
export class AldcLoadService {

  constructor(private http: HttpClient) { }

  getLoads(region: string): Observable<IALDCLoadModel> {
    return this.http.get<IALDCLoadModel>(`${environment.apiURL}LoadManagement/GetGridsWithRestriction?region=${region}`);
  }

  UpdateLoads(data: IALDCLoadModel): Observable<IALDCLoadModel> {
    return this.http.post<IALDCLoadModel>(`${environment.apiURL}LoadManagement/SaveALDCLoadData`, data);
  }

  getGrids(region: string): Observable<LoadConstituent[]> {
    return this.http.get<LoadConstituent[]>(`${environment.apiURL}LoadManagement/GetGridsForALDC?region=${region}`);
  }

  getGridsWithRestriction(region: string): Observable<LoadConstituent[]> {
    return this.http.get<LoadConstituent[]>(`${environment.apiURL}ConstituentMaster/GridsOnRestrictionByRegion?region=${region}`);
  }
}
