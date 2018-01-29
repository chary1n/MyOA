import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtMeListPage } from './at-me-list';

@NgModule({
  declarations: [
    AtMeListPage,
  ],
  imports: [
    IonicPageModule.forChild(AtMeListPage),
  ],
})
export class AtMeListPageModule {}
