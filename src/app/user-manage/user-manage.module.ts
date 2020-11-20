import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './user-manage-route.config';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRoleMapComponent } from './user-role-map/user-role-map.component';
import {DynamicDialogModule } from 'primeng/dynamicdialog';
import { UserRoleMapFormDialogComponent } from './user-role-map-form-dialog/user-role-map-form-dialog.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ButtonModule} from 'primeng/button';
import { UsersFormDialogComponent } from './users-form-dialog/users-form-dialog.component';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        UsersComponent,
        UserRoleMapComponent,
        UserRoleMapFormDialogComponent,
        UsersFormDialogComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TableModule,
        DynamicDialogModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        ButtonModule,
        FormsModule
    ],
    entryComponents: [
        UserRoleMapFormDialogComponent,
        UsersFormDialogComponent
      ],
    exports: [RouterModule]
})

export class UserManageModule { }
