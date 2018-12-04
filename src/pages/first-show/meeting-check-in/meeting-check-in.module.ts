import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetingCheckInPage } from './meeting-check-in';

@NgModule({
  declarations: [
    MeetingCheckInPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetingCheckInPage),
  ],
})
export class MeetingCheckInPageModule {}
