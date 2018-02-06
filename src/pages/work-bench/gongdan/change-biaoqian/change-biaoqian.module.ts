import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeBiaoqianPage } from './change-biaoqian';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    ChangeBiaoqianPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeBiaoqianPage),AutoCompleteModule
  ],
})
export class ChangeBiaoqianPageModule {}
