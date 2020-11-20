import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { FirstTimeChargeLine } from '../../shared/models/first-time-charge-lines.model';
import { FirstTimeChargeLineDialog } from '../../shared/models/first-time-charge-lines-dialog.model';
import { GetCommonMasterDataAction } from 'src/app/store/actions';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from 'src/app/store/state';
import * as fromRoot from '../../store/selectors';
import { takeWhile } from 'rxjs/operators';
import { IConstituents } from '../../shared/models/master-data.model';

@Component({
  selector: 'app-first-time-charge-line-dialogue',
  templateUrl: './first-time-charge-line-dialogue.component.html',
  styleUrls: ['./first-time-charge-line-dialogue.component.scss']
})
export class FirstTimeChargeLineDialogueComponent implements OnInit {

  LineForm: FormGroup;
  lineValue: FirstTimeChargeLineDialog;
  responseData: FirstTimeChargeLine;
  lineTypes: any[] = [{ key: 'S/C', value: 'Single Circuit(I)' },
  { key: 'D/C', value: 'Double Circuit(II)' },
  { key: 'LILO', value: 'LILO' }];
  voltageLevels: any[];
  destroying: boolean = false;
  masterConstituents: IConstituents[] = [];
  selectedConstituent: IConstituents[] = [];

  constructor(public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private store: Store<ApplicationState>
  ) {
    this.store.dispatch(new GetCommonMasterDataAction());
  }

  ngOnInit() {
    this.lineValue = this.config.data.currentLineData;
    // create form group
    this.LineForm = this.formBuilder.group({
      voltageLevel: [{ value: this.lineValue.VoltageLevel, disabled: this.isKeyDisabled() }, Validators.required],
      from: [{ value: this.lineValue.From, disabled: this.isKeyDisabled() }, Validators.required],
      to: [{ value: this.lineValue.To, disabled: this.isKeyDisabled() }, Validators.required],
      lineType: [{ value: this.lineValue.LineType, disabled: this.isKeyDisabled() }, Validators.required],

    });
    this.store.pipe(select(fromRoot.selectCommonMasterData),
      takeWhile(() => !this.destroying))
      .subscribe(data => {
        if (data.commonMaster) {
          this.voltageLevels = data.commonMaster.voltageLevels;
          this.masterConstituents = data.commonMaster.constituents;
        }
      });
  }

  handleSubmitClick() {
    if (this.LineForm.dirty && this.LineForm.valid) {
      const data = this.LineForm.getRawValue();
      this.responseData = {
        Id: null,
        LineName: data.voltageLevel.Name + ' ' + data.from.Name + ' - ' + data.to.Name + ' ' + data.lineType.key + ' T/L',
        IsFirstTimeCharged: false
      }
      this.ref.close(this.responseData);
    }
  }

  search(event, type: string) {
        this.selectedConstituent = this.masterConstituents.filter(x => x.Name.toLowerCase().includes(event.query.toString().toLowerCase()));
    }
  

  isKeyDisabled(): boolean {
    return false;
  }

  handleCloseClick() {
    this.destroying = true;
    this.ref.close();
  }

}
