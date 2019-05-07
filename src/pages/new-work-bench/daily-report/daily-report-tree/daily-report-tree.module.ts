import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyReportTreePage } from './daily-report-tree';

@NgModule({
  declarations: [
    DailyReportTreePage,
  ],
  imports: [
    IonicPageModule.forChild(DailyReportTreePage),
  ],
})
export class DailyReportTreePageModule {}
