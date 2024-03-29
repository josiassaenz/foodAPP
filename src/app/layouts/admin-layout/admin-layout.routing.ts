import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { FacilitatorComponent } from '../../facilitator/facilitator.component';
import { DeliveryComponent } from 'app/delivery/delivery.component';
import { AuthGuard } from 'app/auth.guard';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    { path: 'facilitator',    component: FacilitatorComponent },
    { path: 'delivery',       component: DeliveryComponent },
    {
        path: '**',
        canActivate: [AuthGuard],
        redirectTo: '/delivery',
    },
    // {
    //     path: '**',
    //     canActivate: [AuthGuard],
    //     redirectTo: '/delivery'
    //     children: [
    //         {   path: 'facilitator',      
    //             component: FacilitatorComponent,
    //             data: { allowedRoles: ['ROLE_SUPER_ADMIN'] }
    //         },
    //         {   path: 'dashboard',      
    //             component: DashboardComponent,
    //             data: { allowedRoles: ['ROLE_ADMIN'] }
    //         },
    //         {   path: 'user-profile',      
    //             component: UserProfileComponent,
    //             data: { allowedRoles: ['ROLE_ADMIN'] }
    //         },
    //         {   path: 'table-list',      
    //             component: TableListComponent,
    //             data: { allowedRoles: ['ROLE_ADMIN'] }
    //         },
    //         {   path: 'delivery',      
    //             component: DeliveryComponent,
    //             data: { allowedRoles: ['ROLE_FACILITATOR'] }
    //         }
    //     ]
    // },
];
