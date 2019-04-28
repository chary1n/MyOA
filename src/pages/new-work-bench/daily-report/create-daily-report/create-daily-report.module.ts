import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateDailyReportPage } from './create-daily-report';
import { QuillModule } from 'ngx-quill'
@NgModule({
  declarations: [
    CreateDailyReportPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateDailyReportPage),QuillModule
  ],
})
export class CreateDailyReportPageModule {}
