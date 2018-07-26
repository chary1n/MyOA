import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirstShowPage } from './first-show';

@NgModule({
  declarations: [
    FirstShowPage,
  ],
  imports: [
    IonicPageModule.forChild(FirstShowPage),
  ],
})
export class FirstShowPageModule {}
