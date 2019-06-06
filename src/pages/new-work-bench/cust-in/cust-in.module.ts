import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustInPage } from './cust-in';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    CustInPage,
  ],
  imports: [
    IonicPageModule.forChild(CustInPage),AutoCompleteModule
  ],
})
export class CustInPageModule {}
