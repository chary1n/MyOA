import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnreadReplyPage } from './unread-reply';

@NgModule({
  declarations: [
    UnreadReplyPage,
  ],
  imports: [
    IonicPageModule.forChild(UnreadReplyPage),
  ],
})
export class UnreadReplyPageModule {}
