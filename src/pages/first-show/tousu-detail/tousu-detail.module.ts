import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TousuDetailPage } from './tousu-detail';

@NgModule({
  declarations: [
    TousuDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TousuDetailPage),
  ],
})
export class TousuDetailPageModule {}
