import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseAbnormalPage } from './expense-abnormal';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    ExpenseAbnormalPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseAbnormalPage),AutoCompleteModule
  ],
})
export class ExpenseAbnormalPageModule {}
