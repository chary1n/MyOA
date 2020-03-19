import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewMessageReplyPage } from './new-message-reply';
import { AutoCompleteModule } from 'ionic2-auto-complete';

@NgModule({
  declarations: [
    NewMessageReplyPage,
  ],
  imports: [
    IonicPageModule.forChild(NewMessageReplyPage),AutoCompleteModule
  ],
})
export class NewMessageReplyPageModule {}
