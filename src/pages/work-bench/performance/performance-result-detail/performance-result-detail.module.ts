import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerformanceResultDetailPage } from './performance-result-detail';

@NgModule({
  declarations: [
    PerformanceResultDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PerformanceResultDetailPage),
  ],
})
export class PerformanceResultDetailPageModule {}
