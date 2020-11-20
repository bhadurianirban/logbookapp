import { UsersComponent } from './users/users.component';
import { UserRoleMapComponent } from './user-role-map/user-role-map.component';

export const routes = [
    {
        path: 'usermanagement',
        component: UsersComponent
    },
    {
        path: 'user-role-map',
        component: UserRoleMapComponent
    }
];
