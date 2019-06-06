import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntpPage } from './intp';
import { AutoCompleteModule } from 'ionic2-auto-complete';
@NgModule({
  declarations: [
    IntpPage,
  ],
  imports: [
    IonicPageModule.forChild(IntpPage),AutoCompleteModule
  ],
})
export class IntpPageModule {}
