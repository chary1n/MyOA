import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MomentsUnReadPage } from './moments-un-read';

@NgModule({
  declarations: [
    MomentsUnReadPage,
  ],
  imports: [
    IonicPageModule.forChild(MomentsUnReadPage),
  ],
})
export class MomentsUnReadPageModule {}
