import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuickLeavePage } from './quick-leave';

@NgModule({
  declarations: [
    QuickLeavePage,
  ],
  imports: [
    IonicPageModule.forChild(QuickLeavePage),
  ],
})
export class QuickLeavePageModule {}
