import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiaoQianPage } from './biao-qian';

@NgModule({
  declarations: [
    BiaoQianPage,
  ],
  imports: [
    IonicPageModule.forChild(BiaoQianPage),
  ],
  exports: [
    BiaoQianPage
  ]
})
export class BiaoQianPageModule {}
