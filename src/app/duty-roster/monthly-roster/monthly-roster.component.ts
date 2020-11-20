import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../store/state';
import * as userActions from '../../store/actions/user-management.actions';
import * as groupActions from '../../store/actions/roaster-group.actions';
import * as groupUserActions from '../../store/actions/roaster-group-user.actions';
import * as dutyRoasterActions from '../../store/actions/duty-roaster.actions';
import * as fromRoot from '../../store/selectors';
import { IRoasterGroupUserCombination, IRoasterGroupUserViewModel } from '../../shared/models/roaster-group-user.model';
import { IDutyRoasterMonthData, IDutyRoasterMonthDataViewModel } from '../../shared/models/duty-roaster.model';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-monthly-roster',
  templateUrl: './monthly-roster.component.html',
  styleUrls: ['./monthly-roster.component.scss']
})
export class MonthlyRosterComponent implements OnInit {
  getMainData: IDutyRoasterMonthDataViewModel = { DutyRoasterMonthData: null, Comments: [] };
  specialInstruction: any[] = [];
  dutyRoastercols: any[];
  dutyRoasterData: any;
  dutyRoasterColumns: string[] = [];
  dutyRoasterColumns2nd: string[] = [];
  dutyRoasterRows: IDutyRoasterMonthData[] = [];
  groupArray: string[] = ['Group-A', 'Group-B', 'Group-C', 'Group-D'];
  rowArrayOption: SelectItem[];
  rowArray = ['R', 'M', 'E', 'N'];
  users: any[];
  selectedGroups = [];
  groupList = [];
  selectedGroup: any;
  selectedGroupShiftInCharge: any;
  selectedUserShiftInCharge: any;
  selectedUsers = [];
  dateValue: any;
  selectedRows: any[];
  cols: any[];
  groupWiseUserData: IRoasterGroupUserViewModel[];
  group1Data: IRoasterGroupUserViewModel[];
  group2Data: IRoasterGroupUserViewModel[];
  group3Data: IRoasterGroupUserViewModel[];
  group4Data: IRoasterGroupUserViewModel[];
  group1ShiftInCharge: IRoasterGroupUserViewModel[];
  group2ShiftInCharge: IRoasterGroupUserViewModel[];
  group3ShiftInCharge: IRoasterGroupUserViewModel[];
  group4ShiftInCharge: IRoasterGroupUserViewModel[];

  roasterGroupUserCombination: IRoasterGroupUserCombination = { Users: null, Group: null, Month: '', ShiftInCharge: false };

