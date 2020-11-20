import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadPageComponent } from './load-page/load-page.component';
import { SharedModule, CardModule, TabViewModule, ButtonModule, InputTextModule,
  FieldsetModule, CalendarModule, RadioButtonModule } from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './aldc-load.routing';
import { TableModule } from 'primeng/table';
import { AldcRestrictionDialogComponent } from './aldc-restriction-dialog/aldc-restriction-dialog.component';
import { AldcReleaseDialogComponent } from './aldc-release-dialog/aldc-release-dialog.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [LoadPageComponent, AldcRestrictionDialogComponent, AldcReleaseDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TableModule,
    CardModule,
    TabViewModule,
    ButtonModule,
    InputTextModule,
    FieldsetModule,
    CalendarModule,
    RadioButtonModule,
    ToastModule
  ],
  entryComponents: [
    AldcRestrictionDialogComponent,
    AldcReleaseDialogComponent
  ]
})
export class AldcLoadModule { }
