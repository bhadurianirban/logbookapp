import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './logbook-reducer';
import { INITIAL_APPLICATION_STATE } from './store/state';
import { EffectsModule } from '@ngrx/effects';
import * as RootEffects from './store/effects/index';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MessageService } from 'primeng/api';
import {MegaMenuModule} from 'primeng/megamenu';
import {CardModule} from 'primeng/card';
import {ChartModule} from 'primeng/chart';
import {SidebarModule} from 'primeng/sidebar';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';

import {ToolbarModule} from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

import {SplitButtonModule} from 'primeng/splitbutton';
import { TokenHttpInterceptor } from './shared/services/http-interceptor.service';

import {TooltipModule} from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { LoadingInterceptorService } from './shared/services/loading-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ScrollPanelModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // tslint:disable-next-line: deprecation
    NgbModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers, initialState: INITIAL_APPLICATION_STATE }),
    EffectsModule.forRoot([RootEffects.MasterElementsEffectService,
      RootEffects.UserMasterEffectService,
        RootEffects.LogbookEffectService,
        RootEffects.LogbookDashboardEffectService,
        RootEffects.RoleEffectService,
        RootEffects.UserRoleEffectService,
        RootEffects.DesignationEffectService,
        RootEffects.RoasterGroupEffectService,
        RootEffects.RoasterGroupUserEffectService,
        RootEffects.CodeRepositoryEffectService,
        RootEffects.OutageEffectService,
        RootEffects.UserAuthEffects,
        RootEffects.DutyRoasterEffectService,
        RootEffects.TrippingEffectService,
        RootEffects.ShutdownEffectService,
        RootEffects.LogbookIssueEffectService,
        RootEffects.SchedulingEffectService,
        RootEffects.ViolationMessageEffectService,
        RootEffects.DashboardEffectService,
        RootEffects.AntiTheftEffectService,
        RootEffects.ShiftUserEffectService,
        RootEffects.HistoticElementsEffectService,
        RootEffects.AutoRecloseEffectService,
        RootEffects.EmployeeSummaryEffectService,
        RootEffects.ShiftReportsEffectService,
        RootEffects.ConfigValueEffectService,
        RootEffects.StatcomFscTcscEffectService,
        RootEffects.SignalREffectService,
        RootEffects.ViolationValueEffectService,
        RootEffects.ConstituentValueEffectService,
        RootEffects.IssueValueEffectService,
        RootEffects.TrippingValueEffectService,
        RootEffects.SchedulingValueEffectService,
        RootEffects.DesignationValueEffectService,
        RootEffects.ReportsEffectService,
        RootEffects.FirstTimeChargeLineEffectService,
        RootEffects.LogbookInstructionEffectService,
        RootEffects.FirstTimeChargeEffectService,
        RootEffects.LogbookLoadEffectService,
        RootEffects.LogbookConstituentsGenerationEffectService,
        RootEffects.LogbookNepalFeedersEffectService,
        RootEffects.LogbookSugarMillsGenerationEffectService,
        RootEffects.LogbookSystemReportEffectService,
        RootEffects.LogbookNBPDCLTieLinesExchangeEffectService,
        RootEffects.LogbookSBPDCLTieLinesExchangeEffectService,
        RootEffects.LogbookMaxMinPowerEffectService,
        RootEffects.LogbookSystemReportNetEffectService,
        RootEffects.LogbookSolarPowerPlantsEffectService,
        RootEffects.TieLineEffectService,
        RootEffects.LogbookKhagaulEffectService,
        RootEffects.LogbookMiscEffectService,
        RootEffects.ALDCLoadEffectService,
        RootEffects.PCOEffectService
      ]),
    SharedModule,
    ButtonModule,
    InputTextModule,
    MegaMenuModule,
    CardModule,
    ChartModule,
    SidebarModule,
    PanelMenuModule,
    ToolbarModule,
    TableModule,
    TabViewModule,
    SplitButtonModule,
    NgxPermissionsModule.forRoot(),
    TooltipModule,
    ToastModule
  ],
  providers: [MessageService,
     NgxPermissionsService,
     {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
