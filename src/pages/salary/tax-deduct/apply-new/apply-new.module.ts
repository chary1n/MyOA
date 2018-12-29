import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplyNewPage } from './apply-new';

@NgModule({
  declarations: [
    ApplyNewPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplyNewPage),
  ],
})
export class ApplyNewPageModule {}
