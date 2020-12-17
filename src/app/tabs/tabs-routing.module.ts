import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'view-bookings',
        loadChildren: () => import('../pages/view-bookings/view-bookings.module').then( m => m.ViewBookingsPageModule)
      },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      // },
      {
        path: 'dash-profile',
        loadChildren: () => import('../pages/dash-profile/dash-profile.module').then( m => m.DashProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
