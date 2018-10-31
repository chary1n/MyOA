// import { DeliveryPage } from './delivery/delivery';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesDetailPage } from './sales-detail';

@NgModule({
  declarations: [
    SalesDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesDetailPage),
  ],
  exports: [
    SalesDetailPage
  ]
})
export class SalesDetailPageModule {}
