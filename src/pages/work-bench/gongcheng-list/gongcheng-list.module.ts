import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongchengListPage } from './gongcheng-list';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    GongchengListPage,
  ],
  imports: [
    IonicPageModule.forChild(GongchengListPage),AutoCompleteModule
  ],
})
export class GongchengListPageModule {}
