import { AutoCompleteModule } from 'ionic2-auto-complete';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PandianListPage } from './pandian-list';

@NgModule({
  declarations: [
    PandianListPage,
  ],
  imports: [
    IonicPageModule.forChild(PandianListPage),AutoCompleteModule
  ],
})
export class PandianListPageModule {}
