import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyReportDetailPage } from './daily-report-detail';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    DailyReportDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyReportDetailPage),IonicImageViewerModule
  ],
})
export class DailyReportDetailPageModule {}
