import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigValue } from 'src/app/shared/models/config-values.model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import { GetConfigValuesAction, AddConfigValueAction, UpdateConfigValueAction } from 'src/app/store/actions';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { CONFIG_VALUES_HEADERS } from 'src/app/shared/models/table-headers';
import { DialogService } from 'primeng/api';
import { ConfigDialogComponent } from '../config-dialog/config-dialog.component';

@Component({
  selector: 'app-config-values',
  templateUrl: './config-values.component.html',
  styleUrls: ['./config-values.component.scss'],
  providers: [DialogService]
})
export class ConfigValuesComponent implements OnInit, OnDestroy {
  configValues: ConfigValue[];
  destroying = false;
  selectedColumns: any[] = [];

  constructor(private store: Store<ApplicationState>,
              private dialogService: DialogService, ) {
    this.store.dispatch(new GetConfigValuesAction());
  }

  ngOnInit() {
    this.selectedColumns = CONFIG_VALUES_HEADERS;
    this.store.pipe(select(fromRoot.selectConfigValueData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
        this.configValues = data;
    });
  }

  addUpdateConfig(data?: ConfigValue) {
    const currentConfig = data ? data : Object.assign({}) as ConfigValue;
    const dialogRef = this.dialogService.open(ConfigDialogComponent, {
      data: {
        currentConfigData: currentConfig
      },
      header: 'Add Config Value',
      width: '980px',
      contentStyle: {border: '1px solid #171616',
                    'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
                    'padding-right': '3px !important', background: '#fff', color: '#000'}
    });
    dialogRef.onClose.pipe(
      takeWhile(() => !this.destroying)
    ).subscribe(item => {
      if (item) {
        const formData = Object.assign({}, currentConfig, item) ;
        if (formData.Id > 0 && formData.RequestId) {
          this.store.dispatch(new UpdateConfigValueAction(formData));
        } else {
          this.store.dispatch(new AddConfigValueAction(formData));
        }
      }
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.destroying = true;
  }

}
