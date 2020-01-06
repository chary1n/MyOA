import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchaseAccountApprovalPage } from './purchase-account-approval';
import { AutoCompleteModule } from 'ionic2-auto-complete';
@NgModule({
  declarations: [
    PurchaseAccountApprovalPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchaseAccountApprovalPage),AutoCompleteModule
  ],
})
export class PurchaseAccountApprovalPageModule {}
