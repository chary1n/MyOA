import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongdanPage } from './gongdan';
import { IonicImageViewerModule } from 'ionic-img-viewer/dist/es2015/src/module';

@NgModule({
  declarations: [
    GongdanPage,
  ],
  imports: [
    IonicPageModule.forChild(GongdanPage),IonicImageViewerModule
  ],
})
export class GongdanPageModule {}
