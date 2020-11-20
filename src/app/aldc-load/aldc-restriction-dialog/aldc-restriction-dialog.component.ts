import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadConstituent } from 'src/app/shared/models/load-management.model';
import { DynamicDialogConfig, DynamicDialogRef, MessageService } from 'primeng/api';
import { LOAD_CONSITTUENT_HEADERS } from 'src/app/shared/models/table-headers';
import * as moment from 'moment';

@Component({
  selector: 'app-aldc-restriction-dialog',
  templateUrl: './aldc-restriction-dialog.component.html',
  styleUrls: ['./aldc-restriction-dialog.component.scss']
})
export class AldcRestrictionDialogComponent implements OnInit {
  LoadRestrictionForm: FormGroup;
  selectedColumns: any[] = [];
  selectedConstituents: LoadConstituent[] = [];
  isDetailsUpdate = false;
  dateFormat = 'dd/mm/yy';
  minDateValue = new Date();
  selectedCategory: any = null;
  loggedInUnser: any;
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
    this.loggedInUnser = this.config.data.loggedInUser;
    this.LoadRestrictionForm = this.formBuilder.group({
      Name: [this.loggedInUnser.user.Name, Validators.required],
      Designation:  [this.loggedInUnser.user.Designation, Validators.required],
      ContactNumber:  [this.loggedInUnser.user.ContactNumber, Validators.required],
      LoadShedType: [null, Validators.required],
      ImposedFromTime: [null, Validators.required],
      ImposedToTime: [null],
      ImposedFromDate: [moment().format('DD/MM/YYYY'), Validators.required],
      ImposedToDate: [moment().format('DD/MM/YYYY')]
    });
    this.selectedCategory = this.restrictionTypes[0];
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
        { key: 'errorNotification', severity: 'error', summary: 'Create Load Restriction',
         detail: 'Please provide load details for all selected grids.', closable: true }
      );
      return;
    }
    if (this.LoadRestrictionForm.valid) {
      const data = this.LoadRestrictionForm.getRawValue();
      const formData = {
        LoadGrids: this.selectedConstituents,
        Name: data.Name,
        Designation: data.Designation,
        ContactNumber: data.ContactNumber,
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
         detail: 'Please provide contact details.', closable: true }
      );
      return;
    }
  }

  handleCloseClick() {
    this.ref.close();
  }

}
