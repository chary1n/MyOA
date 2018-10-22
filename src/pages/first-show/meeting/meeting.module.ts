import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetingPage } from './meeting';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    MeetingPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetingPage),IonicImageViewerModule
  ],
})
export class MeetingPageModule {}
