import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RedWhiteCardPage } from './red-white-card';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    RedWhiteCardPage,
  ],
  imports: [
    IonicPageModule.forChild(RedWhiteCardPage),AutoCompleteModule
  ],
})
export class RedWhiteCardPageModule {}
