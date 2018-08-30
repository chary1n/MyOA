import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceAllDataPage } from './attendance-all-data';

@NgModule({
  declarations: [
    AttendanceAllDataPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceAllDataPage),
  ],
})
export class AttendanceAllDataPageModule {}
