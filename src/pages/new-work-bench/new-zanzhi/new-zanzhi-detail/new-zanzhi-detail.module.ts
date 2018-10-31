import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewZanzhiDetailPage } from './new-zanzhi-detail';

@NgModule({
  declarations: [
    NewZanzhiDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NewZanzhiDetailPage),
  ],
})
export class NewZanzhiDetailPageModule {}
