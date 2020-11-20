import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MasterData, IOutageSelectOptions, MasterElementsData } from '../models/master-data.model';
import { ApprovedShutdownRequest } from '../models/approved-shutdown.model';
import { ConstituentValue } from '../models/constituent-value.model';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  private getMasterElementsURL = environment.masterDataAPIURL + 'Master/Get/AllElementsData';

  constructor(private httpService: HttpClient) { }

  getMasterElementsData(): Observable<MasterElementsData> {
    return this.httpService.get<MasterElementsData>(this.getMasterElementsURL);
  }

  getCommonMasterData(): Observable<MasterData> {
    return this.httpService.get<MasterData>(`${environment.apiURL}Master/Get/CommonMasterData`);
  }

  getSelectOptions(): Observable<IOutageSelectOptions> {
    return this.httpService.get<IOutageSelectOptions>(`${environment.apiURL}Outage/Get/SelectOptions`);
  }

  getGridsWithRestriction(): Observable<ConstituentValue[]> {
    return this.httpService.get<ConstituentValue[]>(`${environment.apiURL}ConstituentMaster/GridsOnRestriction`);
  }

  getApprovedShutdowns(fromDate: string, toDate: string): Observable<ApprovedShutdownRequest[]> {
    return this.httpService.get<ApprovedShutdownRequest[]>
    (`${environment.apiURL}Master/Get/ApprovedShutdowns?fromDate=${fromDate}&endDate=${toDate}`);
  }
}
