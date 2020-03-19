import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageReplyMenuPage } from './message-reply-menu';

@NgModule({
  declarations: [
    MessageReplyMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageReplyMenuPage),
  ],
})
export class MessageReplyMenuPageModule {}
