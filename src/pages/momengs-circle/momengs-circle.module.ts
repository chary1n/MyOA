import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomengsCirclePage } from './momengs-circle';
import { IonicImageViewerModule } from 'ionic-img-viewer/dist/es2015/src/module';


@NgModule({
  declarations: [
    MomengsCirclePage,
  ],
  imports: [
    IonicPageModule.forChild(MomengsCirclePage),IonicImageViewerModule
  ],
})
export class MomengsCirclePageModule {}
