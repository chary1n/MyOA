import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShengoupagePage } from './shengoupage';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    ShengoupagePage,
  ],
  imports: [
    IonicPageModule.forChild(ShengoupagePage),AutoCompleteModule
  ],
})
export class ShengoupagePageModule {}
