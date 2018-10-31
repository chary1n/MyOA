import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewZanzhiPage } from './new-zanzhi';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    NewZanzhiPage,
  ],
  imports: [
    IonicPageModule.forChild(NewZanzhiPage),AutoCompleteModule
  ],
})
export class NewZanzhiPageModule {}
