import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPayRequestPage } from './new-pay-request';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    NewPayRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPayRequestPage),AutoCompleteModule
  ],
})
export class NewPayRequestPageModule {}
