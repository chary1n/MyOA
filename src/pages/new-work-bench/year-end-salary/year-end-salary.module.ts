import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YearEndSalaryPage } from './year-end-salary';

@NgModule({
  declarations: [
    YearEndSalaryPage,
  ],
  imports: [
    IonicPageModule.forChild(YearEndSalaryPage),
  ],
})
export class YearEndSalaryPageModule {}
