import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesInfoPage } from './sales-info';

@NgModule({
  declarations: [
    SalesInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesInfoPage),
  ],
  exports: [
    SalesInfoPage
  ]
})
export class SalesInfoPageModule {}
