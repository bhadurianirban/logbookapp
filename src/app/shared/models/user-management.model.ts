export interface IUserInterface {
    Id: number;
    Name: string;
    DesignationId: number;
    EmployeeId: string;
    ContactNumber: string;
    EmailId: string;
    Password: string;
}
export interface IUserViewModelInterface {
    Id: number;
    Name: string;
    Designation: string;
    EmployeeId: string;
    ContactNumber: string;
    EmailId: string;
    Password: string;
    Roles: string[];
    token: string;
    LogbookId: string;
}
