import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Logbook, LOGBOOK_INITIAL_DATA, Issue,
   LogbookSchedulingDetail, LogbookViolationMessage, LogbookInstruction } from 'src/app/shared/models/logbook.model';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IScadaData } from 'src/app/shared/models/scada-data.model';
import { IUserViewModelInterface } from 'src/app/shared/models/user-management.model';
import { ShiftHandoverModel } from 'src/app/shared/models/shift-user.model';
import { LoadViewModel } from 'src/app/shared/models/load-management.model';
import { LogbookConstituentsGeneration } from '../models/ConstituentsGeneration.model';
import { LogbookNepalFeeder } from '../models/NepalFeeder.model';
import { LogbookSugarMills } from '../models/SugarMills.model';
import { LogbookSolarPower } from '../models/SolarPower.model';
import { LogbookSystemReport } from '../models/SystemReport.model';
import { LogbookNBPDCLTieLineExchange } from '../models/NBPDCLTieLineExchange.model';
import { LogbookSBPDCLTieLineExchange } from '../models/SBPDCLTieLineExchange.model';
import { LogbookMaxMinPowerDetails } from '../models/MaxMinPowerDetails.model';
import { LogbookSystemReportNet } from '../models/SystemReportNet.model';
import { LogbookKhagaul } from '../models/Khagaul.model';
import { LogbookMisc } from '../models/Misc.model';
import { PowerChangeOver } from 'src/app/shared/models/power-change-over.model';

