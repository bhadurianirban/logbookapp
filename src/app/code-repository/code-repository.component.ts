import { Component, OnInit, OnDestroy } from '@angular/core';
import { MasterData, IOutageSelectOptions } from '../shared/models/master-data.model';
import { CodeBaseViewModel } from '../shared/models/code-base.model';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../store/state';
import { DateFormatService } from '../shared/services/date-format.service';
import { GetAllCodesAction, GetCommonMasterDataAction, GetReasonRemarksOptionsAction } from '../store/actions';
import * as fromRoot from '../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { DialogService } from 'primeng/api';

@Component({
  selector: 'app-code-repository',
  templateUrl: './code-repository.component.html',
  styleUrls: ['./code-repository.component.scss'],
  providers: [DialogService]
})
export class CodeRepositoryComponent implements OnInit, OnDestroy {
  masterData: MasterData;
  allThisMonthCodes: CodeBaseViewModel[];
  selectedPeriod: Date = new Date();
  ouatgeSelectOptions: IOutageSelectOptions;
  destroying = false;
  constructor(private store: Store<ApplicationState>,
              private dateFormatService: DateFormatService) {
                this.store.dispatch(new GetCommonMasterDataAction());
                this.store.dispatch(new GetReasonRemarksOptionsAction());
                const month = this.dateFormatService.getMonthFormat(this.selectedPeriod);
                this.store.dispatch(new GetAllCodesAction(month));
               }

  ngOnInit() {
    this.store.pipe(select(fromRoot.selectCommonMasterData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data) {
        this.masterData = data;
      }
    });
    this.store.pipe(select(fromRoot.selectOutageMasterData),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data && data.selectOptions) {
        this.ouatgeSelectOptions = data.selectOptions;
      }
    });
    this.store.pipe(select(fromRoot.selectCodeRepository),
    takeWhile(() => !this.destroying))
    .subscribe(data => {
      if (data && data.codes) {
        this.allThisMonthCodes = data.codes;
      }
    });
  }

  onMonthSelect() {
    const month = this.dateFormatService.getMonthFormat(this.selectedPeriod);
    this.store.dispatch(new GetAllCodesAction(month));
  }

  ngOnDestroy() {
    this.destroying = true;
  }

}
