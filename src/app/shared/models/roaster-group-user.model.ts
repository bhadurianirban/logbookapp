import { IUserInterface } from './user-management.model';
import { IRoasterGroup } from './roaster-group.model';
export interface IRoasterGroupUser {
    Id: number;
    GroupId: number;
    UserId: number;
    Month: string;
}
export interface IRoasterGroupUserViewModel {
    Id: number;
    Name: string;
    Designation: string;
    GroupName: string;
    Month: string;
    ShiftInCharge: boolean;
}
export interface IRoasterGroupUserCombination {
    Users: IUserInterface[];
    Group: IRoasterGroup;
    Month: string;
    ShiftInCharge: boolean;
}
