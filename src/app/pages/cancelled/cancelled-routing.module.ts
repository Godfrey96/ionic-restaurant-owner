import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelledPage } from './cancelled.page';

const routes: Routes = [
  {
    path: '',
    component: CancelledPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelledPageRoutingModule {}
