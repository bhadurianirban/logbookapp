import { IssueMasterComponent } from './issue-master/issue-master.component';
import { ConstituentMasterComponent } from './constituent-master/constituent-master.component';
import { ViolationComponent } from './violation/violation.component';
import { ConfigValuesComponent } from './config-values/config-values.component';
import { TrippingComponent } from './tripping/tripping.component';
import { SchedulingComponent } from './scheduling/scheduling.component';
import { DesignationMasterComponent } from './designation-master/designation-master.component';
import { FirstTimeChargeLineComponent } from './first-time-charge-line/first-time-charge-line.component';

export const routes = [
    { path: 'issue-master', component: IssueMasterComponent },
    { path: 'constituent-master', component: ConstituentMasterComponent },
    { path: 'violation', component: ViolationComponent },
    { path: 'config-values', component: ConfigValuesComponent },
    { path: 'tripping-nature', component: TrippingComponent },
    { path: 'scheduling', component: SchedulingComponent },
    { path: 'designation-master', component: DesignationMasterComponent },
    { path: 'first-time-charge-line', component: FirstTimeChargeLineComponent },
];
