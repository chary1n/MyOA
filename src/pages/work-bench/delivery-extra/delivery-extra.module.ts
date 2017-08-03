import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryExtraPage } from './delivery-extra';

@NgModule({
  declarations: [
    DeliveryExtraPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryExtraPage),
  ],
  exports: [
    DeliveryExtraPage
  ]
})
export class DeliveryExtraPageModule {}
