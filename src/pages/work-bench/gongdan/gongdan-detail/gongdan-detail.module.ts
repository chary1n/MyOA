import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongdanDetailPage } from './gongdan-detail';

@NgModule({
  declarations: [
    GongdanDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GongdanDetailPage),
  ],
})
export class GongdanDetailPageModule {}
