import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectionDetailPage } from './inspection-detail';

@NgModule({
  declarations: [
    InspectionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectionDetailPage),
  ],
  exports: [
    InspectionDetailPage
  ]
})
export class InspectionDetailPageModule {}
