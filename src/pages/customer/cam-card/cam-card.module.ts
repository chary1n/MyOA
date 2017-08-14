import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamCardPage } from './cam-card';

@NgModule({
  declarations: [
    CamCardPage,
  ],
  imports: [
    IonicPageModule.forChild(CamCardPage),
  ],
  exports: [
    CamCardPage
  ]
})
export class CamCardPageModule {}
