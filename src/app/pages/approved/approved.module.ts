import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovedPageRoutingModule } from './approved-routing.module';

import { ApprovedPage } from './approved.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApprovedPageRoutingModule
  ],
  declarations: [ApprovedPage]
})
export class ApprovedPageModule {}
