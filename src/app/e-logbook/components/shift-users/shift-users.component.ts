import { Component, OnInit, Input } from '@angular/core';
import { Logbook } from 'src/app/shared/models/logbook.model';
import { IUserViewModelInterface } from 'src/app/shared/models/user-management.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApplicationState } from 'src/app/store/state';
import { Store } from '@ngrx/store';
import { DeleteShiftUserAction, AddShiftUserAction, UpdateShiftInchargeAction, ConfirmShiftUserAction } from 'src/app/store/actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterData } from 'src/app/shared/models/master-data.model';

@Component({
  selector: 'app-shift-users',
  templateUrl: './shift-users.component.html',
  styleUrls: ['./shift-users.component.scss']
})
export class ShiftUsersComponent implements OnInit {
  currLogbookData: Logbook;
  @Input()
  set logbookData(data: Logbook) {
    this.currLogbookData = data;
    this.bindData();
  }
  @Input()
  masterData: MasterData;
  shiftUsers: IUserViewModelInterface[] = [];

  ShiftUserForm: FormGroup;
  ShiftInchargeForm: FormGroup;
  allShiftUsersData: IUserViewModelInterface[] = [];
  allShiftInchargeData: IUserViewModelInterface[] = [];
  selectedShiftUsers: IUserViewModelInterface[] = [];
  isShiftUsersConfirmed = false;

  constructor(private confirmationService: ConfirmationService,
              private store: Store<ApplicationState>,
              private formBuilder: FormBuilder,
              private messageService: MessageService) { }

  ngOnInit() {
    this.ShiftUserForm = this.formBuilder.group({
      Employee: [{
        value: '',
        disabled: false
      }, Validators.required],
    });
    this.ShiftInchargeForm = this.formBuilder.group({
      ShiftIncharge: [{
        value: '',
        disabled: false
      }, Validators.required],
    });
    this.bindData();
  }

  bindData() {
    if (this.currLogbookData && this.currLogbookData.ShiftUsers) {
      this.shiftUsers = this.currLogbookData.ShiftUsers;
    }
    if (this.masterData && this.masterData.commonMaster && this.masterData.commonMaster.allShiftUsers) {
      this.allShiftUsersData = this.masterData.commonMaster.allShiftUsers;
    }

    if (this.masterData && this.masterData.commonMaster && this.masterData.commonMaster.shiftInchargeUsers) {
      this.allShiftInchargeData = this.masterData.commonMaster.shiftInchargeUsers;
      if (this.currLogbookData) {
        const shiftIncharge = this.allShiftInchargeData.find(x => x.Id === this.currLogbookData.ShiftIncharge);
        this.ShiftInchargeForm.patchValue({
          ShiftIncharge: shiftIncharge
        });
      }
    }

    if (this.currLogbookData && this.currLogbookData.ShiftConfirmation) {
      this.isShiftUsersConfirmed = true;
    }
  }

  deleteUser(data: IUserViewModelInterface) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete the item?',
      accept: () => {
        this.store.dispatch(new DeleteShiftUserAction({
          logbookId: this.currLogbookData.RequestId,
          id: data.Id
        }));
      }
    });
  }

  searchEmployee(event) {
    this.selectedShiftUsers = this.allShiftUsersData.filter(x => x.Name.toLowerCase().includes(event.query.toString().toLowerCase()));
  }

  addEmployee() {
    if (this.ShiftUserForm.valid) {
      const formData = this.ShiftUserForm.getRawValue();
      const userData = Object.assign({}, formData.Employee) as IUserViewModelInterface;
      // check in existing list if user already exists
      if (this.currLogbookData && this.currLogbookData.ShiftUsers &&
         this.currLogbookData.ShiftUsers.some(x => x.EmployeeId === userData.EmployeeId)) {
        this.messageService.add(
          { key: 'errorNotification', severity: 'error', summary: 'Add Shift User',
           detail: 'Error - User already exist in shift users for this logbook. Please refresh the page once.', closable: true }
        );
      } else {
        userData.LogbookId = this.currLogbookData.RequestId;
        this.store.dispatch(new AddShiftUserAction(userData));
      }
    }
  }

  updateShiftIncharge() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to update shift incharge?',
      accept: () => {
        const formData = this.ShiftInchargeForm.getRawValue();
        const userData = Object.assign({}, formData.ShiftIncharge) as IUserViewModelInterface;
        userData.LogbookId = this.currLogbookData.RequestId;
        this.store.dispatch(new UpdateShiftInchargeAction(userData));
      }
    });
  }

  confirmShiftUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to confirm shift users?',
      accept: () => {
        const LogbookId = this.currLogbookData.RequestId;
        this.store.dispatch(new ConfirmShiftUserAction(LogbookId));
      }
    });
  }
}
