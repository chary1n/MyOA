import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyReportTreeDetailPage } from './daily-report-tree-detail';

@NgModule({
  declarations: [
    DailyReportTreeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyReportTreeDetailPage),
  ],
})
export class DailyReportTreeDetailPageModule {}
