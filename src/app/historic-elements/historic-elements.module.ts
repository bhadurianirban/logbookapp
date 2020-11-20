import { NgModule } from '@angular/core';

import { ShutdownProcessingComponent } from './shutdown-processing/shutdown-processing.component';
import { OutageComponent } from './outage/outage.component';
import { TrippingComponent } from './tripping/tripping.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './historic-elements-route.config';
import { CommonModule } from '@angular/common';
import { CalendarModule, ConfirmDialogModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { AntitheftComponent } from './antitheft/antitheft.component';
import { AutoRecloseComponent } from './auto-reclose/auto-reclose.component';
import { ToastModule } from 'primeng/toast';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FirstTimeChargeComponent } from './first-time-charge/first-time-charge.component';

@NgModule({
    declarations: [
        ShutdownProcessingComponent,
        OutageComponent,
        TrippingComponent,
        AntitheftComponent,
        AutoRecloseComponent,
        FirstTimeChargeComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes),
        CalendarModule,
        ConfirmDialogModule,
        ToastModule,
        NgxMaterialTimepickerModule
    ],
    exports: [RouterModule]
})

export class HistoricElementsModule { }
