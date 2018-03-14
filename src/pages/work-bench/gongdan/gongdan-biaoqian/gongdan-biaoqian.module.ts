import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongdanBiaoqianPage } from './gongdan-biaoqian';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    GongdanBiaoqianPage,
  ],
  imports: [
    IonicPageModule.forChild(GongdanBiaoqianPage),AutoCompleteModule
  ],
})
export class GongdanBiaoqianPageModule {}
