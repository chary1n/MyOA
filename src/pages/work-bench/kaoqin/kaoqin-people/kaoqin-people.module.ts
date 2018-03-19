import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KaoqinPeoplePage } from './kaoqin-people';

@NgModule({
  declarations: [
    KaoqinPeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(KaoqinPeoplePage),
  ],
})
export class KaoqinPeoplePageModule {}
