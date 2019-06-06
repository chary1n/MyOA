import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopDetailPage } from './shop-detail';
import { IonicImageViewerModule } from 'ionic-img-viewer/dist/es2015/src/module';
@NgModule({
  declarations: [
    ShopDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopDetailPage),IonicImageViewerModule
  ],
})
export class ShopDetailPageModule {}
