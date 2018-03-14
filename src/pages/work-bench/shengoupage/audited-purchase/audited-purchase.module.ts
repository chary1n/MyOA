import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuditedPurchasePage } from './audited-purchase';

@NgModule({
  declarations: [
    AuditedPurchasePage,
  ],
  imports: [
    IonicPageModule.forChild(AuditedPurchasePage),
  ],
})
export class AuditedPurchasePageModule {}
