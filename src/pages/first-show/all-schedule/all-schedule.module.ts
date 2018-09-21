import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllSchedulePage } from './all-schedule';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    AllSchedulePage,
  ],
  imports: [
    IonicPageModule.forChild(AllSchedulePage),AutoCompleteModule
  ],
})
export class AllSchedulePageModule {}
