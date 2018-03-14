import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeKucunPage } from './change-kucun';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    ChangeKucunPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeKucunPage),AutoCompleteModule
  ],
})
export class ChangeKucunPageModule {}
