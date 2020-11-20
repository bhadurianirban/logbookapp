import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IUserViewModelInterface, IUserInterface } from '../../shared/models/user-management.model';
import { INITIAL_APPLICATION_STATE, ApplicationState } from '../../store/state';
import { Observable } from 'rxjs';
import * as userActions from '../../store/actions/user-management.actions';
import * as designationActions from '../../store/actions/designation.actions';
import { takeWhile, filter, map, take } from 'rxjs/operators';
import * as fromRoot from '../../store/selectors';
import { DialogService } from 'primeng/api';
import { UsersFormDialogComponent } from '../users-form-dialog/users-form-dialog.component';
import { IUserDialogData } from '../users-form-dialog/users-form-dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DialogService]
})
export class UsersComponent implements OnInit, OnDestroy {
  destroying = false;
  users: any[];
  designationList: any[];
  cols: any[];
  dialogData: IUserDialogData = { userData: null, isdelete: false, designationList: [] };
  constructor(
    private store: Store<ApplicationState>,
    private dialogService: DialogService) {
    this.store.dispatch(new userActions.GetUserAction());
    this.store.dispatch(new designationActions.GetDesignationAction());
  }
  ngOnInit() {
    this.store.select(fromRoot.selectUserMasterElements)
      .subscribe(data => {
        this.users = data.userViewModelData;
      });
    this.store.select(fromRoot.selectDesignationMasterElements)
      .subscribe(data => {
        this.designationList = data.designationData;
      });
    this.cols = [
      { field: 'Name', header: 'Name' },
      { field: 'Designation', header: 'Designation' },
      { field: 'EmployeeId', header: 'Employee Number' },
      { field: 'ContactNumber', header: 'Contact Number' },
      { field: 'EmailId', header: 'Email Id' }
    ];
  }
  open() {
    this.dialogData.userData = null;
    this.dialogData.isdelete = false;
    this.dialogData.designationList = this.designationList;
    const ref = this.dialogService.open(UsersFormDialogComponent,
      {
        data: this.dialogData,
        header: 'Add User',
        width: '50%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.pipe(
      takeWhile(() => !this.destroying)
    )
    .subscribe((data: any) => {
      this.store.dispatch(new userActions.CreateUserAction(data));
    });
  }

  onEditUser(data): void {
    const setObject = {
      Id: data.Id,
      Name: data.Name,
      DesignationId: this.designationList.filter(obj => obj.Designation === data.Designation)[0].Id,
      ContactNumber: data.ContactNumber,
      EmailId: data.EmailId,
      EmployeeId: data.EmployeeId,
      Password: data.Password,
      ConfirmPassword: data.Password
    };
    this.dialogData.userData = setObject;
    this.dialogData.isdelete = false;
    this.dialogData.designationList = this.designationList;
    const ref = this.dialogService.open(UsersFormDialogComponent,
      {
        data: this.dialogData,
        header: 'Edit User',
        width: '50%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((returndata: any) => {
      this.store.dispatch(new userActions.CreateUserAction(returndata));
    });
  }
  onDeleteUser(data): void {
    this.dialogData.isdelete = true;
    const ref = this.dialogService.open(UsersFormDialogComponent,
      {
        data: this.dialogData,
        header: 'Delete Confirmation',
        width: '40%',
        contentStyle: {border: '1px solid #b1b2b3',
      'border-radius': '0px 0px 9px 9px', 'padding-left': '3px !important',
      'padding-right': '3px !important', 'background-color': '#ffffff !important',
      background: '#fff', color: '#000'}
      });
    ref.onClose.subscribe((returndata: any) => {
      if (returndata) {
        const deletedObject: IUserInterface = {
          Id: data.Id,
          Name: '',
          DesignationId: 0,
          ContactNumber: '',
          EmailId: '',
          EmployeeId: '',
          Password: ''
        };
        this.store.dispatch(new userActions.DeleteUserAction(deletedObject));
      }
    });
  }

  ngOnDestroy(): void {
    this.destroying = true;
  }
}
