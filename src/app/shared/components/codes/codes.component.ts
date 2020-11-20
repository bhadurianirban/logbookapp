import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CodeBaseViewModel } from '../../models/code-base.model';
import { DialogService } from 'primeng/api';
import { OutageFormDialogComponent } from '../outage-form-dialog/outage-form-dialog.component';
import { IOutageSelectOptions, ITrippingNature, MasterData } from '../../models/master-data.model';
import { takeWhile } from 'rxjs/operators';
import { OutageModel } from '../../models/outage.model';
import { DateFormatService } from '../../services/date-format.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import {
  UpdateOutageAction, UpdateAntiTheftAction, UpdateTrippingAction,
  UpdateApprovedShutdownAction, UpdateAutoRecloseAction, UpdateFirstTimeChargeAction
} from 'src/app/store/actions';
import { AntitheftFormDialogComponent } from '../antitheft-form-dialog/antitheft-form-dialog.component';
import { AntiTheftModel } from '../../models/antiTheft.model';
import { TrippingFormDialogComponent } from '../tripping-form-dialog/tripping-form-dialog.component';
import { TrippingModel } from '../../models/tripping.model';
import { ShutdownFormDialogComponent } from '../shutdown-form-dialog/shutdown-form-dialog.component';
import { ApprovedShutdownRequest } from '../../models/approved-shutdown.model';
import { AutoRecloseDialogComponent } from '../auto-reclose-dialog/auto-reclose-dialog.component';
import { AutoRecloseModel } from '../../models/auto-reclose.model';
import { FirstTimeChargeDialogComponent } from '../first-time-charge-dialog/first-time-charge-dialog.component';
import { FirstTimeChargeModel } from '../../models/first-time-charge.model';
import { CODES_HEADER } from '../../models/table-headers';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.scss']
})
export class CodesComponent implements OnInit, OnDestroy {
  trippingNatures: ITrippingNature[] = [];
  currCodes: CodeBaseViewModel[] = [];
  codeHeaders: any;
  @Input()
  selectOptions: IOutageSelectOptions;
  @Input()
  set Codes(data: CodeBaseViewModel[]) {
    this.currCodes = data;
    this.bindData();
  }
  @Input()
  masterData: MasterData;
  @Input()
  IsDashboardUpdate: boolean;
  destroying = false;
  constructor(public dialogService: DialogService,
              private dateFormatService: DateFormatService,
              private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    if (this.currCodes) {
      this.currCodes = this.currCodes.map(data => {
        const code = Object.assign({}, data);
        if (code.OutageData) {
          code.ElementName = code.OutageData.Name;
        } else if (code.TrippingData) {
          code.ElementName = code.TrippingData.Name;
        } else if (code.ShutdownData) {
          code.ElementName = code.ShutdownData.ElementName;
        } else if (code.AntiTheftData) {
          code.ElementName = code.AntiTheftData.Name;
        } else if (code.AutoRecloseData) {
          code.ElementName = code.AutoRecloseData.Name;
        } else if (code.FirstTimeChargeData) {
          code.ElementName = code.FirstTimeChargeData.Name;
        } else if (code.LoadData && code.LoadData.LoadGrids) {
          code.ElementName = code.LoadData.LoadGrids.map(x => {
            return x.GridName + ' - ' + x.Restriction;
          }).join('; ');
        }
        code.CreatedDateTimeStamp = code.CreatedDate + ' ' + code.CreatedTime;
        code.CodeCancelYesNo = code.IsCancelled ? 'Yes' : 'No';
        return code;
      });
    }
    this.codeHeaders = CODES_HEADER;
    this.trippingNatures = this.masterData && this.masterData.commonMaster ?
      this.masterData.commonMaster.trippingNatures : [];
  }

  viewEditData(data: CodeBaseViewModel) {
    switch (data.Type) {
      case 'Outage':
        this.handleOutageCodeUpdate(data);
        break;
      case 'AutoReclose':
        this.handleAutoRecloseCodeUpdate(data);
        break;
      case 'FirstTimeCharge':
        this.handleFirstTimeChargeCodeUpdate(data);
        break;
      case 'Tripping':
        this.handleTrippingCodeUpdate(data);
        break;
      case 'Shutdown':
        this.handleShutdownCodeUpdate(data);
        break;
      default:
        this.handleAntiTheftCodeUpdate(data);
    }
  }

