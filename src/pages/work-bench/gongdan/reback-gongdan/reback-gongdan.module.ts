import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RebackGongdanPage } from './reback-gongdan';
import { IonicImageViewerModule } from 'ionic-img-viewer/dist/es2015/src/module';

@NgModule({
  declarations: [
    RebackGongdanPage,
  ],
  imports: [
    IonicPageModule.forChild(RebackGongdanPage),IonicImageViewerModule
  ],
})
export class RebackGongdanPageModule {}
