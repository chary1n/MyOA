import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZanzhiDetailPage } from './zanzhi-detail';

@NgModule({
  declarations: [
    ZanzhiDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ZanzhiDetailPage),
  ],
})
export class ZanzhiDetailPageModule {}
