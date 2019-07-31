import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCustomerPage } from './new-customer';
import { AutoCompleteModule } from 'ionic2-auto-complete';
@NgModule({
  declarations: [
    NewCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(NewCustomerPage),AutoCompleteModule
  ],
})
export class NewCustomerPageModule {}
