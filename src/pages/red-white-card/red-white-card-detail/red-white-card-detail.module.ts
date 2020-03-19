import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RedWhiteCardDetailPage } from './red-white-card-detail';

@NgModule({
  declarations: [
    RedWhiteCardDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RedWhiteCardDetailPage),
  ],
})
export class RedWhiteCardDetailPageModule {}
