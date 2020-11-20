import { NgModule } from '@angular/core';

import { AgencyMasterComponent } from './agency-master/agency-master.component';
import { OwnerMasterComponent } from './owner-master/owner-master.component';
import { ViolationComponent } from './violation/violation.component';

import {ButtonModule} from 'primeng/button';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './masterdata-route.config';
import { CommonModule } from '@angular/common';
import { ConfigValuesComponent } from './config-values/config-values.component';
import { TableModule } from 'primeng/table';
import { ConfigDialogComponent } from './config-dialog/config-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ViolationDialogComponent } from './violation-dialog/violation-dialog.component';
import { ConstituentMasterComponent } from './constituent-master/constituent-master.component';
import { ConstituentDialogueComponent } from './constituent-dialogue/constituent-dialogue.component';
import { DesignationMasterComponent } from './designation-master/designation-master.component';
import { DesignationDialogueComponent } from './designation-dialogue/designation-dialogue.component';
import { IssueMasterComponent } from './issue-master/issue-master.component';
import { IssueDialogueComponent } from './issue-dialogue/issue-dialogue.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { SchedulingDialogComponent } from './scheduling-dialog/scheduling-dialog.component';
import { TrippingComponent } from './tripping/tripping.component';
import { TrippingDialogueComponent } from './tripping-dialogue/tripping-dialogue.component';
import { ConfirmDialogModule, OrderListModule } from 'primeng/primeng';
import { FirstTimeChargeLineComponent } from './first-time-charge-line/first-time-charge-line.component';
import { FirstTimeChargeLineDialogueComponent } from './first-time-charge-line-dialogue/first-time-charge-line-dialogue.component';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
    declarations: [
        AgencyMasterComponent,
        OwnerMasterComponent,
        ViolationComponent,
        ConfigValuesComponent,
        ConfigDialogComponent,
        ViolationDialogComponent,
        ConstituentMasterComponent,
        ConstituentDialogueComponent,
        DesignationMasterComponent,
        DesignationDialogueComponent,
        IssueMasterComponent,
        IssueDialogueComponent,
        SchedulingComponent,
        SchedulingDialogComponent,
        TrippingComponent,
        TrippingDialogueComponent,
        FirstTimeChargeLineComponent,
        FirstTimeChargeLineDialogueComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        TableModule,
        ToastModule,
        ButtonModule,
        ConfirmDialogModule,
        OrderListModule,
        DropdownModule,
        AutoCompleteModule
    ],
    exports: [RouterModule],
    entryComponents: [
        ConfigDialogComponent,
        ViolationDialogComponent,
        ConstituentDialogueComponent,
        IssueDialogueComponent,
        TrippingDialogueComponent,
        SchedulingDialogComponent,
        DesignationDialogueComponent,
        FirstTimeChargeLineDialogueComponent
      ],
})
export class MasterDataModule { }
