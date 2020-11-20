import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigValue } from 'src/app/shared/models/config-values.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigValuesService {

  constructor(private httpService: HttpClient) { }

  getAllConfigData(): Observable<ConfigValue[]> {
    return this.httpService.get<ConfigValue[]>(`${environment.apiURL}ConfigValues/Get/All`);
  }

  addUpdateConfigData(configData: ConfigValue): Observable<ConfigValue> {
    return this.httpService.post<ConfigValue>(`${environment.apiURL}ConfigValues/Add`, configData);
  }
}