  constructor(private store: Store<ApplicationState>,
              private messageService: MessageService) {
    const d = new Date();
    this.dateValue = (d.getMonth() + 1) + '/' + d.getFullYear();
    this.store.dispatch(new userActions.GetUserAction());
    this.store.dispatch(new groupActions.GetRoasterGroupAction());
    this.store.dispatch(new groupUserActions.GetRoasterGroupUserAction(this.dateValue));
    this.store.dispatch(new dutyRoasterActions.GetDutyRoasterConfigAction(this.dateValue));
  }
  ngOnInit() {
    this.rowArrayOption = this.rowArray.map((name) => {
      return { label: name, value: name };
    });
    this.store.select(fromRoot.selectUserMasterElements)
      .subscribe(data => {
        this.users = data.userViewModelData;
        this.selectedUserShiftInCharge = this.users[0];
      });
    this.store.select(fromRoot.selectRoasterGroupElements)
      .subscribe(data => {
        this.groupList = data.roasterGroupData;
        this.selectedGroup = this.groupList[0];
        this.selectedGroupShiftInCharge = this.groupList[0];
      });
    this.store.select(fromRoot.selectRoasterGroupUserElements)
      .subscribe(data => {
        this.groupWiseUserData = data.roasterGroupUserData;
        this.populateGroupData(this.groupWiseUserData);
        this.populateGroupwiseShiftInCharge(this.groupWiseUserData);
      });
    this.store.select(fromRoot.selectDutyRoasterElements)
      .subscribe(data => {
        this.dutyRoasterColumns = [];
        this.dutyRoasterColumns2nd = [];
        this.dutyRoasterData = data.dutyRoasterData;
        if (data.dutyRoasterData.length !== 0) {
          this.specialInstruction = this.dutyRoasterData.comments;
          for (let iCount = 0; iCount <= this.dutyRoasterData.Config[0].length; iCount++) {
            if (iCount === 0) {
              this.dutyRoasterColumns.push('');
            } else {
              this.dutyRoasterColumns.push(iCount.toString());
            }
          }
          for (let iCount = 0; iCount <= this.dutyRoasterData.Config[0].length; iCount++) {
            if (iCount === 0) {
              this.dutyRoasterColumns2nd.push('');
            } else {
              this.dutyRoasterColumns2nd.push(this.dutyRoasterData.Config[0][iCount - 1]);
            }
          }
          this.populateHeader(this.dutyRoasterData.Config[0].length);
          this.populateDutyRoasterData(this.dutyRoasterData);
        }
      });
    this.cols = [
      { field: 'Name', header: 'Name' },
      { field: 'Designation', header: 'Designation' },
      { field: 'ContactNumber', header: 'Contact Number' },
      { field: 'EmailId', header: 'Email Id' },
      { field: 'EmployeeId', header: 'Employee Id' }
    ];
  }
  filterGroup(event) {
    this.selectedGroups = this.groupList
      .filter(data => data.GroupName.toString()
        .toLowerCase()
        .indexOf(event.query.toString().toLowerCase()) !== -1);
  }
  showGroupDropdown() {
    return this.selectedGroups;
  }

