import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoPageRoutingModule } from './logo-routing.module';

import { LogoPage } from './logo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogoPageRoutingModule
  ],
  declarations: [LogoPage]
})
export class LogoPageModule {}
