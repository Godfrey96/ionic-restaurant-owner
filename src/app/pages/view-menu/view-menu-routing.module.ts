import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMenuPage } from './view-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMenuPageRoutingModule {}
