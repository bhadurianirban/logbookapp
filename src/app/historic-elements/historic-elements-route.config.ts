import { ShutdownProcessingComponent } from './shutdown-processing/shutdown-processing.component';
import { OutageComponent } from './outage/outage.component';
import { TrippingComponent } from './tripping/tripping.component';
import { AntitheftComponent } from './antitheft/antitheft.component';
import { AutoRecloseComponent } from './auto-reclose/auto-reclose.component';
import { FirstTimeChargeComponent } from './first-time-charge/first-time-charge.component';

export const routes = [
    { path: 'shutdown',  component: ShutdownProcessingComponent},
    { path: 'outage',  component: OutageComponent },
    { path: 'tripping',  component: TrippingComponent },
    { path: 'antitheft',  component: AntitheftComponent },
    { path: 'auto-reclose',  component: AutoRecloseComponent },
    { path: 'first-time-charge',  component: FirstTimeChargeComponent }
];
