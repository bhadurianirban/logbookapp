import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadConstituent } from '../../models/load-management.model';
import { DynamicDialogConfig, DynamicDialogRef, MessageService } from 'primeng/api';
import { LOAD_CONSITTUENT_GRID_HEADERS } from '../../models/table-headers';
import * as moment from 'moment';

@Component({
  selector: 'app-load-release-dialog',
  templateUrl: './load-release-dialog.component.html',
  styleUrls: ['./load-release-dialog.component.scss']
})
export class LoadReleaseDialogComponent implements OnInit {
  LoadForm: FormGroup;
  selectedColumns: any[] = [];
  selectedConstituents: LoadConstituent[] = [];
  isDetailsUpdate = false;

  constructor(private formBuilder: FormBuilder,
              public config: DynamicDialogConfig,
              private ref: DynamicDialogRef,
              private messageService: MessageService) { }

  ngOnInit() {
    this.selectedColumns = LOAD_CONSITTUENT_GRID_HEADERS;
    this.selectedConstituents = this.config.data.constituentArrayData;
    this.isDetailsUpdate = this.config.data.isUpdate;
    this.LoadForm = this.formBuilder.group({
      Remarks: [this.isDetailsUpdate ? this.config.data.Remarks : null, Validators.required],
      Release: [''],
      CreatedOnTime: [this.isDetailsUpdate ? this.config.data.CreatedOnTime : null, Validators.required],
    });
  }

  handleSubmitClick() {
    let isAllLoadUpdated = false;
    this.selectedConstituents.forEach(element => {
      if (element && element.Release > 0) {
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
        CreatedOnTime: data.CreatedOnTime ? data.CreatedOnTime : '',
        LoadGrids: this.selectedConstituents,
        CreatedOnDate: data.CreatedOnTime ? moment().format('DD/MM/YYYY') : ''
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
        CreatedOnTime: data.CreatedOnTime,
        LoadGrids: this.selectedConstituents,
        CreatedOnDate: moment().format('DD/MM/YYYY'),
        CreateCode: true
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
