import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YearEndSalaryDetailPage } from './year-end-salary-detail';

@NgModule({
  declarations: [
    YearEndSalaryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(YearEndSalaryDetailPage),
  ],
})
export class YearEndSalaryDetailPageModule {}
