import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WaitApprovalPage } from './wait-approval';

@NgModule({
  declarations: [
    WaitApprovalPage,
  ],
  imports: [
    IonicPageModule.forChild(WaitApprovalPage),
  ],
})
export class WaitApprovalPageModule {}
