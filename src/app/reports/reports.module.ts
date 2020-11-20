import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViolationMessageReportComponent } from './violation-message-report/violation-message-report.component';
import { RouterModule } from '@angular/router';
import { routes } from './reports-route.config';
import { CalendarModule, AutoCompleteModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ElementWiseReportComponent } from './element-wise-report/element-wise-report.component';
import { TieLinesReportComponent } from './tie-lines-report/tie-lines-report.component';

@NgModule({
  declarations: [ViolationMessageReportComponent, ElementWiseReportComponent, TieLinesReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CalendarModule,
    ToastModule,
    TableModule,
    AutoCompleteModule
  ],
  exports: [RouterModule]
})
export class ReportsModule { }
