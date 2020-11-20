export interface IUserRoleMap {
    Id: number;
    UserId: number;
    RoleId: number;
}
export interface IUserRoleMapView {
    Id: number;
    User: string;
    Role: string;
}
export interface IDialogData {
    Users: any[];
    Roles: any[];
    isdelete: boolean;    
}
