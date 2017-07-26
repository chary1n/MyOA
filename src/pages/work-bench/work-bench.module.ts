import { CardinfoPage } from './cardinfo/cardinfo';
import { IncomingPage} from './incoming/incoming';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkBenchPage } from './work-bench';

@NgModule({
  declarations: [
    WorkBenchPage,CardinfoPage,IncomingPage
  ],
  imports: [
    IonicPageModule.forChild(WorkBenchPage),
  ],
  entryComponents:[ WorkBenchPage,CardinfoPage,IncomingPage],
  exports: [
    WorkBenchPage
  ]
})
export class WorkBenchPageModule {}
