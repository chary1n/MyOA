import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceRecoupDetailPage } from './attendance-recoup-detail';

@NgModule({
  declarations: [
    AttendanceRecoupDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceRecoupDetailPage),
  ],
})
export class AttendanceRecoupDetailPageModule {}