  handleOutageCodeUpdate(data: CodeBaseViewModel) {
    const currOutageUpdateData = [data.OutageData];
    const dialogRef = this.dialogService.open(OutageFormDialogComponent,
      {
        data: {
          outageArrayData: currOutageUpdateData,
          outageData: data.OutageData,
          outageSelectOptions: this.selectOptions,
          constituents: this.masterData.commonMaster.constituents,
          outageCode: data
        },
        header: 'Outage',
        width: '980px',
        contentStyle: {
          border: '1px solid #171616',
          'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
          'padding-right': '3px !important', background: '#fff', color: '#000'
        }
      });
    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const thisOutageData = Object.assign({}, data.OutageData, item) as OutageModel;
        const reasons = item.Reason as any;
        const remarks = item.Remarks as any;
        const restoreRemarks = item.RestoredRemarks as any;
        const constituent = item.Constituent as any;
        thisOutageData.IsDashboardUpdate = this.IsDashboardUpdate;
        thisOutageData.LogDate = this.dateFormatService.getStringDate(thisOutageData.LogDate);
        thisOutageData.LogTime = thisOutageData.LogTime;
        thisOutageData.RestoreDate = this.dateFormatService.getStringDate(thisOutageData.RestoreDate);
        thisOutageData.RestoreTime = thisOutageData.RestoreTime;
        thisOutageData.Reason = reasons ? reasons.join('$') : null;
        thisOutageData.Remarks = remarks ? remarks.join('$') : null;
        thisOutageData.RestoredRemarks = restoreRemarks ? restoreRemarks.join('$') : null;
        thisOutageData.Constituent = constituent ? constituent.Id : 0;
        this.store.dispatch(new UpdateOutageAction(thisOutageData));
      }
    });
  }

  handleFirstTimeChargeCodeUpdate(data: CodeBaseViewModel) {
    const currFirstTimeChargeUpdateData = [data.FirstTimeChargeData];
    const dialogRef = this.dialogService.open(FirstTimeChargeDialogComponent,
      {
        data: {
          firstTimeChargeArrayData: currFirstTimeChargeUpdateData,
          firstTimeChargeData: data.FirstTimeChargeData,
          firstTimeChargeSelectOptions: this.selectOptions,
          firstTimeChargeCode: data
        },
        header: 'First Time Charge',
        width: '980px',
        contentStyle: {
          border: '1px solid #171616',
          'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
          'padding-right': '3px !important', background: '#fff', color: '#000'
        }
      });
    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const thisFirstTimeChargeData = Object.assign({}, data.FirstTimeChargeData, item) as FirstTimeChargeModel;
        const reasons = item.Reason as any;
        const remarks = item.Remarks as any;
        const restoreRemarks = item.RestoredRemarks as any;
        thisFirstTimeChargeData.IsDashboardUpdate = this.IsDashboardUpdate;
        thisFirstTimeChargeData.LogDate = this.dateFormatService.getStringDate(thisFirstTimeChargeData.LogDate);
        thisFirstTimeChargeData.LogTime = thisFirstTimeChargeData.LogTime;
        thisFirstTimeChargeData.RestoreDate = this.dateFormatService.getStringDate(thisFirstTimeChargeData.RestoreDate);
        thisFirstTimeChargeData.RestoreTime = thisFirstTimeChargeData.RestoreTime;
        thisFirstTimeChargeData.Reason = reasons ? reasons.join('$') : null;
        thisFirstTimeChargeData.Remarks = remarks ? remarks.join('$') : null;
        thisFirstTimeChargeData.RestoredRemarks = restoreRemarks ? restoreRemarks.join('$') : null;
        this.store.dispatch(new UpdateFirstTimeChargeAction(thisFirstTimeChargeData));
      }
    });
  }

  handleAutoRecloseCodeUpdate(data: CodeBaseViewModel) {
    const currAutoRecloseUpdateData = [data.AutoRecloseData];
    const dialogRef = this.dialogService.open(AutoRecloseDialogComponent,
      {
        data: {
          autoRecloseArrayData: currAutoRecloseUpdateData,
          autoRecloseData: data.AutoRecloseData,
          autoRecloseSelectOptions: this.selectOptions,
          autoRecloseCode: data
        },
        header: 'Auto Reclose',
        width: '980px',
        contentStyle: {
          border: '1px solid #171616',
          'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
          'padding-right': '3px !important', background: '#fff', color: '#000'
        }
      });
    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const thisAutoRecloseData = Object.assign({}, data.AutoRecloseData, item) as AutoRecloseModel;
        const reasons = item.Reason as any;
        const remarks = item.Remarks as any;
        const restoreRemarks = item.RestoredRemarks as any;
        thisAutoRecloseData.IsDashboardUpdate = this.IsDashboardUpdate;
        thisAutoRecloseData.LogDate = this.dateFormatService.getStringDate(thisAutoRecloseData.LogDate);
        thisAutoRecloseData.LogTime = thisAutoRecloseData.LogTime;
        thisAutoRecloseData.RestoreDate = this.dateFormatService.getStringDate(thisAutoRecloseData.RestoreDate);
        thisAutoRecloseData.RestoreTime = thisAutoRecloseData.RestoreTime;
        thisAutoRecloseData.Reason = reasons ? reasons.join('$') : null;
        thisAutoRecloseData.Remarks = remarks ? remarks.join('$') : null;
        thisAutoRecloseData.RestoredRemarks = restoreRemarks ? restoreRemarks.join('$') : null;
        this.store.dispatch(new UpdateAutoRecloseAction(thisAutoRecloseData));
      }
    });
  }

  handleAntiTheftCodeUpdate(data: CodeBaseViewModel) {
    const currTheftData = [data.AntiTheftData];
    const dialogRef = this.dialogService.open(AntitheftFormDialogComponent,
      {
        data: {
          antiTheftArrayData: currTheftData,
          antiTheftData: data.AntiTheftData,
          outageSelectOptions: this.selectOptions,
          antiTheftCode: data
        },
        header: 'Anti Theft',
        width: '980px',
        contentStyle: {
          border: '1px solid #171616',
          'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
          'padding-right': '3px !important', background: '#fff', color: '#000'
        }
      });

    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const thisAntiTheftData = Object.assign({}, data.AntiTheftData, item) as AntiTheftModel;
        const reasons = item.Reason as any;
        const remarks = item.Remarks as any;
        const restoreRemarks = item.RestoredRemarks as any;
        thisAntiTheftData.IsDashboardUpdate = this.IsDashboardUpdate;
        thisAntiTheftData.LogDate = this.dateFormatService.getStringDate(thisAntiTheftData.LogDate);
        thisAntiTheftData.LogTime = thisAntiTheftData.LogTime;
        thisAntiTheftData.RestoreDate = this.dateFormatService.getStringDate(thisAntiTheftData.RestoreDate);
        thisAntiTheftData.RestoreTime = thisAntiTheftData.RestoreTime;
        thisAntiTheftData.Reason = reasons ? reasons.join('$') : null;
        thisAntiTheftData.Remarks = remarks ? remarks.join('$') : null;
        thisAntiTheftData.RestoredRemarks = restoreRemarks ? restoreRemarks.join('$') : null;
        this.store.dispatch(new UpdateAntiTheftAction(thisAntiTheftData));
      }
    });
  }

  handleTrippingCodeUpdate(data: CodeBaseViewModel) {
    const currTrippingData = [data.TrippingData];
    if (data.TrippingData.Nature) {
      const nature = data.TrippingData.Nature as any;
      let natureData: any;
      if (nature.Name) {
        natureData = this.trippingNatures.find(x => x.Name === nature.Name) as any;
      } else {
        natureData = this.trippingNatures.find(x => x.Name === nature) as any;
      }
      const thisTrippingData = Object.assign({}, data.TrippingData) as TrippingModel;
      thisTrippingData.Nature = natureData;
      data.TrippingData = thisTrippingData;
    }
    const dialogRef = this.dialogService.open(TrippingFormDialogComponent,
      {
        data: {
          trippingArrayData: currTrippingData,
          trippingData: data.TrippingData,
          natureArray: this.trippingNatures,
          isUpdate: true,
          trippingCode: data
        },
        header: 'Update Tripping',
        width: '980px',
        contentStyle: {
          border: '1px solid #b1b2b3',
          'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
          'padding-right': '3px !important', 'background-color': '#ffffff !important',
          background: '#fff', color: '#000'
        }
      });

    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const nature = item.Nature as any;
        const formData = Object.assign({}, data.TrippingData, item) as TrippingModel;
        formData.IsDashboardUpdate = this.IsDashboardUpdate;
        formData.TripDate = this.dateFormatService.getStringDate(formData.TripDate);
        formData.TripTime = formData.TripTime;
        formData.ExpectedDate = this.dateFormatService.getStringDate(formData.ExpectedDate);
        formData.RevivalDate = this.dateFormatService.getStringDate(formData.RevivalDate);
        formData.RevivalTime = formData.RevivalTime;
        formData.Nature = nature.Name;
        this.store.dispatch(new UpdateTrippingAction(formData));
      }
    });
  }

  handleShutdownCodeUpdate(data: CodeBaseViewModel) {
    const dialogRef = this.dialogService.open(ShutdownFormDialogComponent,
      {
        data: {
          shutdownData: data.ShutdownData,
          shutdownCode: data
        },
        header: 'Approved Shutdown',
        width: '980px',
        contentStyle: {
          border: '1px solid #b1b2b3',
          'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
          'padding-right': '3px !important', 'background-color': '#ffffff !important',
          background: '#fff', color: '#000'
        }
      });

    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const thisShutdownData = Object.assign({}, data.ShutdownData, item) as ApprovedShutdownRequest;
        thisShutdownData.IsDashboardUpdate = this.IsDashboardUpdate;
        thisShutdownData.ActualOutageDate = this.dateFormatService.getStringDate(thisShutdownData.ActualOutageDate);
        thisShutdownData.ActualOutageTime = thisShutdownData.ActualOutageTime;
        thisShutdownData.ActualRestoreDate = this.dateFormatService.getStringDate(thisShutdownData.ActualRestoreDate);
        thisShutdownData.ActualRestoreTime = thisShutdownData.ActualRestoreTime;
        this.store.dispatch(new UpdateApprovedShutdownAction(thisShutdownData));
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.destroying = true;
  }
}
