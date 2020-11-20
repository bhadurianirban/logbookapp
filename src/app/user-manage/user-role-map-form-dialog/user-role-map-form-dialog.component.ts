import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-role-map-form-dialog',
  templateUrl: './user-role-map-form-dialog.component.html',
  styleUrls: ['./user-role-map-form-dialog.component.scss']
})
export class UserRoleMapFormDialogComponent implements OnInit {
  userList = [];
  roleList = [];
  selectedUsers = [];
  selectedRoles = [];
  userroleData: any;
  isdelete = false;
  userroleFormGroup: FormGroup;

  constructor(private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private fb: FormBuilder) {
  }
  ngOnInit() {
    this.userList = this.config.data.Users;
    this.roleList = this.config.data.Roles;
    this.isdelete = this.config.data.isdelete;
    this.userroleFormGroup =
      this.fb.group({
        Id: '',
        UserId: '',
        RoleId: '',
      });
  }
  filterUser(event) {
    this.selectedUsers = this.userList
      .filter(data => data.Name.toString()
        .toLowerCase()
        .indexOf(event.query.toString().toLowerCase()) !== -1);
  }
  filterRole(event) {
    this.selectedRoles = this.roleList
      .filter(data => data.Role.toString()
        .toLowerCase()
        .indexOf(event.query.toString().toLowerCase()) !== -1);
  }
  showRoleDropdown() {
    return this.selectedRoles;
  }
  submitData() {
    if (this.userroleFormGroup.dirty && this.userroleFormGroup.valid) {
      const p = Object.assign({}, this.userroleData, this.userroleFormGroup.value);
      const setObj = {
        Id: '',
        RoleId: p.RoleId.Id,
        UserId: p.UserId.Id
      };
      this.ref.close(setObj);
    }
  }
  deleteData() {
    this.ref.close(true);
  }
}
