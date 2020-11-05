import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewBookingsPageRoutingModule } from './view-bookings-routing.module';

import { ViewBookingsPage } from './view-bookings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewBookingsPageRoutingModule
  ],
  declarations: [ViewBookingsPage]
})
export class ViewBookingsPageModule {}
