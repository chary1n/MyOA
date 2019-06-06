import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustInDetailPage } from './cust-in-detail';

@NgModule({
  declarations: [
    CustInDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(CustInDetailPage),
  ],
})
export class CustInDetailPageModule {}
