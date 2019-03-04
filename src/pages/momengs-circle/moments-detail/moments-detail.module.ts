import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentsDetailPage } from './moments-detail';
import { IonicImageViewerModule } from 'ionic-img-viewer/dist/es2015/src/module';

@NgModule({
  declarations: [
    MomentsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MomentsDetailPage),IonicImageViewerModule
  ],
})
export class MomentsDetailPageModule {}
