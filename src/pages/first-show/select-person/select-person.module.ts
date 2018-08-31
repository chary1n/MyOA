import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPersonPage } from './select-person';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    SelectPersonPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectPersonPage),AutoCompleteModule
  ],
})
export class SelectPersonPageModule {}
