import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadConstituent, LoadViewModel } from 'src/app/shared/models/load-management.model';
import { DynamicDialogConfig, DynamicDialogRef, MessageService } from 'primeng/api';
import { LOAD_CONSITTUENT_HEADERS } from 'src/app/shared/models/table-headers';
import * as moment from 'moment';

@Component({
  selector: 'app-load-management-dialog',
  templateUrl: './load-management-dialog.component.html',
  styleUrls: ['./load-management-dialog.component.scss']
})
export class LoadManagementDialogComponent implements OnInit {
  dateFormat = 'dd/mm/yy';
  minDateValue = new Date();
  LoadForm: FormGroup;
  selectedColumns: any[] = [];
  selectedConstituents: LoadConstituent[] = [];
  aldcData: LoadViewModel;
  isDetailsUpdate = false;
  restrictionTypes: any[] = [{
    Name: 'Sign Violation',
    Key: 'Sign Violation'
  },
  {
    Name: 'Transmission Constraint',
    Key: 'Transmission Constraint'
  },
  {
    Name: 'DISCOM Constraint',
    Key: 'DISCOM Constraint'
  }];
  constructor(private formBuilder: FormBuilder,
              public config: DynamicDialogConfig,
              private ref: DynamicDialogRef,
              private messageService: MessageService) { }

  ngOnInit() {
    this.selectedColumns = LOAD_CONSITTUENT_HEADERS;
    this.selectedConstituents = this.config.data.constituentArrayData;
    this.isDetailsUpdate = this.config.data.isUpdate;
    this.aldcData = this.config.data.aldcData;
    const loadType = this.aldcData ? this.restrictionTypes.find(x => x.Key === this.aldcData.LoadShedType) : null;
    this.LoadForm = this.formBuilder.group({
      Remarks: [this.isDetailsUpdate ? this.config.data.Remarks : null],
      MaxPeakLoad: [''],
      PresentLoad: [''],
      AllocatedLoad: [''],
      Restriction: [''],
      LoadShedType: [this.isDetailsUpdate ? loadType : null, Validators.required],
      ImposedFromTime: [this.isDetailsUpdate ? this.aldcData.ImposedFromTime : null, Validators.required],
      ImposedToTime: [this.isDetailsUpdate ? this.aldcData.ImposedToTime : null],
      ImposedFromDate: [this.isDetailsUpdate ? this.aldcData.ImposedFromDate : moment().format('DD/MM/YYYY'), Validators.required],
      ImposedToDate: [this.isDetailsUpdate ? this.aldcData.ImposedToDate : moment().format('DD/MM/YYYY')]
    });
  }

  handleSubmitClick() {
    let isAllLoadUpdated = false;
    this.selectedConstituents.forEach(element => {
      if (element && element.MaxPeakLoad >= 0 && element.PresentLoad > 0 && element.AllocatedLoad >= 0) {
        isAllLoadUpdated = true;
      } else {
        isAllLoadUpdated = false;
      }
    });
    if (!isAllLoadUpdated) {
      // show error message
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Create Code',
         detail: 'Please provide load details for all selected grids.', closable: true }
      );
      return;
    }
    if (this.LoadForm.valid) {
      const data = this.LoadForm.getRawValue();
      const formData = {
        Remarks: data.Remarks,
        LoadGrids: this.selectedConstituents,
        LoadShedType: data.LoadShedType.Name,
        ImposedFromDate: data.ImposedFromDate ? moment(data.ImposedFromDate).format('DD/MM/YYYY') : '',
        ImposedFromTime: data.ImposedFromTime ? moment(data.ImposedFromTime).format('HH:mm') : '',
        ImposedToDate: data.ImposedToDate ? moment(data.ImposedToDate).format('DD/MM/YYYY') : '',
        ImposedToTime: data.ImposedToTime ? moment(data.ImposedToTime).format('HH:mm') : ''
      };
      this.ref.close(formData);
    } else {
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Load Management',
         detail: 'Please provide remarks and created on time.', closable: true }
      );
      return;
    }
  }

  handleCloseClick() {
    this.ref.close();
  }

  handleCreateCodeClick() {
    if (this.LoadForm.valid) {
      const data = this.LoadForm.getRawValue();
      const formData = {
        Remarks: data.Remarks,
        CreatedOnTime: moment().format('HH:mm'),
        LoadGrids: this.selectedConstituents,
        CreatedOnDate: moment().format('DD/MM/YYYY'),
        CreateCode: true,
        LoadShedType: data.LoadShedType.Name,
        ImposedFromDate: data.ImposedFromDate ? moment(data.ImposedFromDate).format('DD/MM/YYYY') : '',
        ImposedFromTime: data.ImposedFromTime ? moment(data.ImposedFromTime, 'HH:mm').format('HH:mm') : '',
        ImposedToDate: data.ImposedToDate ? moment(data.ImposedToDate).format('DD/MM/YYYY') : '',
        ImposedToTime: data.ImposedToTime ? moment(data.ImposedToTime, 'HH:mm').format('HH:mm') : ''
      };
      this.ref.close(formData);
    } else {
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Load Management',
         detail: 'Please provide remarks and created on time.', closable: true }
      );
      return;
    }
  }

}
