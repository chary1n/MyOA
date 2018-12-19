import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPurchaseOrderDetailPage } from './new-purchase-order-detail';

@NgModule({
  declarations: [
    NewPurchaseOrderDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPurchaseOrderDetailPage),
  ],
})
export class NewPurchaseOrderDetailPageModule {}
