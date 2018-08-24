import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LateListPage } from './late-list';

@NgModule({
  declarations: [
    LateListPage,
  ],
  imports: [
    IonicPageModule.forChild(LateListPage),
  ],
})
export class LateListPageModule {}
