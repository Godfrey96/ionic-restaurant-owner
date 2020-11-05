import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMenuPage } from './add-menu.page';

const routes: Routes = [
  {
    path: '',
    component: AddMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMenuPageRoutingModule {}
