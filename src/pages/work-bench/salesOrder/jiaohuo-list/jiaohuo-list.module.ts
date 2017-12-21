import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JiaohuoListPage } from './jiaohuo-list';

@NgModule({
  declarations: [
    JiaohuoListPage,
  ],
  imports: [
    IonicPageModule.forChild(JiaohuoListPage),
  ],
})
export class JiaohuoListPageModule {}
