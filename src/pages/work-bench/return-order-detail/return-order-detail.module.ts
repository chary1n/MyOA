import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReturnOrderDetailPage } from './return-order-detail';

@NgModule({
  declarations: [
    ReturnOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReturnOrderDetailPage),
  ],
  exports: [
    ReturnOrderDetailPage
  ]
})
export class ReturnOrderDetailPageModule {}
