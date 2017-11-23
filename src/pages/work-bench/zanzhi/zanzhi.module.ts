import { AutoCompleteModule } from 'ionic2-auto-complete';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZanzhiPage } from './zanzhi';

@NgModule({
  declarations: [
    ZanzhiPage,
  ],
  imports: [
    IonicPageModule.forChild(ZanzhiPage),AutoCompleteModule
  ],
})
export class ZanzhiPageModule {}
