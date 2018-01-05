import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayRequestPage } from './pay-request';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    PayRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(PayRequestPage),AutoCompleteModule,
  ],
})
export class PayRequestPageModule {}
