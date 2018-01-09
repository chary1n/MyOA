import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyGongdanListPage } from './my-gongdan-list';

@NgModule({
  declarations: [
    MyGongdanListPage,
  ],
  imports: [
    IonicPageModule.forChild(MyGongdanListPage),
  ],
})
export class MyGongdanListPageModule {}
