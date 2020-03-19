import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstShowPage } from './first-show';
import { AutoCompleteModule } from 'ionic2-auto-complete';
@NgModule({
  declarations: [
    FirstShowPage,
  ],
  imports: [
    IonicPageModule.forChild(FirstShowPage),AutoCompleteModule
  ],
})
export class FirstShowPageModule {}
