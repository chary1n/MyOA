import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReimbursementDetailPage } from './reimbursement-detail';

@NgModule({
  declarations: [
    ReimbursementDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ReimbursementDetailPage),
  ],
})
export class ReimbursementDetailPageModule {}
