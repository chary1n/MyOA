import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewShengouPage } from './new-shengou';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    NewShengouPage,
  ],
  imports: [
    IonicPageModule.forChild(NewShengouPage),AutoCompleteModule
  ],
})
export class NewShengouPageModule {}
