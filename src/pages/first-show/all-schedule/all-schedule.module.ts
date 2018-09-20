import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllSchedulePage } from './all-schedule';

@NgModule({
  declarations: [
    AllSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(AllSchedulePage),
  ],
})
export class AllSchedulePageModule {}
