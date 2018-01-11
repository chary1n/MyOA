import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeKucunDetailPage } from './change-kucun-detail';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    ChangeKucunDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeKucunDetailPage),AutoCompleteModule
  ],
})
export class ChangeKucunDetailPageModule {}
