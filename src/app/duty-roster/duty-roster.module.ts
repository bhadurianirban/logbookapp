import { NgModule } from '@angular/core';
import { MonthlyRosterComponent } from './monthly-roster/monthly-roster.component';
import { EmployeeShiftSummaryReportComponent } from './employee-shift-summary-report/employee-shift-summary-report.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './duty-roster-route.config';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {CalendarModule} from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';


@NgModule({
    declarations: [
        MonthlyRosterComponent,
        EmployeeShiftSummaryReportComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PanelModule,
        TableModule,
        ButtonModule,
        AutoCompleteModule,
        CalendarModule,
        FormsModule,
        DropdownModule,
        InputTextareaModule,
        ToastModule,
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})

export class DutyRosterModule { }
