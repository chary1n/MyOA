import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewBillDetailPage } from './new-bill-detail';

@NgModule({
  declarations: [
    NewBillDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NewBillDetailPage),
  ],
})
export class NewBillDetailPageModule {}
