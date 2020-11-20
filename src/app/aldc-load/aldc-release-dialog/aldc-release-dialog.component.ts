import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadConstituent } from 'src/app/shared/models/load-management.model';
import { DynamicDialogConfig, DynamicDialogRef, MessageService } from 'primeng/api';
import { LOAD_CONSITTUENT_GRID_HEADERS } from 'src/app/shared/models/table-headers';

@Component({
  selector: 'app-aldc-release-dialog',
  templateUrl: './aldc-release-dialog.component.html',
  styleUrls: ['./aldc-release-dialog.component.scss']
})
export class AldcReleaseDialogComponent implements OnInit {
  LoadForm: FormGroup;
  selectedColumns: any[] = [];
  selectedConstituents: LoadConstituent[] = [];
  isDetailsUpdate = false;
  loggedInUnser: any;

  constructor(private formBuilder: FormBuilder,
              public config: DynamicDialogConfig,
              private ref: DynamicDialogRef,
              private messageService: MessageService) { }

  ngOnInit() {
    this.selectedColumns = LOAD_CONSITTUENT_GRID_HEADERS;
    this.selectedConstituents = this.config.data.constituentArrayData;
    this.isDetailsUpdate = this.config.data.isUpdate;
    this.loggedInUnser = this.config.data.loggedInUser;
    this.LoadForm = this.formBuilder.group({
      Name: [this.loggedInUnser.user.Name, Validators.required],
      Designation:  [this.loggedInUnser.user.Designation, Validators.required],
      ContactNumber:  [this.loggedInUnser.user.ContactNumber, Validators.required]
    });
  }

  handleSubmitClick() {
    let isAllLoadUpdated = false;
    this.selectedConstituents.forEach(element => {
      if (element && element.Release >= 0) {
        isAllLoadUpdated = true;
      } else {
        isAllLoadUpdated = false;
      }
    });
    if (!isAllLoadUpdated) {
      // show error message
      this.messageService.add(
        { key: 'errorNotification', severity: 'error', summary: 'Create Load Release Entries',
         detail: 'Please provide load details for all selected grids.', closable: true }
      );
      return;
    }
    if (this.LoadForm.valid) {
      const data = this.LoadForm.getRawValue();
      const formData = {
        LoadGrids: this.selectedConstituents,
        Name: data.Name,
        Designation: data.Designation,
        ContactNumber: data.ContactNumber
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

}
