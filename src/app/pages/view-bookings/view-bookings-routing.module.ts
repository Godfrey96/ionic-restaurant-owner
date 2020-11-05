import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewBookingsPage } from './view-bookings.page';

const routes: Routes = [
  {
    path: '',
    component: ViewBookingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewBookingsPageRoutingModule {}
