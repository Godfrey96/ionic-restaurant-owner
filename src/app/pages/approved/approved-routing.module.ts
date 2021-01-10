import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovedPage } from './approved.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovedPageRoutingModule {}
