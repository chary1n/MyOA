import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseBackOrderPage } from './purchase-back-order';

@NgModule({
  declarations: [
    PurchaseBackOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseBackOrderPage),
  ],
  exports: [
    PurchaseBackOrderPage
  ]
})
export class PurchaseBackOrderPageModule {}
