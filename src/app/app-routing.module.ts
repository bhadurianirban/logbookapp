import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    {
        path: '',
        component: SiteLayoutComponent,
        children: [
        { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },
        { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
        { path: 'code-repository', loadChildren: './code-repository/code-repository.module#CodeRepositoryModule' },
        { path: 'elogbook', loadChildren: './e-logbook/e-logbook.module#ELogBookModule' },
        { path: 'dutyroster',  loadChildren: './duty-roster/duty-roster.module#DutyRosterModule' },
        { path: 'history',  loadChildren: './historic-elements/historic-elements.module#HistoricElementsModule'},
        { path: 'user-manage',  loadChildren: './user-manage/user-manage.module#UserManageModule'},
        { path: 'masterdata',  loadChildren: './master-data/masterdata.module#MasterDataModule'},
        { path: 'reports',  loadChildren: './reports/reports.module#ReportsModule'},
        { path: 'aldc-load',  loadChildren: './aldc-load/aldc-load.module#AldcLoadModule'}
        ]
      },
    { path: 'login', component: LoginComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        preloadingStrategy: PreloadAllModules
      }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
