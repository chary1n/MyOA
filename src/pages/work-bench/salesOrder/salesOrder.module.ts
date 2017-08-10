import { SalesOrderPage } from './salesOrder';
import { SalesDetailPage } from './sales-detail/sales-detail';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    SalesOrderPage,SalesDetailPage
  ],
  imports: [
    IonicPageModule.forChild(SalesOrderPage),
  ],
  entryComponents:[SalesDetailPage],
  exports: [
    SalesOrderPage,
  ]
})
export class SalesOrderPageModule {}
