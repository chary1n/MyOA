import { CardinfoPage } from './cardinfo/cardinfo';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkBenchPage } from './work-bench';

@NgModule({
  declarations: [
    WorkBenchPage,CardinfoPage
  ],
  imports: [
    IonicPageModule.forChild(WorkBenchPage),
  ],
  entryComponents:[ WorkBenchPage,CardinfoPage],
  exports: [
    WorkBenchPage
  ]
})
export class WorkBenchPageModule {}
