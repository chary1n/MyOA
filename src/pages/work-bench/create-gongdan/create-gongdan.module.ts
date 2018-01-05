import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateGongdanPage } from './create-gongdan';
// import { IonicImageViewerModule } from 'ionic-img-viewer/dist/es2015/src/module';

@NgModule({
  declarations: [
    CreateGongdanPage,
  ],
  imports: [
    // IonicPageModule.forChild(CreateGongdanPage),IonicImageViewerModule
    IonicPageModule.forChild(CreateGongdanPage)
  ],
})
export class CreateGongdanPageModule {}
