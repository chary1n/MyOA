import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderDetailPage } from './order-detail';

@NgModule({
  declarations: [
    OrderDetailPage
  ],
  imports: [
    IonicPageModule.forChild(OrderDetailPage),
  ],
  exports: [
    OrderDetailPage
  ]
})
export class OrderDetailPageModule {}
