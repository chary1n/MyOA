import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoreLevelListPage } from './more-level-list';

@NgModule({
  declarations: [
    MoreLevelListPage,
  ],
  imports: [
    IonicPageModule.forChild(MoreLevelListPage),
  ],
})
export class MoreLevelListPageModule {}
