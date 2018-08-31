import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChuchaiDetailPage } from './chuchai-detail';

@NgModule({
  declarations: [
    ChuchaiDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChuchaiDetailPage),
  ],
})
export class ChuchaiDetailPageModule {}
