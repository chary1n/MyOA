import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewReimbursementDetailPage } from './new-reimbursement-detail';

@NgModule({
  declarations: [
    NewReimbursementDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NewReimbursementDetailPage),
  ],
})
export class NewReimbursementDetailPageModule {}
