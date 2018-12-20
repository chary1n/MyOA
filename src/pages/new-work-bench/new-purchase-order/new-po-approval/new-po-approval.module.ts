import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPoApprovalPage } from './new-po-approval';

@NgModule({
  declarations: [
    NewPoApprovalPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPoApprovalPage),
  ],
})
export class NewPoApprovalPageModule {}
