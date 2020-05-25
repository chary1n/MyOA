import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyReportMenuPage } from './daily-report-menu';

@NgModule({
  declarations: [
    DailyReportMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyReportMenuPage),
  ],
})
export class DailyReportMenuPageModule {}
