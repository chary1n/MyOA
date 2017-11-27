import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareknowledgedetailPage } from './shareknowledgedetail';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    ShareknowledgedetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ShareknowledgedetailPage),AutoCompleteModule
  ],
})
export class ShareknowledgedetailPageModule {}
