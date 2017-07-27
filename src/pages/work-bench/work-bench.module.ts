import { CardinfoPage } from './cardinfo/cardinfo';
import { IncomingPage} from './incoming/incoming';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkBenchPage } from './work-bench';
import { IncomingDetailPage} from './incoming-detail/incoming-detail';

@NgModule({
  declarations: [
    WorkBenchPage,CardinfoPage,IncomingPage,IncomingDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(WorkBenchPage),
  ],
  entryComponents:[ WorkBenchPage,CardinfoPage,IncomingPage,IncomingDetailPage],
  exports: [
    WorkBenchPage
  ]
})
export class WorkBenchPageModule {}
