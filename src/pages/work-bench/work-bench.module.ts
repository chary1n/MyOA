import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkBenchPage } from './work-bench';

@NgModule({
  declarations: [
    WorkBenchPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkBenchPage),
  ],
  exports: [
    WorkBenchPage
  ]
})
export class WorkBenchPageModule {}
