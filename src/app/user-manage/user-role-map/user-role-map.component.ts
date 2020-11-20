import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUserRoleMapView, IDialogData } from './user-role-map.model';
import { ApplicationState } from '../../store/state';
import * as userActions from '../../store/actions/user-management.actions';
import * as roleActions from '../../store/actions/role.actions';
import * as userroleActions from '../../store/actions/user-role.actions';
import * as fromRoot from '../../store/selectors';
import { DialogService } from 'primeng/api';
import { UserRoleMapFormDialogComponent } from '../user-role-map-form-dialog/user-role-map-form-dialog.component';

@Component({
  selector: 'app-user-role-map',
  templateUrl: './user-role-map.component.html',
  styleUrls: ['./user-role-map.component.scss'],
  providers: [DialogService]
})
export class UserRoleMapComponent implements OnInit {
  userList: any[];
  roleList: any[];
  userRoleList: IUserRoleMapView[];
  closeResult: string;
  userRolecols: any[];
  dialogData: IDialogData = { Roles: [], Users: [], isdelete: false };

  constructor(private store: Store<ApplicationState>,
              private dialogService: DialogService) {
    this.store.dispatch(new userActions.GetUserAction());
    this.store.dispatch(new roleActions.GetRoleAction());
    this.store.dispatch(new userroleActions.GetUserRoleMapAction());
  }

  ngOnInit() {
    this.store.select(fromRoot.selectUserMasterElements)
      .subscribe(data => {
        this.userList = data.userViewModelData;
      });
    this.store.select(fromRoot.selectUserRoleMasterElements)
      .subscribe(data => {
        this.userRoleList = data.userRoleMapData;
      });
    this.store.select(fromRoot.selectRoleMasterElements)
      .subscribe(data => {
        this.roleList = data.roleData;
      });
    this.userRolecols = [
      { field: 'User', header: 'User' },
      { field: 'Role', header: 'Role' }
    ];

  }
  open() {
    this.dialogData.Roles = this.roleList;
    this.dialogData.Users = this.userList;
    this.dialogData.isdelete = false;
    const ref = this.dialogService.open(UserRoleMapFormDialogComponent,
      {
        data: this.dialogData,
        header: 'Add Mapping',
        width: '65%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((data: any) => {
      this.store.dispatch(new userroleActions.CreateUserRoleMapAction(data));
    });
  }
  onDeleteMap(getdata): void {
    this.dialogData.Roles = this.roleList;
    this.dialogData.Users = this.userList;
    this.dialogData.isdelete = true;
    const ref = this.dialogService.open(UserRoleMapFormDialogComponent,
      {
        data: this.dialogData,
        header: 'Delete Confirmation',
        width: '40%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((data: any) => {
      if (data) {
        const deletedObject = {
          Id: getdata.Id,
          RoleId: 0,
          UserId: 0
        };
        this.store.dispatch(new userroleActions.DeleteUserRoleMapAction(deletedObject));
      }
    });
  }

}
