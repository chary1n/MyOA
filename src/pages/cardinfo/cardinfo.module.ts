import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardinfoPage } from './cardinfo';

@NgModule({
  declarations: [
    CardinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CardinfoPage),
  ],
  exports: [
    CardinfoPage
  ]
})
export class CardinfoPageModule {}
