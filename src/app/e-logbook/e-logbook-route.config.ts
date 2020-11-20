import { LogbookComponent } from './container/logbook/logbook.component';
import { MasterDataResolver } from '../shared/resolvers/master-data.resolver';
import { LogbookResolver } from './resolvers/logbook.resolver';
import { DashboardContainerComponent } from './container/dashboard/dashboard.component';
import { MasterElementsResolver } from '../shared/resolvers/master-elements.resolver';

export const routes = [
    {
        path: '',
        component: DashboardContainerComponent
    },
    {
        path: 'logbook/:id',
        component: LogbookComponent,
        resolve: { masterData: MasterDataResolver,
                    masterElements: MasterElementsResolver,
                   logbookDetail: LogbookResolver }
    },
    {
        path: 'dashboard',
        component: DashboardContainerComponent
    }
];
