import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-users-form-dialog',
  templateUrl: './users-form-dialog.component.html',
  styleUrls: ['./users-form-dialog.component.scss']
})
export class UsersFormDialogComponent implements OnInit {
  isdelete = false;
  userFormGroup: FormGroup;
  designationList = [];
  selectedDesignations = [];
  userData: any;
  designation: any;
  buttonText = 'Add User';
  constructor(private fb: FormBuilder,
              private config: DynamicDialogConfig,
              private ref: DynamicDialogRef) { }
  ngOnInit() {
    this.designationList = this.config.data.designationList;
    this.userData = this.config.data.userData;
    this.isdelete = this.config.data.isdelete;
    this.designation = this.designationList[0];

    this.userFormGroup =
      this.fb.group({
        Id: '',
        DesignationId: '',
        EmployeeId: ['', Validators.required],
        Name: ['', Validators.required],
        ContactNumber: ['', Validators.required],
        EmailId: ['', Validators.required],
        Password: ['', Validators.required],
        ConfirmPassword: ['']
      });
    if (this.userData !== null) {
      this.buttonText = 'Edit User';
      this.populateEditableData(this.userData);
    }
  }
  filterDesignation(event) {
    this.selectedDesignations = this.designationList
      .filter(data => data.Designation.toString()
        .toLowerCase()
        .indexOf(event.query.toString().toLowerCase()) !== -1);
  }
  showDesignationDropdown() {
    return this.selectedDesignations;
  }
  submitData() {
    if (this.userFormGroup.dirty && this.userFormGroup.valid) {
      const p = Object.assign({}, this.userData, this.userFormGroup.value);
      p.DesignationId = this.userFormGroup.get('DesignationId').value.Id;
      this.ref.close(p);
    }
  }
  populateEditableData(p) {
    this.userFormGroup.get('Id').setValue(p.Id);
    this.userFormGroup.get('DesignationId').setValue(p.DesignationId);
    this.userFormGroup.get('Name').setValue(p.Name);
    this.userFormGroup.get('ContactNumber').setValue(p.ContactNumber);
    this.userFormGroup.get('EmailId').setValue(p.EmailId);
    this.userFormGroup.get('EmployeeId').setValue(p.EmployeeId);
    this.userFormGroup.get('Password').setValue(p.Password);
    this.userFormGroup.get('ConfirmPassword').setValue(p.ConfirmPassword);
    this.designation = this.designationList.filter(function (obj) {
      return obj.Id === p.DesignationId
    })[0];
  }

  deleteData() {
    this.ref.close(true);
  }

}
