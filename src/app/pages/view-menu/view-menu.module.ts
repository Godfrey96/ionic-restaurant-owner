import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMenuPageRoutingModule } from './view-menu-routing.module';

import { ViewMenuPage } from './view-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMenuPageRoutingModule
  ],
  declarations: [ViewMenuPage]
})
export class ViewMenuPageModule {}
