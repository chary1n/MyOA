import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongchengDetailPage } from './gongcheng-detail';

@NgModule({
  declarations: [
    GongchengDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GongchengDetailPage),
  ],
})
export class GongchengDetailPageModule {}
