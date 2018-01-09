import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayRequestDetailPage } from './pay-request-detail';

@NgModule({
  declarations: [
    PayRequestDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PayRequestDetailPage),
  ],
})
export class PayRequestDetailPageModule {}
