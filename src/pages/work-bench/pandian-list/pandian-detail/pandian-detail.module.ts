import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PandianDetailPage } from './pandian-detail';

@NgModule({
  declarations: [
    PandianDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PandianDetailPage),
  ],
})
export class PandianDetailPageModule {}
