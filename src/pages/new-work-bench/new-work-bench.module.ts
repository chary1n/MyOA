import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewWorkBenchPage } from './new-work-bench';

@NgModule({
  declarations: [
    NewWorkBenchPage,
  ],
  imports: [
    IonicPageModule.forChild(NewWorkBenchPage),
  ],
})
export class NewWorkBenchPageModule {}
