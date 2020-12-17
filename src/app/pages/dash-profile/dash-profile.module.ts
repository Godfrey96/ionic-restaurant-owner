import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashProfilePageRoutingModule } from './dash-profile-routing.module';

import { DashProfilePage } from './dash-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashProfilePageRoutingModule
  ],
  declarations: [DashProfilePage]
})
export class DashProfilePageModule {}
