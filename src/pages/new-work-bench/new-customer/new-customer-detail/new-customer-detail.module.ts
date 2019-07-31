import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCustomerDetailPage } from './new-customer-detail';

@NgModule({
  declarations: [
    NewCustomerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NewCustomerDetailPage),
  ],
})
export class NewCustomerDetailPageModule {}
