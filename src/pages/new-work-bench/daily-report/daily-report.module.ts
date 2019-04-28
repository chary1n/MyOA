import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DailyReportPage } from './daily-report';

import { AutoCompleteModule } from 'ionic2-auto-complete';
@NgModule({
  declarations: [
    DailyReportPage,
  ],
  imports: [
    IonicPageModule.forChild(DailyReportPage), AutoCompleteModule
  ],
})
export class DailyReportPageModule {}
