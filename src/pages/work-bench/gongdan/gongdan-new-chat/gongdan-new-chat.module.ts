import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GongdanNewChatPage } from './gongdan-new-chat';

@NgModule({
  declarations: [
    GongdanNewChatPage,
  ],
  imports: [
    IonicPageModule.forChild(GongdanNewChatPage),
  ],
})
export class GongdanNewChatPageModule {}
