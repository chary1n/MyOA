import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApproveOrderPage } from './approve-order';

@NgModule({
  declarations: [
    ApproveOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ApproveOrderPage),
  ],
})
export class ApproveOrderPageModule {}
