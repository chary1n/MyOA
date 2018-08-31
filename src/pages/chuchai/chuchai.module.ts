import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChuchaiPage } from './chuchai';
import { AutoCompleteModule } from 'ionic2-auto-complete';
@NgModule({
  declarations: [
    ChuchaiPage,
  ],
  imports: [
    IonicPageModule.forChild(ChuchaiPage),AutoCompleteModule
  ],
})
export class ChuchaiPageModule {}
