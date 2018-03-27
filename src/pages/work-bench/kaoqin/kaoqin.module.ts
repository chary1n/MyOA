import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KaoqinPage } from './kaoqin';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    KaoqinPage,
  ],
  imports: [
    IonicPageModule.forChild(KaoqinPage),IonicImageViewerModule
  ],
})
export class KaoqinPageModule {}
