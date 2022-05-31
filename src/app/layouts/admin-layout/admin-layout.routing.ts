import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { FacilitatorComponent } from 'app/facilitator/facilitator.component';
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
    { path: 'dashboard',   canActivate: [AuthGuard],   component: DashboardComponent },
    { path: 'register',    canActivate: [AuthGuard],  component: UserProfileComponent },
    { path: 'facilitator', canActivate: [AuthGuard],  component: FacilitatorComponent },
    { path: 'delivery',    canActivate: [AuthGuard],  component: DeliveryComponent },
    { path: 'table-list',  canActivate: [AuthGuard], component: TableListComponent },
    {
        path: '**',
        canActivate: [AuthGuard],
        redirectTo: '/delivery',
      },
    // { path: 'typography',     component: TypographyComponent },
    // { path: 'icons',          component: IconsComponent },
    // { path: 'maps',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
];

/* canActivate: [AuthGuard],
canActivate: [AuthGuard],
canActivate: [AuthGuard],
canActivate: [AuthGuard],
canActivate: [AuthGuard], */