import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutageComponent } from './components/outage/outage.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MasterDataResolver } from './resolvers/master-data.resolver';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OutageFormDialogComponent } from './components/outage-form-dialog/outage-form-dialog.component';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabViewModule } from 'primeng/tabview';
import {ButtonModule} from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ThirdPartyCodeDialogComponent } from './components/third-party-code-dialog/third-party-code-dialog.component';
import { CancelCodeDialogComponent } from './components/cancel-code-dialog/cancel-code-dialog.component';
import { ConfirmationService } from 'primeng/api';
import { TrippingComponent } from './components/tripping/tripping.component';
import { TrippingFormDialogComponent } from './components/tripping-form-dialog/tripping-form-dialog.component';
import { DropdownModule } from 'primeng/dropdown';
import { ShutdownComponent } from './components/shutdown/shutdown.component';
import { ShutdownFormDialogComponent } from './components/shutdown-form-dialog/shutdown-form-dialog.component';

import {FieldsetModule} from 'primeng/fieldset';
import { MasterElementsResolver } from './resolvers/master-elements.resolver';
import { ViolationMessageComponent } from './components/violation-message/violation-message.component';
import { AntitheftComponent } from './components/antitheft/antitheft.component';
import { AntitheftFormDialogComponent } from './components/antitheft-form-dialog/antitheft-form-dialog.component';
import { FscTcscComponent } from './components/fsc-tcsc/fsc-tcsc.component';
import { StatcomComponent } from './components/statcom/statcom.component';
import { CodesComponent } from './components/codes/codes.component';
import { AutoRecloseComponent } from './components/auto-reclose/auto-reclose.component';
import { AutoRecloseDialogComponent } from './components/auto-reclose-dialog/auto-reclose-dialog.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FirstTimeChargeComponent } from './components/first-time-charge/first-time-charge.component';
import { FirstTimeChargeDialogComponent } from './components/first-time-charge-dialog/first-time-charge-dialog.component';
import { TieLinesComponent } from './components/tie-lines/tie-lines.component';
import { DeferShutdownDialogComponent } from './components/defer-shutdown-dialog/defer-shutdown-dialog.component';
import { LoadManagementDialogComponent } from './components/load-management-dialog/load-management-dialog.component';
import { LoadManagementComponent } from './components/load-management/load-management.component';
import { LoadReleaseComponent } from './components/load-release/load-release.component';
import { LoadReleaseDialogComponent } from './components/load-release-dialog/load-release-dialog.component';
import { GridsWithRestrictionComponent } from './components/grids-with-restriction/grids-with-restriction.component';
import { RadioButtonModule, InputTextareaModule } from 'primeng/primeng';
import { PowerChangeOverComponent } from './components/power-change-over/power-change-over.component';

@NgModule({
  declarations: [
    OutageComponent,
    OutageFormDialogComponent,
    ThirdPartyCodeDialogComponent,
    CancelCodeDialogComponent,
    TrippingComponent,
    TrippingFormDialogComponent,
    ShutdownComponent,
    ShutdownFormDialogComponent,
    ViolationMessageComponent,
    AntitheftComponent,
    AntitheftFormDialogComponent,
    FscTcscComponent,
    StatcomComponent,
    CodesComponent,
    AutoRecloseComponent,
    AutoRecloseDialogComponent,
    FirstTimeChargeComponent,
    FirstTimeChargeDialogComponent,
    TieLinesComponent,
    DeferShutdownDialogComponent,
    LoadManagementDialogComponent,
    LoadManagementComponent,
    LoadReleaseComponent,
    LoadReleaseDialogComponent,
    GridsWithRestrictionComponent,
    PowerChangeOverComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DynamicDialogModule,
    CalendarModule,
    AutoCompleteModule,
    TabViewModule,
    ButtonModule,
    SplitButtonModule,
    FieldsetModule,
    DropdownModule,
    NgxMaterialTimepickerModule,
    RadioButtonModule,
    InputTextareaModule
  ],
  providers: [
    MasterDataResolver,
    ConfirmationService,
    MasterElementsResolver
  ],
  entryComponents: [
      OutageFormDialogComponent,
      TrippingFormDialogComponent,
      ShutdownFormDialogComponent,
      AntitheftFormDialogComponent,
      AutoRecloseDialogComponent,
      FirstTimeChargeDialogComponent,
      DeferShutdownDialogComponent,
      LoadManagementDialogComponent,
      LoadReleaseDialogComponent
    ],
  exports: [OutageComponent, TrippingComponent, ShutdownComponent, ViolationMessageComponent,
    AntitheftComponent, FscTcscComponent, StatcomComponent, CodesComponent, AutoRecloseComponent,
     FirstTimeChargeComponent, TieLinesComponent, LoadManagementComponent, LoadReleaseComponent,
     GridsWithRestrictionComponent, PowerChangeOverComponent]
})
export class SharedModule { }
