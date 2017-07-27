import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncomingDetailPage } from './incoming-detail';

@NgModule({
  declarations: [
    IncomingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(IncomingDetailPage),
  ],
  exports: [
    IncomingDetailPage
  ]
})
export class IncomingDetailPageModule {}
