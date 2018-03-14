import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongdanDetailPage } from './gongdan-detail';
import { IonicImageViewerModule } from 'ionic-img-viewer/dist/es2015/src/module';

@NgModule({
  declarations: [
    GongdanDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GongdanDetailPage),IonicImageViewerModule
  ],
})
export class GongdanDetailPageModule {}
