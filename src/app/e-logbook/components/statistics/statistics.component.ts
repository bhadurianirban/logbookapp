import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Logbook } from 'src/app/shared/models/logbook.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @Output() saveStatisticData: EventEmitter<any> = new EventEmitter();
  StatisticForm: FormGroup;
  SBStatisticForm: FormGroup;
  FBStatisticForm: FormGroup;
  currLogbookData: Logbook;
  @Input()
  @Input()
  set logbookData(data: Logbook) {
    this.currLogbookData = data;
    if (this.currLogbookData) {
      this.bindData();
    }
  }
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bindData();
  }

  bindData() {
    this.StatisticForm = this.formBuilder.group({
      DemandMaximumMW: [{
        value: this.currLogbookData.DemandMaximumMW,
        disabled: false
        }],
      DemandMaximumTime: [{
        value: this.currLogbookData.DemandMaximumTime,
        disabled: false
      }],
      DemandMinimumMW: [{
        value: this.currLogbookData.DemandMinimumMW,
        disabled: false
        }],
      DemandMinimumTime: [{
        value: this.currLogbookData.DemandMinimumTime,
        disabled: false
      }],
      FrequencyMaximumHz: [{
        value: this.currLogbookData.FrequencyMaximumHz,
        disabled: false
        }, [Validators.min(45), Validators.max(55)]],
      FrequencyMaximumTime: [{
        value: this.currLogbookData.FrequencyMaximumTime,
        disabled: false
      }],
      FrequencyMinimumHz: [{
        value: this.currLogbookData.FrequencyMinimumHz,
        disabled: false
        }, [Validators.min(45), Validators.max(55)]],
      FrequencyMinimumTime: [{
        value: this.currLogbookData.FrequencyMinimumTime,
        disabled: false
      }]
    });

    this.SBStatisticForm = this.formBuilder.group({
      SBDemandMaximumMW: [{
        value: this.currLogbookData.SBDemandMaximumMW,
        disabled: false
        }],
        SBDemandMaximumTime: [{
        value: this.currLogbookData.SBDemandMaximumTime,
        disabled: false
      }],
      SBDemandMinimumMW: [{
        value: this.currLogbookData.SBDemandMinimumMW,
        disabled: false
        }],
        SBDemandMinimumTime: [{
        value: this.currLogbookData.SBDemandMinimumTime,
        disabled: false
      }],
      SBFrequencyMaximumHz: [{
        value: this.currLogbookData.SBFrequencyMaximumHz,
        disabled: false
        }, [Validators.min(45), Validators.max(55)]],
        SBFrequencyMaximumTime: [{
        value: this.currLogbookData.SBFrequencyMaximumTime,
        disabled: false
      }],
      SBFrequencyMinimumHz: [{
        value: this.currLogbookData.SBFrequencyMinimumHz,
        disabled: false
        }, [Validators.min(45), Validators.max(55)]],
        SBFrequencyMinimumTime: [{
        value: this.currLogbookData.SBFrequencyMinimumTime,
        disabled: false
      }]
    });

    this.FBStatisticForm = this.formBuilder.group({
      FBDemandMaximumMW: [{
        value: this.currLogbookData.FBDemandMaximumMW,
        disabled: false
        }],
      FBDemandMaximumTime: [{
        value: this.currLogbookData.FBDemandMaximumTime,
        disabled: false
      }],
      FBDemandMinimumMW: [{
        value: this.currLogbookData.FBDemandMinimumMW,
        disabled: false
        }],
      FBDemandMinimumTime: [{
        value: this.currLogbookData.FBDemandMinimumTime,
        disabled: false
      }],
      FBFrequencyMaximumHz: [{
        value: this.currLogbookData.FBFrequencyMaximumHz,
        disabled: false
        }, [Validators.min(45), Validators.max(55)]],
      FBFrequencyMaximumTime: [{
        value: this.currLogbookData.FBFrequencyMaximumTime,
        disabled: false
      }],
      FBFrequencyMinimumHz: [{
        value: this.currLogbookData.FBFrequencyMinimumHz,
        disabled: false
        }, [Validators.min(45), Validators.max(55)]],
      FBFrequencyMinimumTime: [{
        value: this.currLogbookData.FBFrequencyMinimumTime,
        disabled: false
      }]
    });
  }

  saveStatistics(type: string) {
    if (type === 'N') {
      if (this.StatisticForm.valid) {
        const data = this.StatisticForm.getRawValue();
        this.saveStatisticData.emit(data);
      }
    } else if (type === 'F') {
      if (this.FBStatisticForm.valid) {
        const data = this.FBStatisticForm.getRawValue();
        this.saveStatisticData.emit(data);
      }
    } else {
      if (this.SBStatisticForm.valid) {
        const data = this.SBStatisticForm.getRawValue();
        this.saveStatisticData.emit(data);
      }
    }
  }
}