@Injectable({
    providedIn: 'root'
  })
  export class LogbookService {
      constructor(private httpService: HttpClient) {}

      createLogbook(data: Logbook): Observable<Logbook> {
        return this.httpService.post<Logbook>(`${environment.apiURL}LogBook/Add`, data);
      }

      loadLogbook(requestId?: string): Observable<Logbook> {
        if (requestId === 'create') {
          return of(Object.assign({}, LOGBOOK_INITIAL_DATA));
        } else {
          return this.httpService.get<Logbook>(`${environment.apiURL}LogBook/GetLogbookById?requestId=${requestId}`);
        }
      }

      updateLogbook(data: Logbook): Observable<Logbook> {
        return this.httpService.post<Logbook>(`${environment.apiURL}LogBook/Update`, data);
      }

      addIssue(data: Issue): Observable<Issue> {
        return this.httpService.post<Issue>(`${environment.apiURL}Issues/Add`, data);
      }

      updateIssue(data: Issue): Observable<Issue> {
        return this.httpService.post<Issue>(`${environment.apiURL}Issues/Update`, data);
      }

      deleteIssue(data: Issue): Observable<Issue> {
        return this.httpService.post<Issue>(`${environment.apiURL}Issues/Delete`, data);
      }

      addScheduling(data: LogbookSchedulingDetail): Observable<LogbookSchedulingDetail> {
        return this.httpService.post<LogbookSchedulingDetail>(`${environment.apiURL}SchedulingDetails/Add`, data);
      }

      updateScheduling(data: LogbookSchedulingDetail): Observable<LogbookSchedulingDetail> {
        return this.httpService.post<LogbookSchedulingDetail>(`${environment.apiURL}SchedulingDetails/Update`, data);
      }

      deleteScheduling(data: LogbookSchedulingDetail): Observable<LogbookSchedulingDetail> {
        return this.httpService.post<LogbookSchedulingDetail>(`${environment.apiURL}SchedulingDetails/Delete`, data);
      }

      getStateWiseDeviation(state: string): Observable<IScadaData> {
        return this.httpService.get<IScadaData>(`${environment.apiURL}StateWiseDeviation/GetByState?state=${state}`);
      }

      addViolationMessage(data: LogbookViolationMessage): Observable<LogbookViolationMessage> {
        return this.httpService.post<LogbookViolationMessage>(`${environment.apiURL}ViolationMessages/Add`, data);
      }

      updateViolationMessage(data: LogbookViolationMessage): Observable<LogbookViolationMessage> {
        return this.httpService.post<LogbookViolationMessage>(`${environment.apiURL}ViolationMessages/Update`, data);
      }

      deleteViolationMessage(data: LogbookViolationMessage): Observable<LogbookViolationMessage> {
        return this.httpService.post<LogbookViolationMessage>(`${environment.apiURL}ViolationMessages/Delete`, data);
      }

      downloadViolationMessage(requestId: string): Observable<any> {
        const options = { responseType: 'blob' as 'json' };
        return this.httpService.get<any>(`${environment.apiURL}ViolationMessages/DownloadViolationMessage?requestId=${requestId}`, options);
      }

      deleteShiftUser(logbookId: string, id: number): Observable<number> {
        return this.httpService.get<number>(`${environment.apiURL}ShiftUsers/Delete?logbookId=${logbookId}&Id=${id}`);
      }

      addShiftUser(user: IUserViewModelInterface): Observable<IUserViewModelInterface> {
        return this.httpService.post<IUserViewModelInterface>(`${environment.apiURL}ShiftUsers/Add`, user);
      }

      updateShiftIncharge(user: IUserViewModelInterface): Observable<IUserViewModelInterface> {
        return this.httpService.post<IUserViewModelInterface>(`${environment.apiURL}ShiftUsers/UpdateShiftIncharge`, user);
      }

      updateShiftHandover(user: ShiftHandoverModel): Observable<ShiftHandoverModel> {
        return this.httpService.post<ShiftHandoverModel>(`${environment.apiURL}ShiftHandover/Update`, user);
      }

      confirmShiftUsers(logbookId: string): Observable<boolean> {
        return this.httpService.get<boolean>(`${environment.apiURL}ShiftUsers/ConfirmShiftUsers?logbookId=${logbookId}`);
      }

      submitLogbook(logbookId: string): Observable<boolean> {
        return this.httpService.get<boolean>(`${environment.apiURL}Logbook/Submit?logbookId=${logbookId}`);
      }

      addInstruction(data: LogbookInstruction): Observable<LogbookInstruction> {
        return this.httpService.post<LogbookInstruction>(`${environment.apiURL}Instructions/Add`, data);
      }

      addLoad(data: LoadViewModel): Observable<LoadViewModel> {
        return this.httpService.post<LoadViewModel>(`${environment.apiURL}LoadManagement/Add`, data);
      }

      updateLoad(data: LoadViewModel): Observable<LoadViewModel> {
        return this.httpService.post<LoadViewModel>(`${environment.apiURL}LoadManagement/Update`, data);
      }
      getConstituentsGeneration(requestId: string): Observable<LogbookConstituentsGeneration> {
        return this.httpService.get<LogbookConstituentsGeneration>(`${environment.apiURL}ConstituentsGeneration/Get?requestId=${requestId}`);
      }
      addConstituentsGeneration(data: LogbookConstituentsGeneration): Observable<LogbookConstituentsGeneration> {
        return this.httpService.post<LogbookConstituentsGeneration>(`${environment.apiURL}ConstituentsGeneration/Add`, data);
      }
      updateConstituentsGeneration(data: LogbookConstituentsGeneration): Observable<LogbookConstituentsGeneration> {
        return this.httpService.post<LogbookConstituentsGeneration>(`${environment.apiURL}ConstituentsGeneration/Update`, data);
      }
      getNepalFeeders(requestId: string): Observable<LogbookNepalFeeder> {
        return this.httpService.get<LogbookNepalFeeder>(`${environment.apiURL}NepalFeederDetails/Get?requestId=${requestId}`);
      }
      addNepalFeeders(data: LogbookNepalFeeder): Observable<LogbookNepalFeeder> {
        return this.httpService.post<LogbookNepalFeeder>(`${environment.apiURL}NepalFeederDetails/Add`, data);
      }
      updateNepalFeeders(data: LogbookNepalFeeder): Observable<LogbookNepalFeeder> {
        return this.httpService.post<LogbookNepalFeeder>(`${environment.apiURL}NepalFeederDetails/Update`, data);
      }
      getSugarMillsGeneration(requestId: string): Observable<LogbookSugarMills> {
        return this.httpService.get<LogbookSugarMills>(`${environment.apiURL}SugarMillsGeneration/Get?requestId=${requestId}`);
      }
      addSugarMillsGeneration(data: LogbookSugarMills): Observable<LogbookSugarMills> {
        return this.httpService.post<LogbookSugarMills>(`${environment.apiURL}SugarMillsGeneration/Add`, data);
      }
      updateSugarMillsGeneration(data: LogbookSugarMills): Observable<LogbookSugarMills> {
        return this.httpService.post<LogbookSugarMills>(`${environment.apiURL}SugarMillsGeneration/Update`, data);
      }
      getSolarPowerGeneration(requestId: string): Observable<LogbookSolarPower> {
        return this.httpService.get<LogbookSolarPower>(`${environment.apiURL}SolarPowerGeneration/Get?requestId=${requestId}`);
      }
      addSolarPowerGeneration(data: LogbookSolarPower): Observable<LogbookSolarPower> {
        return this.httpService.post<LogbookSolarPower>(`${environment.apiURL}SolarPowerGeneration/Add`, data);
      }
      updateSolarPowerGeneration(data: LogbookSolarPower): Observable<LogbookSolarPower> {
        return this.httpService.post<LogbookSolarPower>(`${environment.apiURL}SolarPowerGeneration/Update`, data);
      }
      getSystemReport(requestId: string): Observable<LogbookSystemReport> {
        return this.httpService.get<LogbookSystemReport>(`${environment.apiURL}SystemReport/Get?requestId=${requestId}`);
      }
      addSystemReport(data: LogbookSystemReport): Observable<LogbookSystemReport> {
        return this.httpService.post<LogbookSystemReport>(`${environment.apiURL}SystemReport/Add`, data);
      }
      updateSystemReport(data: LogbookSystemReport): Observable<LogbookSystemReport> {
        return this.httpService.post<LogbookSystemReport>(`${environment.apiURL}SystemReport/Update`, data);
      }
      getNBPDCLTieLinesExchange(requestId: string): Observable<LogbookNBPDCLTieLineExchange> {
        return this.httpService.get<LogbookNBPDCLTieLineExchange>(`${environment.apiURL}NBPDCLTieLineExchange/Get?requestId=${requestId}`);
      }
      addNBPDCLTieLinesExchange(data: LogbookNBPDCLTieLineExchange): Observable<LogbookNBPDCLTieLineExchange> {
        return this.httpService.post<LogbookNBPDCLTieLineExchange>(`${environment.apiURL}NBPDCLTieLineExchange/Add`, data);
      }
      updateNBPDCLTieLinesExchange(data: LogbookNBPDCLTieLineExchange): Observable<LogbookNBPDCLTieLineExchange> {
        return this.httpService.post<LogbookNBPDCLTieLineExchange>(`${environment.apiURL}NBPDCLTieLineExchange/Update`, data);
      }
      getSBPDCLTieLinesExchange(requestId: string): Observable<LogbookSBPDCLTieLineExchange> {
        return this.httpService.get<LogbookSBPDCLTieLineExchange>(`${environment.apiURL}SBPDCLTieLineExchange/Get?requestId=${requestId}`);
      }
      addSBPDCLTieLinesExchange(data: LogbookSBPDCLTieLineExchange): Observable<LogbookSBPDCLTieLineExchange> {
        return this.httpService.post<LogbookSBPDCLTieLineExchange>(`${environment.apiURL}SBPDCLTieLineExchange/Add` , data);
      }
      updateSBPDCLTieLinesExchange(data: LogbookSBPDCLTieLineExchange): Observable<LogbookSBPDCLTieLineExchange> {
        return this.httpService.post<LogbookSBPDCLTieLineExchange>(`${environment.apiURL}SBPDCLTieLineExchange/Update`, data);
      }
      getMaxMinPower(requestId: string): Observable<LogbookMaxMinPowerDetails> {
        return this.httpService.get<LogbookMaxMinPowerDetails>(`${environment.apiURL}MaxMinPowerDetails/Get?requestId=${requestId}`);
      }
      addMaxMinPower(data: LogbookMaxMinPowerDetails): Observable<LogbookMaxMinPowerDetails> {
        return this.httpService.post<LogbookMaxMinPowerDetails>(`${environment.apiURL}MaxMinPowerDetails/Add`, data);
      }
      updateMaxMinPower(data: LogbookMaxMinPowerDetails): Observable<LogbookMaxMinPowerDetails> {
        return this.httpService.post<LogbookMaxMinPowerDetails>(`${environment.apiURL}MaxMinPowerDetails/Update`, data);
      }
      getSystemReportNet(requestId: string): Observable<LogbookSystemReportNet> {
        return this.httpService.get<LogbookSystemReportNet>(`${environment.apiURL}SystemReportNet/Get?requestId=${requestId}`);
      }
      addSystemReportNet(data: LogbookSystemReportNet): Observable<LogbookSystemReportNet> {
        return this.httpService.post<LogbookSystemReportNet>(`${environment.apiURL}SystemReportNet/Add`, data);
      }
      updateSystemReportNet(data: LogbookSystemReportNet): Observable<LogbookSystemReportNet> {
        return this.httpService.post<LogbookSystemReportNet>(`${environment.apiURL}SystemReportNet/Update`, data);
      }
      getKhagaul(requestId: string): Observable<LogbookKhagaul> {
        return this.httpService.get<LogbookKhagaul>(`${environment.apiURL}Khagaul/Get?requestId=${requestId}`);
      }
      addKhagaul(data: LogbookKhagaul): Observable<LogbookKhagaul> {
        return this.httpService.post<LogbookKhagaul>(`${environment.apiURL}Khagaul/Add`, data);
      }
      updateKhagaul(data: LogbookKhagaul): Observable<LogbookKhagaul> {
        return this.httpService.post<LogbookKhagaul>(`${environment.apiURL}Khagaul/Update`, data);
      }
      getMisc(requestId: string): Observable<LogbookMisc> {
        return this.httpService.get<LogbookMisc>(`${environment.apiURL}Misc/Get?requestId=${requestId}`);
      }
      addMisc(data: LogbookMisc): Observable<LogbookMisc> {
        return this.httpService.post<LogbookMisc>(`${environment.apiURL}Misc/Add`, data);
      }

      getLogbookRestData(logbookId: string): Observable<LoadViewModel[]> {
        return this.httpService.get<LoadViewModel[]>(`${environment.apiURL}LoadManagement/GetByLogbookLoadRest?logbookId=${logbookId}`);
      }

      getLogbookReleaseData(logbookId: string): Observable<LoadViewModel[]> {
        return this.httpService.get<LoadViewModel[]>(`${environment.apiURL}LoadManagement/GetByLogbookLoadRelease?logbookId=${logbookId}`);
      }

      createPCOCode(data: PowerChangeOver): Observable<PowerChangeOver> {
        return this.httpService.post<PowerChangeOver>(`${environment.apiURL}PowerChangeOver/Add`, data);
      }

      cancelPCOCode(data: PowerChangeOver): Observable<PowerChangeOver> {
        return this.httpService.post<PowerChangeOver>(`${environment.apiURL}PowerChangeOver/CancelCode`, data);
      }

      updatePCOCode(data: PowerChangeOver): Observable<PowerChangeOver> {
        return this.httpService.post<PowerChangeOver>(`${environment.apiURL}PowerChangeOver/Update`, data);
      }
}
