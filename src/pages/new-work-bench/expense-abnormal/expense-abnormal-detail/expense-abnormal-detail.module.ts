import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseAbnormalDetailPage } from './expense-abnormal-detail';

@NgModule({
  declarations: [
    ExpenseAbnormalDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseAbnormalDetailPage),
  ],
})
export class ExpenseAbnormalDetailPageModule {}
