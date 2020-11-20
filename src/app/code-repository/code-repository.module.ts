import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { CodeRepositoryComponent } from './code-repository.component';
import { routes } from './code-repository-routing.config';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
    declarations: [
        CodeRepositoryComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        ToastModule,
        CalendarModule,
        NgxMaterialTimepickerModule
    ],
    exports: [RouterModule]
})

export class CodeRepositoryModule { }
