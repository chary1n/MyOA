import { DeliveryPage } from './sales-detail/delivery/delivery';
import { PopoverPage } from './sales-detail/sales-detail';
import { SalesOrderPage } from './salesOrder';
import { SalesDetailPage } from './sales-detail/sales-detail';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    SalesOrderPage,SalesDetailPage,PopoverPage,DeliveryPage
  ],
  imports: [
    IonicPageModule.forChild(SalesOrderPage),
  ],
  entryComponents:[SalesDetailPage,PopoverPage,DeliveryPage],
  exports: [
    SalesOrderPage,
  ]
})
export class SalesOrderPageModule {}
