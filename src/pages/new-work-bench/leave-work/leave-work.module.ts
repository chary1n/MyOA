import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveWorkPage } from './leave-work';

@NgModule({
  declarations: [
    LeaveWorkPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveWorkPage),
  ],
})
export class LeaveWorkPageModule {}
