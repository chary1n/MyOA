import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongdanSearchPage } from './gongdan-search';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    GongdanSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(GongdanSearchPage),AutoCompleteModule
  ],
})
export class GongdanSearchPageModule {}
