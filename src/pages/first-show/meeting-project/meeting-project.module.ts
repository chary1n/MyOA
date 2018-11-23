import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetingProjectPage } from './meeting-project';

@NgModule({
  declarations: [
    MeetingProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetingProjectPage),
  ],
})
export class MeetingProjectPageModule {}
