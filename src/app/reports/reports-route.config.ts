import { Routes } from '@angular/router';
import { ViolationMessageReportComponent } from './violation-message-report/violation-message-report.component';
import { ElementWiseReportComponent } from './element-wise-report/element-wise-report.component';
import { MasterElementsResolver } from '../shared/resolvers/master-elements.resolver';
import { TieLinesReportComponent } from './tie-lines-report/tie-lines-report.component';

export const routes: Routes = [
    {
        path: 'violation-message', component: ViolationMessageReportComponent
    },
    {
        path: 'element-wise', component: ElementWiseReportComponent,
        resolve: { masterElements: MasterElementsResolver }
    },
    {
        path: 'tie-lines', component: TieLinesReportComponent
    },
];
