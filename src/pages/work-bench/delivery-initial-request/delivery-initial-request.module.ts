import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryInitialRequestPage } from './delivery-initial-request';

@NgModule({
  declarations: [
    DeliveryInitialRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryInitialRequestPage),
  ],
  exports: [
    DeliveryInitialRequestPage
  ]
})
export class DeliveryInitialRequestPageModule {}
