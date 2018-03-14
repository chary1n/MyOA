import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaojiaDetailPage } from './baojia-detail';

@NgModule({
  declarations: [
    BaojiaDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BaojiaDetailPage),
  ],
})
export class BaojiaDetailPageModule {}
