import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './dashboard-routing.config';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/primeng';
import { CancelCodeDialogComponent } from '../shared/components/cancel-code-dialog/cancel-code-dialog.component';
import { ThirdPartyCodeDialogComponent } from '../shared/components/third-party-code-dialog/third-party-code-dialog.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        TabViewModule,
        ToastModule,
        ConfirmDialogModule,
        NgxMaterialTimepickerModule
    ],
    exports: [RouterModule],
    entryComponents: [
        CancelCodeDialogComponent,
        ThirdPartyCodeDialogComponent
    ]
})

export class DashboardModule { }
