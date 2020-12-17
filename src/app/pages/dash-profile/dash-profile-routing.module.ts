import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashProfilePage } from './dash-profile.page';

const routes: Routes = [
  {
    path: '',
    component: DashProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashProfilePageRoutingModule {}
