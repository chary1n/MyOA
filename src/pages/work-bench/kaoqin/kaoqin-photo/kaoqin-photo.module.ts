import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KaoqinPhotoPage } from './kaoqin-photo';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    KaoqinPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(KaoqinPhotoPage),IonicImageViewerModule
  ],
})
export class KaoqinPhotoPageModule {}
