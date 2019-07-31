import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HkCustInPage } from './hk-cust-in';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    HkCustInPage,
  ],
  imports: [
    IonicPageModule.forChild(HkCustInPage),AutoCompleteModule
  ],
})
export class HkCustInPageModule {}
