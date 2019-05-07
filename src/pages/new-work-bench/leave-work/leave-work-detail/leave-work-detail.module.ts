import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveWorkDetailPage } from './leave-work-detail';

@NgModule({
  declarations: [
    LeaveWorkDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveWorkDetailPage),
  ],
})
export class LeaveWorkDetailPageModule {}
