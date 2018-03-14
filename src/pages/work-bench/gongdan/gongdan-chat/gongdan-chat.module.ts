import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongdanChatPage } from './gongdan-chat';

@NgModule({
  declarations: [
    GongdanChatPage,
  ],
  imports: [
    IonicPageModule.forChild(GongdanChatPage),
  ],
})
export class GongdanChatPageModule {}
