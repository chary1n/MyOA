import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPurchaseOrderPage } from './new-purchase-order';
import { AutoCompleteModule } from 'ionic2-auto-complete';
@NgModule({
  declarations: [
    NewPurchaseOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPurchaseOrderPage),AutoCompleteModule
  ],
})
export class NewPurchaseOrderPageModule {}
