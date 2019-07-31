import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HkCustInDetailPage } from './hk-cust-in-detail';

@NgModule({
  declarations: [
    HkCustInDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HkCustInDetailPage),
  ],
})
export class HkCustInDetailPageModule {}
