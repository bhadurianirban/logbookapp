import { NgModule } from '@angular/core';
import { LogbookComponent } from './container/logbook/logbook.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './e-logbook-route.config';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LogbookCreateComponent } from './components/logbook-create/logbook-create.component';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { LogbookResolver } from './resolvers/logbook.resolver';
import { LogbookDashboardComponent } from './components/logbook-dashboard/logbook-dashboard.component';
import { DashboardContainerComponent } from './container/dashboard/dashboard.component';
import { TableModule } from 'primeng/table';
import {CardModule} from 'primeng/card';
import { CancelCodeDialogComponent } from '../shared/components/cancel-code-dialog/cancel-code-dialog.component';
import { ThirdPartyCodeDialogComponent } from '../shared/components/third-party-code-dialog/third-party-code-dialog.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {TabViewModule} from 'primeng/tabview';
import { IssuesComponent } from './components/issues/issues.component';
import { DropdownModule, SplitButtonModule, AutoCompleteModule, FieldsetModule } from 'primeng/primeng';
import { SchedulingComponent } from './components/scheduling/scheduling.component';
import { ShiftUsersComponent } from './components/shift-users/shift-users.component';
import { ShiftHandoverComponent } from './components/shift-handover/shift-handover.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ShiftInstructionsComponent } from './components/shift-instructions/shift-instructions.component';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { EnergySheetComponent } from './components/energy-sheet/energy-sheet.component';
import { ConstituentGenerationComponent } from './components/constituent-generation/constituent-generation.component';
import { NepalFeedersComponent } from './components/nepal-feeders/nepal-feeders.component';
import { SugarMillsGenerationComponent } from './components/sugar-mills-generation/sugar-mills-generation.component';
import { SolarPowerGenerationComponent } from './components/solar-power-generation/solar-power-generation.component';
import { SystemReportComponent } from './components/system-report/system-report.component';
import { SystemReportNetComponent } from './components/system-report-net/system-report-net.component';
import { MaxMinPowerComponent } from './components/max-min-power/max-min-power.component';
import { NBPDCLTieLinesExchangeComponent } from './components/nbpdcl-tie-lines-exchange/nbpdcl-tie-lines-exchange.component';
import { SBPDCLTieLinesExchangeComponent } from './components/sbpdcl-tie-lines-exchange/sbpdcl-tie-lines-exchange.component';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { KhagaulComponent } from './components/khagaul/khagaul.component';

@NgModule({
    declarations: [
        StatisticsComponent,
        LogbookCreateComponent,
        LogbookDashboardComponent,
        DashboardContainerComponent,
        LogbookComponent,
        IssuesComponent,
        SchedulingComponent,
        ShiftUsersComponent,
        ShiftHandoverComponent,
        ShiftInstructionsComponent,
        EnergySheetComponent,
        ConstituentGenerationComponent,
        NepalFeedersComponent,
        SugarMillsGenerationComponent,
        SolarPowerGenerationComponent,
        SystemReportComponent,
        SystemReportNetComponent,
        MaxMinPowerComponent,
        NBPDCLTieLinesExchangeComponent,
        SBPDCLTieLinesExchangeComponent,
        KhagaulComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        CalendarModule,
        RadioButtonModule,
        ToastModule,
        TableModule,
        CardModule,
        ConfirmDialogModule,
        TabViewModule,
        DropdownModule,
        SplitButtonModule,
        AutoCompleteModule,
        InputTextareaModule,
        NgxMaterialTimepickerModule,
        PanelModule,
        CheckboxModule,
        FieldsetModule,
        ScrollPanelModule
    ],
    providers: [LogbookResolver],
    exports: [RouterModule],
    entryComponents: [
        CancelCodeDialogComponent,
        ThirdPartyCodeDialogComponent,
        ConstituentGenerationComponent,
        NepalFeedersComponent,
        SugarMillsGenerationComponent,
        SolarPowerGenerationComponent,
        SystemReportComponent,
        SystemReportNetComponent,
        MaxMinPowerComponent,
        NBPDCLTieLinesExchangeComponent,
        SBPDCLTieLinesExchangeComponent,
        KhagaulComponent
      ]
})

export class ELogBookModule { }