  filterUser(event) {
    this.selectedUsers = this.users
      .filter(data => data.Name.toString()
        .toLowerCase()
        .indexOf(event.query.toString().toLowerCase()) !== -1);
  }
  showUserDropdown() {
    return this.selectedUsers;
  }
  populateHeader(p) {
    if (p === 31) {
      this.dutyRoastercols = [
        { field: 'Group', header: 'Group' },
        { field: 'Day1', header: '1' },
        { field: 'Day2', header: '2' },
        { field: 'Day3', header: '3' },
        { field: 'Day4', header: '4' },
        { field: 'Day5', header: '5' },
        { field: 'Day6', header: '6' },
        { field: 'Day7', header: '7' },
        { field: 'Day8', header: '8' },
        { field: 'Day9', header: '9' },
        { field: 'Day10', header: '10' },
        { field: 'Day11', header: '11' },
        { field: 'Day12', header: '12' },
        { field: 'Day13', header: '13' },
        { field: 'Day14', header: '14' },
        { field: 'Day15', header: '15' },
        { field: 'Day16', header: '16' },
        { field: 'Day17', header: '17' },
        { field: 'Day18', header: '18' },
        { field: 'Day19', header: '19' },
        { field: 'Day20', header: '20' },
        { field: 'Day21', header: '21' },
        { field: 'Day22', header: '22' },
        { field: 'Day23', header: '23' },
        { field: 'Day24', header: '24' },
        { field: 'Day25', header: '25' },
        { field: 'Day26', header: '26' },
        { field: 'Day27', header: '27' },
        { field: 'Day28', header: '28' },
        { field: 'Day29', header: '29' },
        { field: 'Day30', header: '30' },
        { field: 'Day31', header: '31' }
      ];
    } else {
      this.dutyRoastercols = [
        { field: 'Group', header: 'Group' },
        { field: 'Day1', header: '1' },
        { field: 'Day2', header: '2' },
        { field: 'Day3', header: '3' },
        { field: 'Day4', header: '4' },
        { field: 'Day5', header: '5' },
        { field: 'Day6', header: '6' },
        { field: 'Day7', header: '7' },
        { field: 'Day8', header: '8' },
        { field: 'Day9', header: '9' },
        { field: 'Day10', header: '10' },
        { field: 'Day11', header: '11' },
        { field: 'Day12', header: '12' },
        { field: 'Day13', header: '13' },
        { field: 'Day14', header: '14' },
        { field: 'Day15', header: '15' },
        { field: 'Day16', header: '16' },
        { field: 'Day17', header: '17' },
        { field: 'Day18', header: '18' },
        { field: 'Day19', header: '19' },
        { field: 'Day20', header: '20' },
        { field: 'Day21', header: '21' },
        { field: 'Day22', header: '22' },
        { field: 'Day23', header: '23' },
        { field: 'Day24', header: '24' },
        { field: 'Day25', header: '25' },
        { field: 'Day26', header: '26' },
        { field: 'Day27', header: '27' },
        { field: 'Day28', header: '28' },
        { field: 'Day29', header: '29' },
        { field: 'Day30', header: '30' }
      ];
    }
  }
  populateGroupData(p) {
    this.group1Data = p.filter((obj) => {
      return obj.GroupName === 'Group-A' && obj.ShiftInCharge === false;
    });
    this.group2Data = p.filter((obj) => {
      return obj.GroupName === 'Group-B' && obj.ShiftInCharge === false;
    });
    this.group3Data = p.filter((obj) => {
      return obj.GroupName === 'Group-C' && obj.ShiftInCharge === false;
    });
    this.group4Data = p.filter((obj) => {
      return obj.GroupName === 'Group-D' && obj.ShiftInCharge === false;
    });
  }
  populateGroupwiseShiftInCharge(p) {
    this.group1ShiftInCharge = p.filter((obj) => {
      return obj.GroupName === 'Group-A' && obj.ShiftInCharge === true;
    });
    this.group2ShiftInCharge = p.filter((obj) => {
      return obj.GroupName === 'Group-B' && obj.ShiftInCharge === true;
    });
    this.group3ShiftInCharge = p.filter((obj) => {
      return obj.GroupName === 'Group-C' && obj.ShiftInCharge === true;
    });
    this.group4ShiftInCharge = p.filter((obj) => {
      return obj.GroupName === 'Group-D' && obj.ShiftInCharge === true;
    });
    if (this.group1ShiftInCharge.length === 0) {
      this.group1ShiftInCharge = [{ Id: 0, Name: '', Designation: '', GroupName: '', Month: '', ShiftInCharge: true }];
    }
    if (this.group2ShiftInCharge.length === 0) {
      this.group2ShiftInCharge = [{ Id: 0, Name: '', Designation: '', GroupName: '', Month: '', ShiftInCharge: true }];
    }
    if (this.group3ShiftInCharge.length === 0) {
      this.group3ShiftInCharge = [{ Id: 0, Name: '', Designation: '', GroupName: '', Month: '', ShiftInCharge: true }];
    }
    if (this.group4ShiftInCharge.length === 0) {
      this.group4ShiftInCharge = [{ Id: 0, Name: '', Designation: '', GroupName: '', Month: '', ShiftInCharge: true }];
    }

  }
  addToGroup() {
    this.roasterGroupUserCombination.Users = this.selectedRows;
    this.roasterGroupUserCombination.Group = this.selectedGroup;
    this.roasterGroupUserCombination.Month = this.dateValue;
    this.roasterGroupUserCombination.ShiftInCharge = false;
    this.store.dispatch(new groupUserActions.CreateRoasterGroupUserAction(this.roasterGroupUserCombination));
    this.selectedRows = [];
    this.roasterGroupUserCombination = { Users: null, Group: null, Month: '', ShiftInCharge: false };
  }
  onDeleteCombination(p) {
    const setGroupUser = { Id: p.Id, GroupId: 0, UserId: 0, ShiftInCharge: false, Month: this.dateValue };
    this.store.dispatch(new groupUserActions.DeleteRoasterGroupUserAction(setGroupUser));
  }
  updateShiftInCharge() {
    this.roasterGroupUserCombination.Users = [this.selectedUserShiftInCharge];
    this.roasterGroupUserCombination.Group = this.selectedGroupShiftInCharge;
    this.roasterGroupUserCombination.Month = this.dateValue;
    this.roasterGroupUserCombination.ShiftInCharge = true;
    this.store.dispatch(new groupUserActions.CreateRoasterGroupUserAction(this.roasterGroupUserCombination));
    this.roasterGroupUserCombination = { Users: null, Group: null, Month: '', ShiftInCharge: false };
  }
  populateDutyRoasterData(p) {
    this.dutyRoasterRows = [];
    for (let iCountOuter = 0; iCountOuter < 4; iCountOuter++) {
      const groupName = this.groupArray[iCountOuter];
      const day1Data = p.Config[iCountOuter + 1][0];
      const day2Data = p.Config[iCountOuter + 1][1];
      const day3Data = p.Config[iCountOuter + 1][2];
      const day4Data = p.Config[iCountOuter + 1][3];
      const day5Data = p.Config[iCountOuter + 1][4];
      const day6Data = p.Config[iCountOuter + 1][5];
      const day7Data = p.Config[iCountOuter + 1][6];
      const day8Data = p.Config[iCountOuter + 1][7];
      const day9Data = p.Config[iCountOuter + 1][8];
      const day10Data = p.Config[iCountOuter + 1][9];
      const day11Data = p.Config[iCountOuter + 1][10];
      const day12Data = p.Config[iCountOuter + 1][11];
      const day13Data = p.Config[iCountOuter + 1][12];
      const day14Data = p.Config[iCountOuter + 1][13];
      const day15Data = p.Config[iCountOuter + 1][14];
      const day16Data = p.Config[iCountOuter + 1][15];
      const day17Data = p.Config[iCountOuter + 1][16];
      const day18Data = p.Config[iCountOuter + 1][17];
      const day19Data = p.Config[iCountOuter + 1][18];
      const day20Data = p.Config[iCountOuter + 1][19];
      const day21Data = p.Config[iCountOuter + 1][20];
      const day22Data = p.Config[iCountOuter + 1][21];
      const day23Data = p.Config[iCountOuter + 1][22];
      const day24Data = p.Config[iCountOuter + 1][23];
      const day25Data = p.Config[iCountOuter + 1][24];
      const day26Data = p.Config[iCountOuter + 1][25];
      const day27Data = p.Config[iCountOuter + 1][26];
      const day28Data = p.Config[iCountOuter + 1][27];
      const day29Data = p.Config[iCountOuter + 1][28];
      const day30Data = p.Config[iCountOuter + 1][29];
      let day31Data = '';
      if (p.Config[0].length === 31) {
        day31Data = p.Config[iCountOuter + 1][30];
      }
      const getMonth = this.dateValue.split('/')[0];
      const setMonth = (Number.parseInt(getMonth, 10) < 10) ? ('0' + getMonth) : getMonth;
      if (p.Config[0].length === 31) {
        const dutyRoasterObject = {
          Id: 0,
          Month: setMonth,
          Year: this.dateValue.split('/')[1],
          Group: groupName,
          Day1: day1Data,
          Day2: day2Data,
          Day3: day3Data,
          Day4: day4Data,
          Day5: day5Data,
          Day6: day6Data,
          Day7: day7Data,
          Day8: day8Data,
          Day9: day9Data,
          Day10: day10Data,
          Day11: day11Data,
          Day12: day12Data,
          Day13: day13Data,
          Day14: day14Data,
          Day15: day15Data,
          Day16: day16Data,
          Day17: day17Data,
          Day18: day18Data,
          Day19: day19Data,
          Day20: day20Data,
          Day21: day21Data,
          Day22: day22Data,
          Day23: day23Data,
          Day24: day24Data,
          Day25: day25Data,
          Day26: day26Data,
          Day27: day27Data,
          Day28: day28Data,
          Day29: day29Data,
          Day30: day30Data,
          Day31: day31Data
        };
        this.dutyRoasterRows.push(dutyRoasterObject);
      } else {
        const dutyRoasterObject = {
          Id: 0,
          Month: setMonth,
          Year: this.dateValue.split('/')[1],
          Group: groupName,
          Day1: day1Data,
          Day2: day2Data,
          Day3: day3Data,
          Day4: day4Data,
          Day5: day5Data,
          Day6: day6Data,
          Day7: day7Data,
          Day8: day8Data,
          Day9: day9Data,
          Day10: day10Data,
          Day11: day11Data,
          Day12: day12Data,
          Day13: day13Data,
          Day14: day14Data,
          Day15: day15Data,
          Day16: day16Data,
          Day17: day17Data,
          Day18: day18Data,
          Day19: day19Data,
          Day20: day20Data,
          Day21: day21Data,
          Day22: day22Data,
          Day23: day23Data,
          Day24: day24Data,
          Day25: day25Data,
          Day26: day26Data,
          Day27: day27Data,
          Day28: day28Data,
          Day29: day29Data,
          Day30: day30Data
        };
        this.dutyRoasterRows.push(dutyRoasterObject);
      }
    }
  }
  cellChanged(event, rowIndex, filedName) {
    rowIndex = rowIndex - 1;
    let getSameValue = false;
    let iCount = 0;
    for (iCount = 0; iCount < 4; iCount++) {
      if (this.dutyRoasterRows[iCount][filedName] === event
        && iCount !== rowIndex
      ) {
        getSameValue = true;
        this.dutyRoasterRows[iCount][filedName] = '';
        let errorMsg = '';
        if (event === 'N') {
          errorMsg = 'Night Shift cannot be assigned to more than 1 group.';
        } else if (event === 'E') {
          errorMsg = 'Evening Shift cannot be assigned to more than 1 group.';
        } else if (event === 'M') {
          errorMsg = 'Morning Shift cannot be assigned to more than 1 group.';
        } else {
          errorMsg = 'Off Duty cannot be assigned to more than 1 group.';
        }
        this.messageService.add(
          {
            key: 'errorNotification', severity: 'error', summary: 'Duty Roster',
            detail: 'Error - ' + errorMsg, closable: true
          }
        );
      }
    }
  }
  submitRoaster() {
    if (!this.checkObjectIsNullOrNot(this.dutyRoasterRows[0])
      && (!this.checkObjectIsNullOrNot(this.dutyRoasterRows[1]))
      && (!this.checkObjectIsNullOrNot(this.dutyRoasterRows[2]))
      && (!this.checkObjectIsNullOrNot(this.dutyRoasterRows[3]))
    ) {
      this.getMainData = { DutyRoasterMonthData: this.dutyRoasterRows, Comments: this.specialInstruction };
      this.store.dispatch(new dutyRoasterActions.CreateDutyRoasterConfigAction(this.getMainData));
      this.dutyRoasterRows = [];
      this.dutyRoasterColumns = [];
      this.dutyRoasterColumns2nd = [];
    }
  }
  generateRpt(isBool: boolean = false) {
    const getMonth = this.dateValue.split('/')[0];
    const setMonth = (Number.parseInt(getMonth, 10) < 10) ? ('0' + getMonth) : getMonth;
    const setYearMonth = setMonth + '-' + this.dateValue.split('/')[1];
    this.store.dispatch(new dutyRoasterActions.RptDutyRoasterConfigAction({
      month: setYearMonth, isExcel: isBool }));
  }
  checkObjectIsNullOrNot(p): any {
    const getValues = Object.values(p);
    return getValues.findIndex(e => e === '') > -1;
  }
  onBlurMethod() {
    this.dateValue = (this.dateValue.getMonth() + 1) + '/' + this.dateValue.getFullYear();
    this.store.dispatch(new userActions.GetUserAction());
    this.store.dispatch(new groupActions.GetRoasterGroupAction());
    this.store.dispatch(new groupUserActions.GetRoasterGroupUserAction(this.dateValue));
    this.store.dispatch(new dutyRoasterActions.GetDutyRoasterConfigAction(this.dateValue));
  }

  addParagraph() {
    this.specialInstruction = Object.assign([], this.specialInstruction);
    this.specialInstruction.push('');
  }

  removeParagraph(index: number) {
    this.specialInstruction = Object.assign([], this.specialInstruction);
    this.specialInstruction.splice(index, 1);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  onTextareaValueChange(event: any, index: number) {
    const existingData = this.specialInstruction.slice();
    existingData[index] = event.target.value;
    this.specialInstruction = existingData;
  }
}
